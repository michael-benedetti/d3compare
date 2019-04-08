import * as  React from 'react';
import {useEffect, useState} from 'react';
import './App.css';
import {AccessToken, AuthRepository, D3Repository, HeroIdentifier, Leaderboard, LeaderData} from "./interfaces";
import HeroCard from "./HeroCard";
import {Button} from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";


interface AppProps {
  authRepository: AuthRepository;
  d3Repository: D3Repository;
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
  hoveredStat: string;
  setSelectedStat: (stat: string) => void;
  authRepository: AuthRepository;
  d3Repository: D3Repository;
  accessToken: AccessToken;
}

export const AppContext = React.createContext<IAppContext>({
  hoveredStat: "",
  setSelectedStat: () => {},
  accessToken: {},
  authRepository: {getAccessToken: () => Promise.resolve("")},
  d3Repository: {
    getProfile: () => Promise.resolve({}),
    getHero: () => Promise.resolve({}),
    getDetailedItems: () => Promise.resolve({}),
    getLeaderboard: () => Promise.resolve({})
  }
});

function App(props: AppProps) {
  const [gearSpotTooltipVisible, setGearSpotToolTipVisible] = useState<string>("");
  const [selectedStat, setSelectedStat] = useState<string>("");
  const [accessToken, setAccessToken] = useState<AccessToken>({});
  const [heros, setHeros] = useState<HeroIdentifier[]>([
    // {account: "Demospheus#1879", heroId: ""},
    // {account: "Sammo#1931", heroId: ""}
  ]);

  const fetchAccessToken = async () => {
    const fetchedAccessToken: AccessToken = await props.authRepository.getAccessToken();
    setAccessToken(fetchedAccessToken);
  };

  useEffect(() => {
    fetchAccessToken();
  }, []);

  function handleGearMouseEnter(gearSpot: string) {
    setGearSpotToolTipVisible(gearSpot);
  }

  function handleAddHero(newHero: HeroIdentifier) {
    if (heros.length >= 4) {
      return;
    }
    setHeros([...heros, newHero]);
  }

  async function handleAddRandomHero() {
    const leaderboardTypes = ["hardcore-barbarian", "barbarian", "hardcore-crusader", "crusader", "hardcore-dh", "dh", "hardcore-monk", "monk", "hardcore-wd", "wd", "hardcore-wizard", "wizard"];
    const leaderboardType = leaderboardTypes[Math.floor(Math.random()*leaderboardTypes.length)];
    const leaders: Leaderboard = await props.d3Repository.getLeaderboard("16", `rift-${leaderboardType}`, accessToken);
    const heroData: LeaderData[] = leaders.row[Math.floor(Math.random() * leaders.row.length)].player[0].data;
    console.log(heroData);
    const battleTag: string = heroData.find((data: LeaderData) => data.id === "HeroBattleTag")!.string || "";
    const heroId: string = heroData.find((data: LeaderData) => data.id === "HeroId")!.number!.toString() || "";

    handleAddHero({account: battleTag, heroId});
  }

  function handleSelectedStatChange(stat: string) {
    setSelectedStat(stat);
  }

  return (
    <MuiThemeProvider theme={theme}>
      <AppContext.Provider
        value={{
          hoveredStat: selectedStat,
          setSelectedStat: handleSelectedStatChange,
          authRepository: props.authRepository,
          d3Repository: props.d3Repository,
          accessToken: accessToken,
        }}
      >
        <div className="App">
          <div>
            {heros.length < 4 &&
            <>
              <Button
                onClick={() => handleAddHero({account: "", heroId: ""})}
                style={{padding: "5px", width: "130px", fontFamily: "exocet-blizzard-light", fontSize: "20px"}}
              >
                Add Hero
              </Button>
              <br/>
              <Button
                onClick={handleAddRandomHero}
                style={{padding: "5px", width: "235px", fontFamily: "exocet-blizzard-light", fontSize: "20px"}}
              >
                Add Random Hero
              </Button>
            </>
            }
            <br/>
            <br/>
            <div className={"Heros"}>
              {heros && heros.map((hero: HeroIdentifier, i: number) => {
                return (
                  <HeroCard
                    heroIndex={i}
                    key={i}
                    hero={hero}
                    handleGearMouseEnter={handleGearMouseEnter}
                    gearSpotTooltip={gearSpotTooltipVisible}
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
