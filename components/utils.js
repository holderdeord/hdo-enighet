import React from 'react';

export function logoFor(party) {
    return (
        <img
            src={`https://www.holderdeord.no/api/parties/${party.toLowerCase()}/logo/?version=medium`}
            width={'52px'}
        />
    );
}

const partyNames = {
    A: 'Arbeiderpartiet',
    H: 'Høyre',
    KrF: 'Kristelig Folkeparti',
    V: 'Venstre',
    MDG: 'Miljøpartiet De Grønne',
    SV: 'Sosialistisk Venstreparti',
    Sp: 'Senterpartiet',
    FrP: 'Fremskrittspartiet'
}

export function partyNameFor(party) {
    return partyNames[party] || 'Ukjent parti';
}