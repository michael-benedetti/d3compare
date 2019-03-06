import * as  React from 'react';
import './App.css';
import {D3Repository} from "./interfaces";
import HeroCard from "./HeroCard";


interface AppProps {
  authRepository: any;
  d3Repository: D3Repository;
}

function App(props: AppProps) {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hi.
        </p>
        <br/>
        <div className={"heros"}>
          <HeroCard
            heroIndex={0}
            authRepository={props.authRepository}
            d3Repository={props.d3Repository}
            account={"Demospheus-1879"}
            heroid={"108710068"}
          />
          <HeroCard
            heroIndex={1}
            authRepository={props.authRepository}
            d3Repository={props.d3Repository}
            account={"Sammo-1931"}
            heroid={"108541224"}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
