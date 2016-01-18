import React, {Component} from 'react';


export default class Header extends Component {
    render() {
        return (
            <header>
                <div className="row">
                    <div className="col-md-8 text-right">
                        <h1>Hvem <mark>stemmer sammen</mark> på Stortinget?</h1>
                    </div>

                    <div className="col-md-4">
                        <div className="hdo-logo" style={{marginTop: '1rem'}}>
                            <strong>Holder de ord</strong>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}


