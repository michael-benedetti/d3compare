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
  handleHeroChange: (newHeroIdentifier: HeroIdentifier, heroIndex: number) => void;
  heroIdentifier: HeroIdentifier;
  heroIndex: number;
  handleGearMouseEnter: (gearSpot: string) => void;
  gearSpotTooltip: string;
  handleRemoveHero: (heroIndex: number) => void;
}

function HeroCard(props: HeroCardProps) {
  const [hero, setHero] = useState<DetailedHeroData>();
  const [profile, setProfile] = useState<Profile>({battleTag: ""});

  const appContext = useContext(AppContext);

  function handleGearMouseEnter(gearSpot: string) {
    props.handleGearMouseEnter(gearSpot);
  }

  async function handleHeroChange(region: string, account: string, heroId: string) {
    const newHeroIdentifier: HeroIdentifier = {region, account, heroId, key: props.heroIdentifier.key};
    props.handleHeroChange(newHeroIdentifier, props.heroIndex);
  }

  async function fetchProfile() {
    const fetchedProfile: Profile = await appContext.d3Repository.getProfile(props.heroIdentifier.region, props.heroIdentifier.account);
    setProfile(fetchedProfile);
  }

  async function fetchHero() {
    const fetchedHero: DetailedHeroData = await appContext.d3Repository.getHero(props.heroIdentifier.region, props.heroIdentifier.account, props.heroIdentifier.heroId);
    if (fetchedHero.code !== "NOTFOUND")
      setHero(fetchedHero);
  }

  useEffect(() => {
    if (props.heroIdentifier.account && props.heroIdentifier.heroId) {
      fetchProfile();
      fetchHero();
    }
  }, [props.heroIdentifier.heroId]);

  return (
    <>
      <div className={"HeroCard"}>
        <HeroSelector
          heroIndex={props.heroIndex}
          handleRemoveHero={props.handleRemoveHero}
          initialHero={props.heroIdentifier}
          setProfile={setProfile}
          handleHeroChange={handleHeroChange}
          profile={profile}
        />
        {hero && profile && (
          <div className="Hero">
            <HeroInfo hero={hero}/>
            <HeroGrid
              heroIdentifier={props.heroIdentifier}
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
            <HeroStats
              hero={hero}
              heroIndex={props.heroIndex}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default HeroCard;
