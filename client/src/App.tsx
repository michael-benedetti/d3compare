import * as  React from 'react';
import './App.css';
import {AuthRepository, D3Repository, HeroIdentifier} from "./interfaces";
import HeroCard from "./HeroCard";
import {useState} from "react";
import {Button} from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";


interface AppProps {
  authRepository: AuthRepository;
  d3Repository: D3Repository;
}

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});


function App(props: AppProps) {
  const [gearSpotTooltipVisible, setGearSpotToolTipVisible] = useState<string>("");
  const [heros, setHeros] = useState<HeroIdentifier[]>([
    {
      account: "Demospheus#1879",
      heroId: "108710068"
    },
    {
      account: "Sammo#1931",
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
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <div className="Workspace">
          {heros.length < 4 &&
          <Button
            onClick={handleAddHero}
            style={{padding: "5px", width: "130px"}}
          >
            Add Hero
          </Button>}
          <br/>
          <br/>
          <div className={"Heros"}>
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
      </div>
    </MuiThemeProvider>
  );
}

export default App;
