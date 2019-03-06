import * as React from "react";
import Tooltip from '@material-ui/core/Tooltip';

interface GearItemProps {
  hero: any;
  gearSpot: string;
  detailedItem: any;
}

function GearItem(props: GearItemProps) {
  console.log(props.gearSpot);
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

  return (
      <div className={`box ${props.gearSpot}`}>
        <Tooltip
          title={tooltip}
        >
          <img alt={props.gearSpot} src={`http://media.blizzard.com/d3/icons/items/large/${itemIcon}.png`}/>
        </Tooltip>
      </div>
  );
}

export default GearItem;