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
  const percentageStats = ["goldFind", "critChance", "blockChance", "attackSpeed"];

  return (
    <Card className={"Stats"}>
      {Object.keys(props.hero.stats).map((stat: string) => {
        const statValue = percentageStats.indexOf(stat) > -1
          ? `${(props.hero.stats[stat] * 100).toFixed(2)}%`.replace(".00", "")
          : props.hero.stats[stat].toLocaleString();
        return <div
          style={appContext.hoveredStat === stat ? {color: "red"} : {color: "white"}}
          onMouseEnter={() => appContext.setSelectedStat(stat)}
          className={"StatItem"}
          key={stat}
        >
          {`${startCase(stat)}: ${statValue}`}
        </div>
      })}
    </Card>
  )
}

export default HeroStats