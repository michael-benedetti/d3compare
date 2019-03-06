import * as  React from 'react';
import './App.css';
import {D3Repository} from "./interfaces";
import HeroCard from "./HeroCard";
import {useState} from "react";


interface AppProps {
  authRepository: any;
  d3Repository: D3Repository;
}

function App(props: AppProps) {
  const [gearSpotTooltip, setGearSpotToolTip] = useState();

  function handleGearMouseEnter(gearSpot: string) {
    setGearSpotToolTip(gearSpot);
  }

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
            handleGearMouseEnter={handleGearMouseEnter}
            gearSpotTooltip={gearSpotTooltip}
          />
          <HeroCard
            heroIndex={1}
            authRepository={props.authRepository}
            d3Repository={props.d3Repository}
            account={"Sammo-1931"}
            heroid={"108541224"}
            handleGearMouseEnter={handleGearMouseEnter}
            gearSpotTooltip={gearSpotTooltip}

          />
        </div>
      </header>
    </div>
  );
}

export default App;
