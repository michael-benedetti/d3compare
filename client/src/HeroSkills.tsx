import {DetailedHeroData, Skill} from "./interfaces";
import * as React from "react";

interface HeroSkillsProps {
  hero: DetailedHeroData;
  heroIndex: number;
}

function HeroSkills(props: HeroSkillsProps) {
  return (
    <div className={"Skills"}>
      {props.hero.skills.active.map((skill: Skill, i: number) =>
        <div key={`${props.heroIndex}-${skill.skill.slug}`} className={`p${i}`}>
          <a className={`Skill p${i}`}
             href={`https://us.diablo3.com/en${skill.skill.tooltipUrl}`}>
            <img alt={skill.skill.slug}
                 src={`http://media.blizzard.com/d3/icons/skills/42/${skill.skill.icon}.png`}/>
          </a>
        </div>
      )}
      {props.hero.skills.passive.map((skill: Skill, i: number) =>
        <div key={`${props.heroIndex}-${skill.skill.slug}`} className={`s${i}`}>
          <a href={`https://us.diablo3.com/en${skill.skill.tooltipUrl}`}>
            <img alt={skill.skill.slug}
                 src={`http://media.blizzard.com/d3/icons/skills/42/${skill.skill.icon}.png`}/>
          </a>
        </div>
      )}
    </div>
  )
}

export default HeroSkills