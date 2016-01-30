import React from 'react';
import moment from 'moment';

moment.locale('nb');

export default (props) => (
    <div className="hdo-card">
        <div className="hdo-card-header text-lg-center p-a-2">
            <h3>Hvordan har dere regnet ut dette?</h3>
        </div>

        <div className="row p-a-2">
            <div className="col-lg-4 col-md-12">
                <p>
                    Oversikten er basert på <a href="https://www.holderdeord.no">Holder de ords</a> database over avstemninger og forslag på Stortinget fra 2009 og til i dag.
                </p>

                <p>
                    De fleste av våre data kommer fra <a href="http://data.stortinget.no/">Stortingets datatjeneste</a> og er lisensiert under <a href="http://data.norge.no/NLOD">NLOD</a>.
                </p>
            </div>

            <div className="col-lg-4 col-md-12">
                <p>På Stortinget stemmes det ofte over mange forslag samtidig for å spare tid. For å unngå at sekretariatets inndeling av forslag i avstemninger påvirker resultatet, teller vi hvert forslag for seg. Resultatet blir da likt som om Stortinget hadde stemt over hvert forslag enkeltvis.</p>
                <p>Siden over 35% av avstemninger på Stortinget blir enstemmig vedtatt, har vi også valgt å utelate disse fra vår utregning. Dette gjør forskjellen på partiene tydeligere.</p>
            </div>

            <div className="col-lg-4 col-md-12">
                <p>For å unngå at fravær påvirker prosentutregningen er nevneren lik antall forslag som begge de aktuelle partiene har stemt over.</p>
                <p>Inneværende sesjon ({props.currentSession}) er naturlig nok ufullstendig. Tallene oppdateres hver natt, og ble sist oppdatert <strong>{moment(props.lastUpdate).fromNow()}</strong>.</p>
            </div>
        </div>
    </div>
);