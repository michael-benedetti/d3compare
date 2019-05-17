import * as  React from 'react';
import {useState} from 'react';
import './css/App.css';
import {D3Repository, HeroIdentifier, HoverStat, Leaderboard, LeaderData} from "./helpers/interfaces";
import HeroCard from "./HeroCard";
import {History} from "history";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import uniqid = require('uniqid');
import AddHero from "./AddHero";
import {LinearProgress} from "@material-ui/core";

interface AppProps {
  history: History;
  d3Repository: D3Repository;
  heroIdentifiers: HeroIdentifier[];
}

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    secondary: {
      main: "#ff0000",
    },
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "14px",
        display: "inline-block",
        backgroundColor: "black",
        border: "2px solid #444433",
        boxShadow: "2px 2px 2px black",
      },
    },
  }
});

export interface IAppContext {
  hoveredStat: HoverStat;
  setSelectedStat: (hoverStat: HoverStat) => void;
  d3Repository: D3Repository;
  tooltipVisible: string;
  handleShowTooltip: (tooltipId: string) => void;
}

export const AppContext = React.createContext<IAppContext>({
  hoveredStat: {stat: "", statValue: "", heroIndex: -1},
  setSelectedStat: () => {},
  d3Repository: {
    getProfile: () => Promise.resolve({}),
    getHero: () => Promise.resolve({}),
    getDetailedItems: () => Promise.resolve({}),
    getLeaderboard: () => Promise.resolve({})
  },
  tooltipVisible: "",
  handleShowTooltip: () => {},
});

function App(props: AppProps) {
  const [tooltipVisible, setTooltipVisible] = useState<string>("");
  const [selectedStat, setSelectedStat] = useState<HoverStat>({stat: "", statValue: "", heroIndex: -1});
  const [heroIdentifiers, setHeroIdentifiers] = useState<HeroIdentifier[]>(props.heroIdentifiers);
  const [loadingLeaderboardHero, setLoadingLeaderboardHero] = useState<boolean>(false);


  function handleShowTooltip(tooltipId: string) {
    setTooltipVisible(tooltipId);
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

  function updateHistory(newHeroIdentifiers: HeroIdentifier[]) {
    props.history.replace(newHeroIdentifiers.length > 0 ? `?heros=${composeHeroInentifiersIntoParam(newHeroIdentifiers)}` : "/");
  }

  async function handleRemoveHero(heroIndex: number) {
    const newHeroIdentifiers = heroIdentifiers.filter((hero, i) => i !== heroIndex);
    updateHistory(newHeroIdentifiers);
    setHeroIdentifiers(newHeroIdentifiers);
  }

  function handleHeroChange(newHeroIdentifier: HeroIdentifier, heroIndex: number) {
    const newHeroIdentifiers = heroIdentifiers.map((heroIdentifier, i) => {
      return i === heroIndex ? newHeroIdentifier : heroIdentifier;
    });
    updateHistory(newHeroIdentifiers);
    setHeroIdentifiers(newHeroIdentifiers);
  }

  async function handleAddLeaderboardHero(leaderboard: string, rank: number) {
    setLoadingLeaderboardHero(true);
    const leaderboardTypes = ["hardcore-barbarian", "barbarian", "hardcore-crusader", "crusader", "hardcore-dh", "dh", "hardcore-monk", "monk", "hardcore-wd", "wd", "hardcore-wizard", "wizard"];
    const leaderboardType = leaderboard !== "random" ? leaderboard : leaderboardTypes[Math.floor(Math.random() * leaderboardTypes.length)];
    const leaders: Leaderboard = await props.d3Repository.getLeaderboard("17", `rift-${leaderboardType}`).catch(() => setLoadingLeaderboardHero(false));
    const heroData: LeaderData[] = leaders.row[rank !== -1 ? rank - 1 : Math.floor(Math.random() * leaders.row.length)].player[0].data;
    const battleTag: string = heroData.find((data: LeaderData) => data.id === "HeroBattleTag")!.string || "";
    const heroId: string = heroData.find((data: LeaderData) => data.id === "HeroId")!.number!.toString() || "";

    handleAddHero({region: "us", account: battleTag, heroId, key: uniqid.process()});
    setLoadingLeaderboardHero(false);
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
          tooltipVisible: tooltipVisible,
          handleShowTooltip: handleShowTooltip,
        }}
      >
        <div className="App">
          {loadingLeaderboardHero && <LinearProgress color={"secondary"} style={{width: "100%", position: "absolute"}}/>}
          <div className={"MenuBar"}>
            <div className={"Title"}>D3Compare.com</div>
            <AddHero
              handleAddHero={handleAddHero}
              handleAddLeaderboardHero={handleAddLeaderboardHero}
              heroIdentifiers={heroIdentifiers}
              loadingLeaderboardHero={loadingLeaderboardHero}
            />
          </div>
          <div className={"Workspace"}>
            <div className={"Heros"}>
              {heroIdentifiers && heroIdentifiers.map((hero: HeroIdentifier, i: number) => {
                return (
                  <HeroCard
                    handleHeroChange={handleHeroChange}
                    heroIndex={i}
                    key={hero.key}
                    heroIdentifier={hero}
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
