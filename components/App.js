import './main.scss';
import 'font-awesome/css/font-awesome.css';

import React, {Component} from 'react';
import {render} from 'react-dom';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

export default class App extends Component {
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
