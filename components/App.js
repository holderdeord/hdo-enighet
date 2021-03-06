import "./main.scss";
import "font-awesome/css/font-awesome.css";
import "babel-polyfill";

import qs from "querystring";
import React, { Component } from "react";
import { render } from "react-dom";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

export default class App extends Component {
  state = {
    query: qs.parse(window.location.search.slice(1))
  };

  componentDidMount() {
    if (process.env.NODE_ENV === "production" && window.ga) {
      window.ga("create", "UA-19569290-8", "auto");
      window.ga("set", "anonymizeIp", true);
      window.ga("send", "pageview");
    }
  }

  render() {
    const {
      query: {
        animate,
        allCategories,
        showCount,
        extraCombo,
        exporting,
        timeUnit
      }
    } = this.state;

    return (
      <div id="App" className="container">
        <Header />

        <div className="alert alert-info m-t-1">
          <strong>Holder de ord</strong> legges ned i løpet av 2020. Denne
          tjenesten blir fortsatt oppdatert daglig frem til da.
        </div>

        <Body
          animate={animate}
          allCategories={allCategories && allCategories !== "false"}
          showCount={showCount && showCount !== "false"}
          extraCombo={extraCombo}
          exporting={exporting && exporting !== "false"}
          timeUnit={timeUnit || "session"}
        />

        <Footer />
      </div>
    );
  }
}

render(<App />, document.getElementById("main-container"));
