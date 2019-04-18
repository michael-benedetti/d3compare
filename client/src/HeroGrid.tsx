import GearItem from "./GearItem";
import * as React from "react";
import {DetailedHeroData, DetailedItems} from "./interfaces";
import {useEffect, useState} from "react";
import {useContext} from "react";
import {AppContext, IAppContext} from "./App";

interface HeroGridProps {
  profile: string;
  heroIndex: number;
  hero: DetailedHeroData;
  handleGearMouseEnter: (gearspot: string) => void;
  gearSpotTooltip: string;
}

function HeroGrid(props: HeroGridProps) {
  const [items, setItems] = useState<DetailedItems>();

  const appContext = useContext<IAppContext>(AppContext);

  async function fetchItems() {
    const fetchedItems: DetailedItems = await appContext.d3Repository.getDetailedItems(props.profile, props.hero.id.toString());
    setItems(fetchedItems);
  }

  useEffect(() => {
    fetchItems();
  }, [props.hero]);

  return (
    <div className={"HeroGrid"}>
      {items && Object.keys(items).map((item: string) => {
        return (
          <GearItem
            key={`${props.heroIndex}-${item}`}
            heroIndex={props.heroIndex}
            hero={props.hero}
            gearSpot={item}
            detailedItem={items[item]}
            handleGearMouseEnter={props.handleGearMouseEnter}
            gearSpotTooltip={props.gearSpotTooltip}
          />
        );
      })}
    </div>
  )
}

export default HeroGrid