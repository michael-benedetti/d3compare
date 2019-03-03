import {Component} from "react";
import * as React from "react";
import Tooltip from '@material-ui/core/Tooltip';

interface GearItemProps {
  hero: any;
  gearSpot: string;
  detailedItem: any;
}

class GearItem extends Component<GearItemProps> {
  constructor(props: GearItemProps) {
    super(props);
  }

  render() {
    const itemIcon = this.props.hero["items"][this.props.gearSpot]["icon"];
    const item = this.props.detailedItem;
    const primaryAttributes = item["attributesHtml"]["primary"];
    const secondaryAttributes = item["attributesHtml"]["secondary"];
    const setDescription = item["set"] && item["set"]["descriptionHtml"];

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
      <>
        <div className={`box ${this.props.gearSpot}`}>
          <Tooltip
            title={tooltip}
          >
            <img alt="bleh" src={`http://media.blizzard.com/d3/icons/items/large/${itemIcon}.png`}/>
          </Tooltip>
        </div>
      </>
    );
  }
}

export default GearItem;