import {startCase} from "./helpers";
import Card from "@material-ui/core/Card";
import * as React from "react";
import {DetailedHeroData} from "./interfaces";
import {useContext} from "react";
import {AppContext} from "./App";

interface HeroStatsProps {
  hero: DetailedHeroData;
}

function HeroStats(props: HeroStatsProps) {
  const appContext = useContext(AppContext);

  return (
    <Card className={"Stats"}>
      {Object.keys(props.hero.stats).map((stat: string) => {
        return <div
          style={appContext.hoveredStat === stat ? {color: "red"} : {color: "white"}}
          onMouseEnter={() => appContext.setSelectedStat(stat)}
          className={"StatItem"}
          key={stat}
        >
          {`${startCase(stat)}: ${props.hero.stats[stat]}`}
        </div>
      })}
    </Card>
  )
}

export default HeroStats