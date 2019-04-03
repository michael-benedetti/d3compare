import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import {Select} from "@material-ui/core";
import "./HeroSelector.css";
import {BasicHeroData, DetailedHeroData, HeroIdentifier, Profile} from "./interfaces";
import Card from "@material-ui/core/Card";
import * as React from "react";
import {useState} from "react";
import {useContext} from "react";
import {AppContext, IAppContext} from "./App";

interface HeroSelectorProps {
  profile: Profile;
  setProfile: any;
  handleHeroChange: (newHero: DetailedHeroData) => void;
  initialHero: HeroIdentifier;
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
    const fetchedProfile: Profile = await appContext.d3Repository.getProfile(profileInput, appContext.accessToken);
    props.setProfile(fetchedProfile);
  }

  async function fetchHero(hero: string) {
    const fetchedHero: DetailedHeroData = await appContext.d3Repository.getHero(profileInput, hero, appContext.accessToken);
    props.handleHeroChange(fetchedHero);
  }

  return (
    <Card className="Selector">
      <Input value={profileInput} onChange={handleProfileChange}/>
      <br/>
      <Button onClick={fetchProfile}>submit</Button>
      <br/>
      {props.profile.heroes && (
        <>
          <Select
            id={"heroInput"}
            native
            value={heroInput}
            onChange={handleHeroChange}
          >
            <option/>
            {props.profile.heroes && props.profile.heroes.map((hero: BasicHeroData) => {
              return (
                <option
                  key={hero.id}
                  value={hero.id}
                >
                  {`${hero.name} (${hero.class})`}
                </option>
              )
            })}
          </Select>
        </>
      )}
    </Card>
  )
}

export default HeroSelector