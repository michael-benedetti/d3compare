import Button from "@material-ui/core/Button";
import Close from "@material-ui/icons/Close";
import "./HeroSelector.css";
import {BasicHeroData, HeroIdentifier, Profile} from "./interfaces";
import Card from "@material-ui/core/Card";
import * as React from "react";
import {Dispatch, SetStateAction, useState} from "react";
import {useContext} from "react";
import {AppContext, IAppContext} from "./App";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import {MenuItem} from "@material-ui/core";

interface HeroSelectorProps {
  profile: Profile;
  setProfile: Dispatch<SetStateAction<Profile>>;
  handleHeroChange: (region: string, account: string, heroId: string) => void;
  initialHero: HeroIdentifier;
  heroIndex: number;
  handleRemoveHero: (heroIndex: number) => void;
}

function HeroSelector(props: HeroSelectorProps) {
  const [profileInput, setProfileInput] = useState<string>(props.initialHero.account);
  const [regionInput, setRegionInput] = useState<string>(props.initialHero.region);
  const [heroInput, setHeroInput] = useState<string>(props.initialHero.heroId);
  const [error, setError] = useState<boolean>(false);

  const appContext = useContext<IAppContext>(AppContext);

  const regions = ["us", "eu", "kr", "tw"];

  function handleHeroChange(event: any) {
    const newHero: string = event.target.value;
    setHeroInput(newHero);
    props.handleHeroChange(regionInput, profileInput, newHero);
  }

  function handleProfileChange(event: any) {
    setProfileInput(event.target.value);
  }

  function handleRegionChange(event: any) {
    setRegionInput(event.target.value);
  }

  async function fetchProfile() {
    try {
      const fetchedProfile: Profile = await appContext.d3Repository.getProfile(regionInput, profileInput);
      props.setProfile(fetchedProfile);
      setError(false);
    } catch {
      setError(true);
    }
  }

  return (
    <Card className="Selector">
      <div style={{display: "flex", justifyContent: "right"}}>
        <IconButton style={{padding: "5px"}} onClick={() => props.handleRemoveHero(props.heroIndex)}><Close
          fontSize={"small"}/></IconButton>
      </div>
      <TextField
        select
        label="Region"
        id="region"
        value={regionInput}
        onChange={handleRegionChange}
        style={{width: "25%"}}
      >
        {regions.map((region: string) => {
          return (
            <MenuItem
              key={region}
              value={region}
            >
              {`${region.toUpperCase()}`}
            </MenuItem>
          )
        })}
      </TextField>
      <TextField
        label="Battle Tag"
        value={profileInput}
        onChange={handleProfileChange}
        style={{width: "90%"}}
        error={error}
      />
      <br/>
      <Button onClick={fetchProfile}>submit</Button>
      <br/>
      <>
        <TextField
          select
          label="Hero"
          id="heroInput"
          value={heroInput}
          onChange={handleHeroChange}
          disabled={!props.profile.battleTag}
          style={{width: "90%"}}
        >
          {props.profile.heroes && props.profile.heroes.map((hero: BasicHeroData) => {
            return (
              <MenuItem
                key={hero.id}
                value={hero.id}
              >
                {`${hero.name} (${hero.class})`}
              </MenuItem>
            )
          })}
        </TextField>
      </>
    </Card>
  )
}

export default HeroSelector