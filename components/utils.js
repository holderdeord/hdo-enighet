import React from 'react';

export function logoFor(party) {
    return <img
        src={`https://www.holderdeord.no/api/parties/${party.toLowerCase()}/logo/?version=medium`}
        width={'52px'}
    />
}
