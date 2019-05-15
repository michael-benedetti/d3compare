import {DetailedHeroData, Skill} from "./helpers/interfaces";
import * as React from "react";
import {Tooltip} from "@material-ui/core";
import "./css/HeroSkills.css";
import {AppContext, IAppContext} from "./App";
import {useContext} from "react";

interface HeroSkillsProps {
  hero: DetailedHeroData;
  heroIndex: number;
}

function HeroSkills(props: HeroSkillsProps) {
  const appContext = useContext<IAppContext>(AppContext);

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
          const key = `${props.hero.id}-${skill.skill.slug}`;

          return (
            <div key={key} className={`p${i}`}>
              <Tooltip
                title={toolTip}
                open={appContext.tooltipVisible === key}
              >
                <img alt={skill.skill.slug}
                     src={`http://media.blizzard.com/d3/icons/skills/42/${skill.skill.icon}.png`}
                     onClick={() => appContext.handleShowTooltip(key)}
                     onMouseEnter={() => appContext.handleShowTooltip(key)}
                     onMouseLeave={() => appContext.handleShowTooltip("")}
                />
              </Tooltip>
            </div>
          )
        }
      )}
      {props.hero.skills.passive.map((skill: Skill, i: number) => {
          const toolTip = (
            <div key={`${props.heroIndex}-${skill.skill.name}`} className={"PassiveSkillTooltip"}>
              <div className="skill-name">{skill.skill.name}</div>
              <img className="pri-img" src={`http://media.blizzard.com/d3/icons/skills/64/${skill.skill.icon}.png`}/>
              <div className="pri-desc" dangerouslySetInnerHTML={{__html: skill.skill.descriptionHtml}}/>
            </div>
          );
          const key = `${props.hero.id}-${skill.skill.slug}`;

          return (
            <div key={key} className={`s${i}`}>
              <Tooltip
                title={toolTip}
                open={appContext.tooltipVisible === key}
              >
                <img
                  alt={skill.skill.slug}
                  src={`http://media.blizzard.com/d3/icons/skills/42/${skill.skill.icon}.png`}
                  onClick={() => appContext.handleShowTooltip(key)}
                  onMouseEnter={() => appContext.handleShowTooltip(key)}
                  onMouseLeave={() => appContext.handleShowTooltip("")}
                />
              </Tooltip>
            </div>
          )
        }
      )}
    </div>
  )
}

export default HeroSkills;
