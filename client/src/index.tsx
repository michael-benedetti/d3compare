import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {History} from "history";
import {HttpD3Repository} from "./HttpD3Repository";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {HeroIdentifier} from "./interfaces";
import uniqid = require('uniqid');

function parseHerosQueryParam(history: History): HeroIdentifier[] {
  try {
    const heros = history.location.search.split("?heros=")[1].split("&");
    const parsedHeros: HeroIdentifier[] = heros.map((hero) => {
      const heroData = hero.split(",");
      return {region: heroData[0], account: heroData[1], heroId: heroData[2], key: uniqid.process()}
    });
    return parsedHeros.slice(0,4);
  }
  catch {
    return [];
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
        path={"/"}
        render={({history}) => {
          return <App
            history={history}
            heroIdentifiers={parseHerosQueryParam(history)}
            d3Repository={new HttpD3Repository()}
          />
        }}
      />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
