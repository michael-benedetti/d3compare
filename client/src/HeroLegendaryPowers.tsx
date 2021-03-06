import {DetailedHeroData, LegendaryPower} from "./helpers/interfaces";
import * as  React from 'react';

interface HeroLegendaryPowersProps {
  hero: DetailedHeroData;
  heroIndex: number;
}

function HeroLegendaryPowers(props: HeroLegendaryPowersProps) {
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        flexDirection: "row",
        marginBottom: "20px",
        height: "134px",
      }}
      className="LegendaryPowers"
    >
      {props.hero.legendaryPowers.map((legendaryPower: LegendaryPower, i: number) => {
        return (
          <div key={`legendaryPower-${props.hero.id}-${legendaryPower.id}`} style={{
            margin: "auto",
            backgroundImage: "url(https://us.diablo3.com/static/images/icons/Active-Default.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "83px 134px",
            height: "134px",
            width: "83px"
          }}
          >
            <a style={{
              backgroundImage: `url(http://media.blizzard.com/d3/icons/items/large/${legendaryPower.icon}.png)`,
              display: "block",
              height: "140px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
            }}
               href={`https://us.diablo3.com/en${legendaryPower.tooltipParams}`}/>
          </div>
        )
      })}
    </div>
  )
}

export default HeroLegendaryPowers