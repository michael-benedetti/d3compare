import Button from "@material-ui/core/Button";
import Close from "@material-ui/icons/Close";
import "./HeroSelector.css";
import {BasicHeroData, DetailedHeroData, HeroIdentifier, Profile} from "./interfaces";
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
  handleHeroChange: (newHero: DetailedHeroData) => void;
  initialHero: HeroIdentifier;
  heroIndex: number;
  handleRemoveHero: (heroIndex: number) => void;
}

function HeroSelector(props: HeroSelectorProps) {
  const [profileInput, setProfileInput] = useState<string>(props.initialHero.account);
  const [heroInput, setHeroInput] = useState<string>(props.initialHero.heroId);

  const appContext = useContext<IAppContext>(AppContext);

  function handleHeroChange(event: any) {
    const newHero: string = event.target.value;
    setHeroInput(newHero);
    fetchHero(newHero);
  }

  function handleProfileChange(event: any) {
    setProfileInput(event.target.value);
  }

  async function fetchProfile() {
    const fetchedProfile: Profile = await appContext.d3Repository.getProfile(profileInput);
    props.setProfile(fetchedProfile);
  }

  async function fetchHero(hero: string) {
    const fetchedHero: DetailedHeroData = await appContext.d3Repository.getHero(profileInput, hero);
    props.handleHeroChange(fetchedHero);
  }

  return (
    <Card className="Selector">
      <div style={{display: "flex", justifyContent: "right"}}>
        <IconButton style={{padding: "5px"}} onClick={() => props.handleRemoveHero(props.heroIndex)}><Close fontSize={"small"}/></IconButton>
      </div>
      <TextField
        label="Battle Tag"
        value={profileInput}
        onChange={handleProfileChange}
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