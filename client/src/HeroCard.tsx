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
}

function HeroCard(props: HeroCardProps) {
  const [hero, setHero] = useState<DetailedHeroData>();
  const [profile, setProfile] = useState<Profile>({battleTag: ""});

  const appContext = useContext(AppContext);

  function handleGearMouseEnter(gearSpot: string) {
    props.handleGearMouseEnter(gearSpot);
  }

  function handleHeroChange(newHero: DetailedHeroData) {
    setHero(newHero);
  }

  async function fetchProfile() {
    const fetchedProfile: Profile = await appContext.d3Repository.getProfile(props.hero.account, appContext.accessToken);
    setProfile(fetchedProfile);
  }

  async function fetchHero() {
    const fetchedHero: DetailedHeroData = await appContext.d3Repository.getHero(props.hero.account, props.hero.heroId, appContext.accessToken);
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
          initialHero={props.hero}
          setProfile={setProfile}
          handleHeroChange={handleHeroChange}
          profile={profile}
        />
        {hero && profile && (
          <div className="Hero">
            <HeroInfo hero={hero}/>
            <HeroGrid
              profile={profile.battleTag || ""}
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
            />
            <HeroStats hero={hero}/>
          </div>
        )}
      </div>
    </>
  );
}

export default HeroCard;
