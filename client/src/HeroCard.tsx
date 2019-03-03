import * as  React from 'react';
import './App.css';
import {Component} from "react";
import {AuthRepository, D3Repository} from "./interfaces";
import GearItem from "./GearItem";

interface HeroCardState {
  hero: any;
  items: any;
}

interface HeroCardProps {
  authRepository: AuthRepository;
  d3Repository: D3Repository;
  account: string;
  heroid: string;
}

class HeroCard extends Component<HeroCardProps, HeroCardState> {
  constructor(props: HeroCardProps) {
    super(props);
    this.state = {
      hero: null,
      items: null,
    }
  }

  public async componentDidMount() {
    const accessToken: any = await this.props.authRepository.getAccessToken();
    const hero = await this.props.d3Repository.getHero(this.props.account, this.props.heroid, accessToken);
    const items = await this.props.d3Repository.getDetailedItems(this.props.account, this.props.heroid, accessToken);
    this.setState({
      hero,
      items,
    })
  }

  render() {
    return (
      <>
        {
          this.state.hero && this.state.items &&(
            <div>
              {this.state.hero && this.state.hero["name"]}
              <div className={"hero-grid"}>
                <GearItem
                  hero={this.state.hero}
                  gearSpot={"head"}
                  detailedItem={this.state.items["head"]}

                />
                <GearItem
                  hero={this.state.hero}
                  gearSpot={"neck"}
                  detailedItem={this.state.items["neck"]}
                />
                <GearItem
                  hero={this.state.hero}
                  gearSpot={"torso"}
                  detailedItem={this.state.items["torso"]}
                />
                <GearItem
                  hero={this.state.hero}
                  gearSpot={"shoulders"}
                  detailedItem={this.state.items["shoulders"]}
                />
                <GearItem
                  hero={this.state.hero}
                  gearSpot={"legs"}
                  detailedItem={this.state.items["legs"]}
                />
                <GearItem
                  hero={this.state.hero}
                  gearSpot={"waist"}
                  detailedItem={this.state.items["waist"]}
                />
                <GearItem
                  hero={this.state.hero}
                  gearSpot={"hands"}
                  detailedItem={this.state.items["hands"]}
                />
                <GearItem
                  hero={this.state.hero}
                  gearSpot={"bracers"}
                  detailedItem={this.state.items["bracers"]}
                />
                <GearItem
                  hero={this.state.hero}
                  gearSpot={"feet"}
                  detailedItem={this.state.items["feet"]}
                />
                <GearItem
                  hero={this.state.hero}
                  gearSpot={"leftFinger"}
                  detailedItem={this.state.items["leftFinger"]}
                />
                <GearItem
                  hero={this.state.hero}
                  gearSpot={"rightFinger"}
                  detailedItem={this.state.items["rightFinger"]}
                />
                <GearItem
                  hero={this.state.hero}
                  gearSpot={"mainHand"}
                  detailedItem={this.state.items["mainHand"]}
                />
                <GearItem
                  hero={this.state.hero}
                  gearSpot={"offHand"}
                  detailedItem={this.state.items["offHand"]}
                />
              </div>
              Life: {this.state.hero["stats"]["life"]} <br/>
              Damage: {this.state.hero["stats"]["damage"]} <br/>
              Toughness: {this.state.hero["stats"]["toughness"]} <br/>
            </div>
          )}
      </>
    );
  }
}

export default HeroCard;
