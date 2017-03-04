import './main.scss';
import 'font-awesome/css/font-awesome.css';
import 'babel-polyfill';

import qs from 'querystring';
import React, {Component} from 'react';
import {render} from 'react-dom';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

export default class App extends Component {
    state = {
        query: qs.parse(window.location.search.slice(1))
    };

    componentDidMount() {
        if (process.env.NODE_ENV === 'production' && window.ga) {
            window.ga('create', 'UA-19569290-8', 'auto');
            window.ga('set', 'anonymizeIp', true);
            window.ga('send', 'pageview');
        }
    }

    render() {
        const {
            query: {
                animate,
                allCategories,
                showCount
            }
        } = this.state;

        return (
            <div id='App' className="container">
                <Header />

                <Body
                    animate={animate}
                    allCategories={allCategories && allCategories !== 'false'}
                    showCount={showCount && showCount !== 'false'}
                />

                <Footer />
            </div>
        );
    }
}

render(<App />, document.getElementById('main-container'));
