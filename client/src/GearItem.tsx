import * as React from "react";
import Tooltip from '@material-ui/core/Tooltip';
import './GearItem.css';
import {DetailedHeroData, DetailedItem} from "./interfaces";

interface GearItemProps {
  hero: DetailedHeroData;
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
    <div className={"tooltip"}>
      <h2>{item.typeName}</h2>
      <h1>{item.name}</h1>
      {primaryAttributes.map((attribute: string) => <div key={attribute}
                                                         dangerouslySetInnerHTML={{__html: attribute}}/>)}
      {secondaryAttributes.map((attribute: string) => <div key={attribute}
                                                           dangerouslySetInnerHTML={{__html: attribute}}/>)}
      <div dangerouslySetInnerHTML={{__html: setDescription}}/>
      <br/>
      {item.gems && item.gems.map((gem) => <div>{`${gem.item.name}: ${gem.attributes}`}</div>)}
    </div>
  );

  function handleMouseEnter() {
    props.handleGearMouseEnter(props.gearSpot);
  }

  function handleMouseLeave() {
    props.handleGearMouseEnter("");
  }

  const set: boolean = item.set != null;

  return (
    <div className={set ? `GearItem Set ${props.gearSpot}` : `GearItem ${props.gearSpot}`}>
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