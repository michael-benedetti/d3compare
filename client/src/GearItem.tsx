import * as React from "react";
import Tooltip from '@material-ui/core/Tooltip';

interface GearItemProps {
  hero: any;
  gearSpot: string;
  detailedItem: any;
  handleGearMouseEnter: (gearSpot: string) => void;
  gearSpotTooltip: string
}

function GearItem(props: GearItemProps) {
  const itemIcon = props.hero["items"][props.gearSpot] && props.hero["items"][props.gearSpot]["icon"] || "";
  const item = props.detailedItem;
  const primaryAttributes = item["attributesHtml"] && item["attributesHtml"]["primary"] || [];
  const secondaryAttributes = item["attributesHtml"] && item["attributesHtml"]["secondary"] || [];
  const setDescription = item["set"] && item["set"]["descriptionHtml"] || "";

  const tooltip = (
    <div className={"tooltip"}>
      <h2>{item["typeName"]}</h2>
      <h1>{item["name"]}</h1>
      {primaryAttributes.map((attribute: string) => <div dangerouslySetInnerHTML={{__html: attribute}}/>)}
      {secondaryAttributes.map((attribute: string) => <div dangerouslySetInnerHTML={{__html: attribute}}/>)}
      <div dangerouslySetInnerHTML={{__html: setDescription}}/>
    </div>
  );

  function handleMouseEnter() {
    props.handleGearMouseEnter(props.gearSpot);
  }

  return (
      <div className={`box ${props.gearSpot}`}>
        <Tooltip
          title={tooltip}
          open={props.gearSpotTooltip == props.gearSpot}
        >
          <img alt={props.gearSpot} onMouseEnter={handleMouseEnter} src={`http://media.blizzard.com/d3/icons/items/large/${itemIcon}.png`}/>
        </Tooltip>
      </div>
  );
}

export default GearItem;