import React, { PropTypes, Component } from 'react';

export default class SharingLinks extends Component {
    state = {
        facebookAppId: '504447209668308'
    };

    render() {
        return (
            <div className="sharing-links hidden-xs-down">
                <span>
                    <a href="#" onClick={::this.handleFacebookShare}>
                        <i className="fa fa-facebook-square fa-2x" />
                    </a>
                </span>

                <span>
                    <a href="#" onClick={::this.handleTwitterShare}>
                        <i className="fa fa-twitter-square fa-2x" />
                    </a>
                </span>
            </div>
        );
    }

    handleFacebookShare(event) {
        event.preventDefault();

        let shareUrl = `https://www.facebook.com/dialog/share
                               ?app_id=${this.state.facebookAppId}
                               &display=popup
                               &redirect_uri=${this.getUrl()}
                               &href=${this.getUrl()}`.replace(/\s+/g, '');

        this.open(shareUrl, 'Facebook');
    }

    handleTwitterShare(event) {
        event.preventDefault();

        let text = 'Hvem stemmer oftest sammen på Stortinget?';

        let shareUrl = `https://twitter.com/intent/tweet
                            ?text=${encodeURIComponent(text)}
                            &url=${this.getUrl()}
                            &via=holderdeord`.replace(/\s+/g, '');

        this.open(shareUrl, 'Twitter');
    }

    open(url, title) {
        let w       = 600;
        let h       = 400;

        let left = (window.screen.width / 2) - (w / 2);
        let top = (window.screen.height / 2) - (h / 2);

        window.open(url, title, `width=${w},height=${h},left=${left},top=${top},toolbar=0,menubar=0`);
    }

    getUrl() {
        return encodeURIComponent(window.location.toString());
    }
}
