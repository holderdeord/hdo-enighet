const fetch = require('isomorphic-fetch');
const qs = require('querystring');

const fetchJson = async (url) => {
    const res = await fetch(url, {
        headers: {
            'user-agent': 'hdo-agreement-import (jari@faktisk.no)',
        },
    });

    if (!res.ok) {
        throw new Error(
            `request to ${res.url} failed with ${res.status} ${res.statusText}`
        );
    }

    return res.json();
};

const api = {
    sessions: () =>
        fetchJson('https://data.stortinget.no/eksport/sesjoner?format=json'),
    votes: (sakid) =>
        fetchJson(
            `https://data.stortinget.no/eksport/voteringer?${qs.stringify({
                sakid,
                format: 'json',
            })}`
        ),
    propositions: (voteringid) =>
        fetchJson(
            `http://data.stortinget.no/eksport/voteringsforslag?${qs.stringify({
                voteringid,
                format: 'json',
            })}`
        ),
    voteResult: (voteringid) =>
        fetchJson(
            `http://data.stortinget.no/eksport/voteringsresultat?${qs.stringify({
                voteringid,
                format: 'json',
            })}`
        ),
    issues: (sesjonid) =>
        fetchJson(
            `https://data.stortinget.no/eksport/saker?${qs.stringify({
                sesjonid,
                format: 'json',
            })}`
        ),
};

const VOTE_AGAINST = 3;
const VOTE_FOR = 2;
const VOTE_ABSENT = 1;

const voteKeyFor = (n) => {
    if (n === VOTE_AGAINST) {
        return 'against';
    } else if (n === VOTE_FOR) {
        return 'for';
    } else if (n === VOTE_ABSENT) {
        return 'absent';
    } else {
        throw new Error(`unknown vote status: ${n}`);
    }
};

const main = async () => {
    const sessions = await api.sessions();
    const issues = await api.issues(sessions.innevaerende_sesjon.id);

    for (const issue of issues.saker_liste.slice(0, 1)) {
        const votes = await api.votes(issue.id);

        for (const vote of votes.sak_votering_liste.slice(0, 1)) {
            if (!vote.personlig_votering) {
                continue;
            }

            const voteResults = await api.voteResult(vote.votering_id);
            for (const result of voteResults.voteringsresultat_liste) {
                const key = voteKeyFor(result.votering);
            }
        }
    }

    console.log();
};

main().catch(console.error);
