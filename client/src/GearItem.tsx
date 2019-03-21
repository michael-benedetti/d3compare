import * as React from "react";
import Tooltip from '@material-ui/core/Tooltip';
import './GearItem.css';
import {DetailedHeroData, DetailedItem} from "./interfaces";

interface GearItemProps {
  hero: DetailedHeroData;
  heroIndex: number;
  gearSpot: string;
  detailedItem: DetailedItem;
  handleGearMouseEnter: (gearSpot: string) => void;
  gearSpotTooltip: string
}

function GearItem(props: GearItemProps) {
  const itemIcon = props.hero.items[props.gearSpot] && props.hero.items[props.gearSpot].icon || "";
  const item = props.detailedItem;
  const primaryAttributes = item.attributesHtml && item.attributesHtml.primary || [];
  const secondaryAttributes = item.attributesHtml && item.attributesHtml.secondary || [];
  const setDescription = item.set && item.set.descriptionHtml || "";

  const tooltip = (
    <div>
      <h3>{item.typeName}</h3>
      <h2>{item.name}</h2>
      {primaryAttributes.map((attribute: string) => <div key={attribute}
                                                         dangerouslySetInnerHTML={{__html: attribute}}/>)}
      {secondaryAttributes.map((attribute: string) => <div key={attribute}
                                                           dangerouslySetInnerHTML={{__html: attribute}}/>)}
      <div dangerouslySetInnerHTML={{__html: setDescription}}/>
      <br/>
      <div className={"Gems"}>
      {item.gems && item.gems.map((gem, i) =>
        <div className="Gem" key={`${props.heroIndex}-${gem.item.slug}-${i}`}><img src={`http://media.blizzard.com/d3/icons/items/small/${gem.item.icon}.png`}/>{`${gem.attributes}`}</div>)}
      </div>
    </div>
  );

  function handleMouseEnter() {
    props.handleGearMouseEnter(props.gearSpot);
  }

  function handleMouseLeave() {
    props.handleGearMouseEnter("");
  }

  let itemType: string = "Normal";
  if (item.typeName.includes("Set")) {
    itemType = "Set";
  } else if (item.typeName.includes("Legendary")) {
    itemType = "Legendary";
  } else if (item.typeName.includes("Rare")) {
    itemType = "Rare";
  } else if (item.typeName.includes("Magic")) {
    itemType = "Magic";
  }

  return (
    <div className={`GearItem ${itemType} ${props.gearSpot}`}>
      <Tooltip
        title={tooltip}
        open={props.gearSpotTooltip == props.gearSpot}
      >
        <img
          id={`img-${props.gearSpot}`}
          alt={props.gearSpot}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          src={`http://media.blizzard.com/d3/icons/items/large/${itemIcon}.png`}
        />
      </Tooltip>
    </div>
  );
}

export default GearItem;