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
                    Disse tallene er basert på <a href="https://www.holderdeord.no">Holder de ords</a> database over avstemninger og forslag på Stortinget fra 2009 og til i dag.
                </p>

                <p>
                    De fleste av våre data kommer fra <a href="http://data.stortinget.no/">Stortingets datatjeneste</a> og er lisensiert under <a href="http://data.norge.no/NLOD">NLOD</a>.
                </p>                
            </div>

            <div className="col-lg-4 col-md-12">
                <p>På Stortinget grupperes ofte flere voteringsforslag sammen i én votering for å spare tid. For å unngå at denne teknikaliteten påvirker resultatet teller vi hvert voteringsforslag som om det ble gjort en egen votering.</p>
                <p>Vi har også valgt å utelate alle voteringer som blir enstemmig vedtatt. Dette gjør forskjellene på partiene tydeligere.</p>
            </div>

            <div className="col-lg-4 col-md-12">
                <p>For å unngå at fravær påvirker prosentutregningen er nevneren lik antall voteringsforslag hvor begge de aktuelle partiene har deltatt, og ikke totalt antall voteringer.</p>
                <p>Inneværende sesjon ({props.currentSession}) er naturlig nok ufullstendig. Tallene oppdateres hver natt, og ble sist oppdatert <strong>{moment(props.lastUpdate).fromNow()}</strong>.</p>
            </div>


        </div>
    </div>
);