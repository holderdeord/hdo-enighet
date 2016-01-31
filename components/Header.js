import React, {Component} from 'react';
import SharingLinks from './SharingLinks';

export default class Header extends Component {
    render() {
        return (
            <header>
                <div className="row">
                    <div className="col-md-2">
                        <a href="http://www.holderdeord.no">
                            <div className="hdo-logo">
                                <strong>Holder de ord</strong>
                            </div>
                        </a>
                    </div>

                    <div className="col-md-8 text-xs-center">
                        <h1>Hvem <mark>stemmer sammen</mark> på Stortinget?</h1>
                    </div>

                    <div className="col-md-2 text-xs-right">
                        <SharingLinks />
                    </div>
                </div>
            </header>
        )
    }
}


