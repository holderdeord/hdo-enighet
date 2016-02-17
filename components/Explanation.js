import React from 'react';
import moment from 'moment';

moment.locale('nb');

export default (props) => (
    <div className="hdo-card">
        <div className="hdo-card-header text-xs-center">
            <h3>Om utregningen</h3>
        </div>

        <div className="row p-a-2">
            <div className="col-lg-4 col-md-12">
                <p>
                    Oversikten er basert på <a href="https://www.holderdeord.no/">Holder de ord</a>s database over avstemninger og forslag på Stortinget fra 2009 til i dag.
                </p>

                <p>
                    Datagrunnlaget kommer i hovedsak fra <a href="http://data.stortinget.no/">Stortingets datatjeneste</a>, som er lisensiert under <a href="http://data.norge.no/NLOD">NLOD</a>.
                </p>

                <p>Inneværende sesjon ({props.currentSession}) er ufullstendig. Tallene oppdateres daglig, og ble sist oppdatert <strong>{moment(props.lastUpdate).fromNow()}</strong>.</p>
            </div>

            <div className="col-lg-4 col-md-12">
                <p>På Stortinget stemmes det ofte over mange forslag samtidig for å spare tid. For å unngå at sekretariatets inndeling av forslag i avstemninger påvirker resultatet, teller vi hvert forslag for seg. Resultatet blir da likt som om Stortinget hadde stemt over hvert forslag enkeltvis.</p>
                <p>Siden over 35% av avstemningene på Stortinget ender med enstemmige vedtak, har vi valgt å utelate disse fra vår utregning. Dette gjør forskjellen på partiene tydeligere.</p>
            </div>

            <div className="col-lg-4 col-md-12">
                <p>Kategoriene og inndelingen av saker i kategorier er gjort av Stortinget. Vi bruker de 23 hovedkategoriene fra Stortingets kategori-tre, og saker som er kategorisert i flere kategorier telles en gang i hver hovedkategori.</p>
                <p>For å unngå at fravær påvirker prosentbrøken, er nevneren alltid lik antall forslag som begge de aktuelle partiene har stemt over.</p>
            </div>
        </div>

        <div className="row p-x-2">
            <div className="col-lg-6 col-md-12">
                <small>
                    <strong>Oppdateringer</strong>

                    <ul>
                        <li>
                            17. februar 2016: Rettet et problem hvor enstemmige avstemninger feilaktig
                            ble tatt med i matrisen når man hadde valgt alle sesjoner og en bestemt kategori.
                            Dette førte til at partiene fremsto mer enige i enkeltkategorier enn de gjorde totalt.

                        </li>
                    </ul>
                </small>
            </div>
        </div>
    </div>
);