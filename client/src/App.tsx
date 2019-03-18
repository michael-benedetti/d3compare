import * as  React from 'react';
import './App.css';
import {AuthRepository, D3Repository, HeroIdentifier} from "./interfaces";
import HeroCard from "./HeroCard";
import {useState} from "react";


interface AppProps {
  authRepository: AuthRepository;
  d3Repository: D3Repository;
}


function App(props: AppProps) {
  const [gearSpotTooltipVisible, setGearSpotToolTipVisible] = useState<string>("");
  const [heros, setHeros] = useState<HeroIdentifier[]>([
    {
      account: "Demospheus-1879",
      heroId: "108710068"
    },
    {
      account: "Sammo-1931",
      heroId: "108541224"
    }
  ]);

  function handleGearMouseEnter(gearSpot: string) {
    setGearSpotToolTipVisible(gearSpot);
  }

  function handleAddHero() {
    if (heros.length >= 4) {
      return;
    }
    setHeros([...heros, {account: "", heroId: ""}]);
  }

  return (
    <div className="App">
      {heros.length < 4 &&
      <button onClick={handleAddHero}>Add Hero</button>}
      <br/>
      <div className={"heros"}>
        {heros && heros.map((hero: HeroIdentifier, i: number) => {
          return (
            <HeroCard
              heroIndex={i}
              key={i}
              authRepository={props.authRepository}
              d3Repository={props.d3Repository}
              account={hero.account}
              heroid={hero.heroId}
              handleGearMouseEnter={handleGearMouseEnter}
              gearSpotTooltip={gearSpotTooltipVisible}
            />
          )
        })}
      </div>
    </div>
  );
}

export default App;
