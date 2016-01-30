import React, {Component} from 'react';

export default class Header extends Component {
    render() {
        return (
            <header>
                <div className="row">
                    <div className="col-md-4">
                        <a href="http://www.holderdeord.no">
                            <div className="hdo-logo">
                                <strong>Holder de ord</strong>
                            </div>
                        </a>
                    </div>

                    <div className="col-md-8 text-sm-right">
                        <h1>Hvem <mark>stemmer sammen</mark> på Stortinget?</h1>
                    </div>
                </div>
            </header>
        )
    }
}


