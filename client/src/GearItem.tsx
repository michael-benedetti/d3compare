import * as React from "react";
import Tooltip from '@material-ui/core/Tooltip';
import './css/GearItem.css';
import {DetailedHeroData, DetailedItem} from "./helpers/interfaces";
import {AppContext, IAppContext} from "./App";
import {useContext} from "react";

interface GearItemProps {
  hero: DetailedHeroData;
  heroIndex: number;
  gearSpot: string;
  detailedItem: DetailedItem;
}

function GearItem(props: GearItemProps) {
  const itemIcon = props.hero.items[props.gearSpot] && props.hero.items[props.gearSpot].icon || "";
  const item = props.detailedItem;
  const primaryAttributes = item.attributesHtml && item.attributesHtml.primary || [];
  const secondaryAttributes = item.attributesHtml && item.attributesHtml.secondary || [];
  const setDescription = item.set && item.set.descriptionHtml || "";
  const appContext = useContext<IAppContext>(AppContext);

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

  const tooltip = (
    <div>
      <div>
        <h2 className={`GearItemName GearItem${itemType}`}>{item.name}</h2>
      </div>
      <div>
        <span style={{float: "left"}}>
          <img className={itemType} style={{marginRight: "10px"}}
            src={`http://media.blizzard.com/d3/icons/items/large/${itemIcon}.png`}
          />
        </span>
        <div>
          <div className={`GearItemTypeName GearItem${itemType}`}>{item.typeName}</div>
          {!!item.dps && (
            <>
              <div className="GearItemPrimaryStat">{item.dps}</div>
              <div className="GearItemStat">Damage Per Second</div>
              <div className="GearItemStat"><span className="GearItemStatDetails">{`${Math.round(item.minDamage)}-${Math.round(item.maxDamage)}`}</span> Damage</div>
              <div className="GearItemStat"><span className="GearItemStatDetails">{Math.round(item.attacksPerSecond * 100) / 100}</span> Attacks per Second</div>
            </>
          )}
          {!!item.armor && (
            <>
              <div className="GearItemPrimaryStat">{Math.round(item.armor)}</div>
              <div className="GearItemStat">Armor</div>
              {!!item.blockChance && <div className={"GearItemStat"}><span className="GearItemStatDetails">{item.blockChance.match(/^\+\d+\.\d+% /g)}</span>Chance to Block</div>}
              {!!item.blockChance && <div className={"GearItemStat"}><span className="GearItemStatDetails">{item.blockChance.match(/[0-9,]+-[0-9,]+ /g)}</span>Block Amount</div>}
            </>
          )}
          <div style={{display: "block", clear: "both", marginBottom: "20px"}}/>
          {primaryAttributes.map((attribute: string) => <div key={attribute}
                                                             dangerouslySetInnerHTML={{__html: attribute}}/>)}
          {secondaryAttributes.map((attribute: string) => <div key={attribute}
                                                               dangerouslySetInnerHTML={{__html: attribute}}/>)}
          <div dangerouslySetInnerHTML={{__html: setDescription}}/>
          <br/>
          <div className={"Gems"}>
            {item.gems && item.gems.map((gem, i) =>
              <div className="Gem" key={`${props.heroIndex}-${gem.item.slug}-${i}`}><img
                src={`http://media.blizzard.com/d3/icons/items/small/${gem.item.icon}.png`}/>{`${gem.attributes}`}
              </div>)}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`GearItem ${itemType} ${props.gearSpot} ${props.detailedItem.typeName.includes("Primal") ? "Primal" : ""}`}
      style={{overflow: props.gearSpot === "torso" ? "hidden" : ""}}>
      <Tooltip
        title={tooltip}
        open={appContext.tooltipVisible == props.gearSpot}
      >
        <img
          id={`img-${props.gearSpot}`}
          alt={props.gearSpot}
          onClick={() => appContext.handleShowTooltip(props.gearSpot)}
          onMouseEnter={() => appContext.handleShowTooltip(props.gearSpot)}
          onMouseLeave={() => appContext.handleShowTooltip("")}
          src={`http://media.blizzard.com/d3/icons/items/large/${itemIcon}.png`}
        />
      </Tooltip>
    </div>
  );
}

export default GearItem;