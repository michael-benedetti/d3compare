import {DetailedHeroData, Skill} from "./helpers/interfaces";
import * as React from "react";
import {Tooltip} from "@material-ui/core";
import "./css/HeroSkills.css";

interface HeroSkillsProps {
  hero: DetailedHeroData;
  heroIndex: number;
}

function HeroSkills(props: HeroSkillsProps) {
  return (
    <div className={"Skills"}>
      {props.hero.skills.active.map((skill: Skill, i: number) => {
        const toolTip = (
          <div key={`${props.heroIndex}-${skill.skill.name}`} className={"SkillTooltip"}>
            <div className="skill-name">{skill.skill.name}</div>
            <img className="pri-img" src={`http://media.blizzard.com/d3/icons/skills/64/${skill.skill.icon}.png`}/>
            <div className="pri-desc" dangerouslySetInnerHTML={{__html: skill.skill.descriptionHtml}}/>
            {skill.rune &&
            <>
              <hr className="skill-hr"/>
              <div className={`rune-img rune-img-${i}`}/>
              <div className="rune-name">{skill.rune.name}</div>
              <div className="rune-desc" dangerouslySetInnerHTML={{__html: skill.rune.descriptionHtml}}/>
            </>
            }
          </div>
        );
        return (
          <div key={`${props.hero.id}-${skill.skill.slug}`} className={`p${i}`}>
            <Tooltip title={toolTip}>
              <img alt={skill.skill.slug}
                   src={`http://media.blizzard.com/d3/icons/skills/42/${skill.skill.icon}.png`}/>
            </Tooltip>
          </div>
        )
      }
      )}
      {props.hero.skills.passive.map((skill: Skill, i: number) =>
        <div key={`${props.hero.id}-${skill.skill.slug}`} className={`s${i}`}>
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