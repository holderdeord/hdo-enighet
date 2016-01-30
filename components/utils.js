import React from 'react';

const connection = navigator.connection
const slow = connection && /(^([23]g?)$)/.test(connection.type)
const devicePixelRatio = (!slow && window.devicePixelRatio) || 1

export function logoFor(party) {
    return (
        <img
            className="party-logo"
            src={`https://www.holderdeord.no/api/parties/${party.toLowerCase()}/logo/?version=${devicePixelRatio > 1 ? 'large' : 'medium'}`}
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