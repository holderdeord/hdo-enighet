import './main.scss';
import 'font-awesome/css/font-awesome.css';

import React, {Component} from 'react';
import {render} from 'react-dom';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

export default class App extends Component {
    componentDidMount() {
        if (process.env.NODE_ENV === 'production' && window.ga) {
            window.ga('create', 'UA-19569290-8', 'auto');
            window.ga('set', 'anonymizeIp', true);
            window.ga('send', 'pageview');
        }
    }

    render() {
        return (
            <div id='App' className="container">
                <Header />
                <Body />
                <Footer />
            </div>
        );
    }
}

render(<App />, document.getElementById('main-container'));
