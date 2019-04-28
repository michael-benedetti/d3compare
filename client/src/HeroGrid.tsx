import GearItem from "./GearItem";
import * as React from "react";
import {DetailedHeroData, DetailedItems, HeroIdentifier} from "./helpers/interfaces";

interface HeroGridProps {
  heroIdentifier: HeroIdentifier;
  heroIndex: number;
  hero: DetailedHeroData;
  detailedItems: DetailedItems;
}

function HeroGrid(props: HeroGridProps) {
  return (
    <div className={"HeroGrid"}>
      {props.detailedItems && Object.keys(props.detailedItems).map((item: string) => {
        return (
          <GearItem
            key={`${props.heroIndex}-${item}`}
            heroIndex={props.heroIndex}
            hero={props.hero}
            gearSpot={item}
            detailedItem={props.detailedItems[item]}
          />
        );
      })}
    </div>
  )
}

export default HeroGrid