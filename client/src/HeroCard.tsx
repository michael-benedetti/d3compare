import * as  React from 'react';
import './HeroCard.css';
import {
  DetailedHeroData,
  Profile, Skill
} from "./interfaces";
import {useContext, useState} from "react";
import Card from "@material-ui/core/Card";
import {AppContext, IAppContext} from "./App";
import {startCase} from "./helpers";
import HeroInfo from "./HeroInfo";
import HeroGrid from "./HeroGrid";
import HeroSelector from "./HeroSelector";

interface HeroCardProps {
  account: string;
  heroIndex: number;
  handleGearMouseEnter: (gearSpot: string) => void;
  gearSpotTooltip: string;
}

function HeroCard(props: HeroCardProps) {
  const [hero, setHero] = useState<DetailedHeroData>();
  const [profile, setProfile] = useState<Profile>({battleTag: "Demospheus#1879"});

  const appContext = useContext<IAppContext>(AppContext);

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
            <div className={"Skills"}>
              {hero.skills.active.map((skill: Skill, i: number) =>
                <div key={`${props.heroIndex}-${skill.skill.slug}`} className={`p${i}`}>
                  <a className={`Skill p${i}`}
                     href={`https://us.diablo3.com/en${skill.skill.tooltipUrl}`}>
                    <img alt={skill.skill.slug}
                         src={`http://media.blizzard.com/d3/icons/skills/42/${skill.skill.icon}.png`}/>
                  </a>
                </div>
              )}
              {hero.skills.passive.map((skill: Skill, i: number) =>
                <div key={`${props.heroIndex}-${skill.skill.slug}`} className={`s${i}`}>
                  <a href={`https://us.diablo3.com/en${skill.skill.tooltipUrl}`}>
                    <img alt={skill.skill.slug}
                         src={`http://media.blizzard.com/d3/icons/skills/42/${skill.skill.icon}.png`}/>
                  </a>
                </div>
              )}
            </div>
            <Card className={"Stats"}>
              {Object.keys(hero.stats).map((stat: string) => {
                return <div
                  style={appContext.hoveredStat === stat ? {color: "red"} : {color: "white"}}
                  onMouseEnter={() => appContext.setSelectedStat(stat)}
                  className={"StatItem"}
                  key={stat}
                >
                  {`${startCase(stat)}: ${hero.stats[stat]}`}
                </div>
              })}
            </Card>
          </div>
        )}
      </div>
    </>
  );
}

export default HeroCard;
