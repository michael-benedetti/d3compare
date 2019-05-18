import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import * as React from "react";
import {useState} from "react";
import {HeroIdentifier} from "./helpers/interfaces";
import uniqid = require("uniqid");
import "./css/AddHero.css";


interface AddHeroProps {
  handleAddHero: (heroIdentifier: HeroIdentifier) => void;
  heroIdentifiers: HeroIdentifier[];
  handleAddLeaderboardHero: (leaderboard: string, rank: number) => void;
  loadingLeaderboardHero: boolean;
}

function AddHero(props: AddHeroProps) {
  const [leaderboard, setLeaderboard] = useState<string>("random");
  const [rank, setRank] = useState<number>(-1);

  return (
    <div className={"AddHeroBar"}>
      <Button
        className={"AddHeroButton MenuItem"}
        onClick={() => props.handleAddHero({region: "us", account: "", heroId: "", key: uniqid.process()})}
        style={{
          padding: "5px",
          whiteSpace: "nowrap",
          fontFamily: "exocet-blizzard-light",
          fontSize: "20px",
          fontWeight: "bold",
          textShadow: "1px 1px 1px black"
        }}
        disabled={props.heroIdentifiers.length >= 4 || props.loadingLeaderboardHero}
      >
        Add Hero
      </Button>
      <div className={"Divider MenuItem"}/>
      <Button
        className={"AddHeroButton MenuItem"}
        onClick={() => props.handleAddLeaderboardHero(leaderboard, rank)}
        style={{
          padding: "5px",
          whiteSpace: "nowrap",
          fontFamily: "exocet-blizzard-light",
          fontSize: "20px",
          fontWeight: "bold",
          textShadow: "1px 1px 1px black"
        }}
        disabled={props.heroIdentifiers.length >= 4 || props.loadingLeaderboardHero}
      >
        Add Leaderboard Hero
      </Button>
      <TextField
        className={"MenuItem"}
        select
        label="Leaderboard"
        id="leaderboard"
        value={leaderboard}
        onChange={(e) => setLeaderboard(e.target.value)}
        disabled={props.heroIdentifiers.length >= 4}
        style={{minWidth: "164px", textAlign: "left"}}
      >
        <MenuItem key={"random"} value={"random"}>Random</MenuItem>
        <MenuItem key={"barbarian"} value={"barbarian"}>Barbarian</MenuItem>
        <MenuItem key={"crusader"} value={"crusader"}>Crusader</MenuItem>
        <MenuItem key={"dh"} value={"dh"}>Demon Hunter</MenuItem>
        <MenuItem key={"monk"} value={"monk"}>Monk</MenuItem>
        <MenuItem key={"necromancer"} value={"necromancer"}>Necromancer</MenuItem>
        <MenuItem key={"wd"} value={"wd"}>Witch Doctor</MenuItem>
        <MenuItem key={"wizard"} value={"wizard"}>Wizard</MenuItem>
        <MenuItem style={{color: "red"}} key={"hardcore-barbarian"} value={"hardcore-barbarian"}>HC Barbarian</MenuItem>
        <MenuItem style={{color: "red"}} key={"hardcore-crusader"} value={"hardcore-crusader"}>HC Crusader</MenuItem>
        <MenuItem style={{color: "red"}} key={"hardcore-dh"} value={"hardcore-dh"}>HC Demon Hunter</MenuItem>
        <MenuItem style={{color: "red"}} key={"hardcore-monk"} value={"hardcore-monk"}>HC Monk</MenuItem>
        <MenuItem style={{color: "red"}} key={"hardcore-necromancer"} value={"hardcore-necromancer"}>HC Necromancer</MenuItem>
        <MenuItem style={{color: "red"}} key={"hardcore-wd"} value={"hardcore-wd"}>HC Witch Doctor</MenuItem>
        <MenuItem style={{color: "red"}} key={"hardcore-wizard"} value={"hardcore-wizard"}>HC Wizard</MenuItem>
      </TextField>
      <TextField
        className={"MenuItem"}
        select
        label="Rank"
        id="rank"
        value={rank}
        onChange={(e) => setRank(parseInt(e.target.value))}
        disabled={props.heroIdentifiers.length >= 4}
        style={{minWidth: "93px", textAlign: "left"}}

      >
        <MenuItem key={"random"} value={-1}>Random</MenuItem>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => {
          return <MenuItem key={`rank-${n}`} value={n}>{n}</MenuItem>
        })}
      </TextField>
    </div>
  )
}

export default AddHero;