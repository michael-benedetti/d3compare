import * as React from "react";
import {DetailedHeroData} from "./interfaces";
import {startCase} from "./helpers";

interface HeroInfoProps {
  hero: DetailedHeroData;
}

function HeroInfo(props: HeroInfoProps) {
  return (
    <>
      {props.hero &&
      <>
        <div style={{fontSize: "14px"}}>
          {`${props.hero.level} `}
          <span style={{color: "#7755ff"}}>{`(${props.hero.paragonLevel}) `}</span>
          {props.hero.class && startCase(props.hero.class)}
          {props.hero.seasonal && <span style={{color: "#66cc00"}}> - Seasonal</span>}
        </div>
        <div className={"HeroName"} style={{color: props.hero.hardcore ? "red" : "white"}}>{props.hero.name}</div>
      </>
      }
    </>

  )
}

export default HeroInfo