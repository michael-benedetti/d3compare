import * as  React from 'react';
import './HeroCard.css';
import {
  DetailedHeroData,
  Profile
} from "./interfaces";
import {useState} from "react";
import HeroInfo from "./HeroInfo";
import HeroGrid from "./HeroGrid";
import HeroSelector from "./HeroSelector";
import HeroSkills from "./HeroSkills";
import HeroStats from "./HeroStats";
import HeroLegendaryPowers from "./HeroLegendaryPowers";

interface HeroCardProps {
  account: string;
  heroIndex: number;
  handleGearMouseEnter: (gearSpot: string) => void;
  gearSpotTooltip: string;
}

function HeroCard(props: HeroCardProps) {
  const [hero, setHero] = useState<DetailedHeroData>();
  const [profile, setProfile] = useState<Profile>({battleTag: "Demospheus#1879"});

  function handleGearMouseEnter(gearSpot: string) {
    props.handleGearMouseEnter(gearSpot);
  }

  function handleHeroChange(newHero: DetailedHeroData) {
    setHero(newHero);
  }

  return (
    <>
      <div className={"HeroCard"}>
        <HeroSelector
          initialAccount={props.account}
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
