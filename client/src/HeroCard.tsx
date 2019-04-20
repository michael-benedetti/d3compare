import * as  React from 'react';
import './HeroCard.css';
import {
  DetailedHeroData, HeroIdentifier,
  Profile
} from "./interfaces";
import {useContext, useEffect, useState} from "react";
import HeroInfo from "./HeroInfo";
import HeroGrid from "./HeroGrid";
import HeroSelector from "./HeroSelector";
import HeroSkills from "./HeroSkills";
import HeroStats from "./HeroStats";
import HeroLegendaryPowers from "./HeroLegendaryPowers";
import {AppContext} from "./App";

interface HeroCardProps {
  hero: HeroIdentifier;
  heroIndex: number;
  handleGearMouseEnter: (gearSpot: string) => void;
  gearSpotTooltip: string;
  handleRemoveHero: (heroIndex: number) => void;
}

function HeroCard(props: HeroCardProps) {
  const [hero, setHero] = useState<DetailedHeroData>();
  const [heroIdentifier, setHeroIdentifier] = useState<HeroIdentifier>(props.hero);
  const [profile, setProfile] = useState<Profile>({battleTag: ""});

  const appContext = useContext(AppContext);

  function handleGearMouseEnter(gearSpot: string) {
    props.handleGearMouseEnter(gearSpot);
  }

  async function handleHeroChange(region: string, account: string, heroId: string) {
    setHeroIdentifier({region, account, heroId});
    setHero(await appContext.d3Repository.getHero(region, account, heroId));
  }

  async function fetchProfile() {
    const fetchedProfile: Profile = await appContext.d3Repository.getProfile(heroIdentifier.region, heroIdentifier.account);
    setProfile(fetchedProfile);
  }

  async function fetchHero() {
    const fetchedHero: DetailedHeroData = await appContext.d3Repository.getHero(heroIdentifier.region, heroIdentifier.account, heroIdentifier.heroId);
    if (fetchedHero.code !== "NOTFOUND")
      setHero(fetchedHero);
  }

  useEffect(() => {
    if (props.hero.account && props.hero.heroId) {
      fetchProfile();
      fetchHero();
    }
  }, []);

  return (
    <>
      <div className={"HeroCard"}>
        <HeroSelector
          heroIndex={props.heroIndex}
          handleRemoveHero={props.handleRemoveHero}
          initialHero={props.hero}
          setProfile={setProfile}
          handleHeroChange={handleHeroChange}
          profile={profile}
        />
        {hero && profile && (
          <div className="Hero">
            <HeroInfo hero={hero}/>
            <HeroGrid
              heroIdentifier={heroIdentifier || {region: "us", battleTag: "", heroId: ""}}
              heroIndex={props.heroIndex}
              hero={hero}
              handleGearMouseEnter={handleGearMouseEnter}
              gearSpotTooltip={props.gearSpotTooltip}
            />
            <HeroSkills
              hero={hero}
              heroIndex={props.heroIndex}
            />
            <HeroLegendaryPowers
              hero={hero}
              heroIndex={props.heroIndex}
            />
            <HeroStats hero={hero}/>
          </div>
        )}
      </div>
    </>
  );
}

export default HeroCard;
