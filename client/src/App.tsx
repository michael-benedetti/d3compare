import * as  React from 'react';
import {useState} from 'react';
import './App.css';
import {D3Repository, HeroIdentifier, HoverStat, Leaderboard, LeaderData} from "./interfaces";
import HeroCard from "./HeroCard";
import {Button} from "@material-ui/core";
import {History} from "history";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import uniqid = require('uniqid');

interface AppProps {
  history: History;
  d3Repository: D3Repository;
  heroIdentifiers: HeroIdentifier[];
}

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "14px",
        display: "inline-block",
        backgroundColor: "black",
        padding: "10px",
        border: "2px solid #444433",
        boxShadow: "2px 2px 2px black",
      },
    }
  }
});


export interface IAppContext {
  hoveredStat: HoverStat;
  setSelectedStat: (hoverStat: HoverStat) => void;
  d3Repository: D3Repository;
}

export const AppContext = React.createContext<IAppContext>({
  hoveredStat: {stat: "", statValue: "", heroIndex: -1},
  setSelectedStat: () => {
  },
  d3Repository: {
    getProfile: () => Promise.resolve({}),
    getHero: () => Promise.resolve({}),
    getDetailedItems: () => Promise.resolve({}),
    getLeaderboard: () => Promise.resolve({})
  }
});

function App(props: AppProps) {
  const [gearSpotTooltipVisible, setGearSpotToolTipVisible] = useState<string>("");
  const [selectedStat, setSelectedStat] = useState<HoverStat>({stat: "", statValue: "", heroIndex: -1});
  const [heroIdentifiers, setHeroIdentifiers] = useState<HeroIdentifier[]>(props.heroIdentifiers);

  function handleGearMouseEnter(gearSpot: string) {
    setGearSpotToolTipVisible(gearSpot);
  }

  function composeHeroInentifiersIntoParam(newHeroIdentifiers: HeroIdentifier[]) {
    const paramStrings: string[] = newHeroIdentifiers.map((heroIdentifier) => {
      const {region, account, heroId} = heroIdentifier;
      return [region, account.replace("#", "-"), heroId].join(",");
    });
    return paramStrings.join("&");
  }

  function handleAddHero(newHero: HeroIdentifier) {
    if (heroIdentifiers.length >= 4) {
      return;
    }
    const newHeroIdentifiers = [...heroIdentifiers, newHero];
    props.history.replace(`?heros=${composeHeroInentifiersIntoParam(newHeroIdentifiers)}`);
    setHeroIdentifiers(newHeroIdentifiers);
  }

  async function handleRemoveHero(heroIndex: number) {
    const newHeroIdentifiers = heroIdentifiers.filter((hero, i) => i !== heroIndex);
    props.history.replace(`?heros=${composeHeroInentifiersIntoParam(newHeroIdentifiers)}`);
    setHeroIdentifiers(newHeroIdentifiers);
  }

  function handleHeroChange(newHeroIdentifier: HeroIdentifier, heroIndex: number) {
    const newHeroIdentifiers = heroIdentifiers.map((heroIdentifier, i) => {
      return i === heroIndex ? newHeroIdentifier : heroIdentifier;
    });
    props.history.replace(`?heros=${composeHeroInentifiersIntoParam(newHeroIdentifiers)}`);
    setHeroIdentifiers(newHeroIdentifiers);
  }

  async function handleAddRandomHero() {
    const leaderboardTypes = ["hardcore-barbarian", "barbarian", "hardcore-crusader", "crusader", "hardcore-dh", "dh", "hardcore-monk", "monk", "hardcore-wd", "wd", "hardcore-wizard", "wizard"];
    const leaderboardType = leaderboardTypes[Math.floor(Math.random() * leaderboardTypes.length)];
    const leaders: Leaderboard = await props.d3Repository.getLeaderboard("16", `rift-${leaderboardType}`);
    const heroData: LeaderData[] = leaders.row[Math.floor(Math.random() * leaders.row.length)].player[0].data;
    const battleTag: string = heroData.find((data: LeaderData) => data.id === "HeroBattleTag")!.string || "";
    const heroId: string = heroData.find((data: LeaderData) => data.id === "HeroId")!.number!.toString() || "";

    handleAddHero({region: "us", account: battleTag, heroId, key: uniqid.process()});
  }

  function handleSelectedStatChange(hoverStat: HoverStat) {
    setSelectedStat(hoverStat);
  }

  return (
    <MuiThemeProvider theme={theme}>
      <AppContext.Provider
        value={{
          hoveredStat: selectedStat,
          setSelectedStat: handleSelectedStatChange,
          d3Repository: props.d3Repository,
        }}
      >
        <div className="App">
          <div>
            <>
              <Button
                onClick={() => handleAddHero({region: "us", account: "", heroId: "", key: uniqid.process()})}
                style={{
                  padding: "5px",
                  width: "130px",
                  fontFamily: "exocet-blizzard-light",
                  fontSize: "20px"
                }}
                disabled={heroIdentifiers.length >= 4}
              >
                Add Hero
              </Button>
              <br/>
              <Button
                onClick={handleAddRandomHero}
                style={{
                  padding: "5px",
                  width: "235px",
                  fontFamily: "exocet-blizzard-light",
                  fontSize: "20px"
                }}
                disabled={heroIdentifiers.length >= 4}
              >
                Add Random Hero
              </Button>
            </>
            <br/>
            <br/>
            <div className={"Heros"}>
              {heroIdentifiers && heroIdentifiers.map((hero: HeroIdentifier, i: number) => {
                return (
                  <HeroCard
                    handleHeroChange={handleHeroChange}
                    heroIndex={i}
                    key={hero.key}
                    heroIdentifier={hero}
                    handleGearMouseEnter={handleGearMouseEnter}
                    gearSpotTooltip={gearSpotTooltipVisible}
                    handleRemoveHero={handleRemoveHero}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </AppContext.Provider>
    </MuiThemeProvider>
  );
}

export default App;
