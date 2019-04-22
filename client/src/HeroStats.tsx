import {startCase} from "./helpers";
import Card from "@material-ui/core/Card";
import * as React from "react";
import {DetailedHeroData} from "./interfaces";
import {useContext} from "react";
import {AppContext} from "./App";
import './HeroStats.css';

interface HeroStatsProps {
  hero: DetailedHeroData;
  heroIndex: number;
}

function HeroStats(props: HeroStatsProps) {
  const appContext = useContext(AppContext);
  const percentageStats = ["goldFind", "critChance", "blockChance", "attackSpeed"];

  function determineStyles(stat: string) {
    const styles = [];
    if (appContext.hoveredStat.stat === stat) {
      styles.push({fontWeight: "bold"});
      if (appContext.hoveredStat.heroIndex === props.heroIndex) {
        styles.push({color: "black", backgroundColor: "#ccc"});
      } else if (appContext.hoveredStat.statValue > props.hero.stats[stat]) {
        styles.push({color: "red"});
      } else if (appContext.hoveredStat.statValue === props.hero.stats[stat]) {
        styles.push({color: "black"});
      } else if (appContext.hoveredStat.statValue < props.hero.stats[stat]) {
        styles.push({color: "#00ff22"});
      }
    } else {
      styles.push({color: "white"});
    }
    return Object.assign({}, ...styles);
  }

return (
  <Card className={"Stats"}>
    {Object.keys(props.hero.stats).map((stat: string) => {
      const statValue = percentageStats.indexOf(stat) > -1
        ? `${(props.hero.stats[stat] * 100).toFixed(2)}%`.replace(".00", "")
        : props.hero.stats[stat].toLocaleString();
      const styles = determineStyles(stat);
      return <div
        style={styles}
        onMouseEnter={() => appContext.setSelectedStat({
          stat,
          statValue: props.hero.stats[stat],
          heroIndex: props.heroIndex
        })}
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