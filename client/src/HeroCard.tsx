import * as  React from 'react';
import './HeroCard.css';
import {
  AccessToken,
  AuthRepository,
  BasicHeroData,
  D3Repository,
  DetailedHeroData,
  DetailedItems,
  Profile
} from "./interfaces";
import GearItem from "./GearItem";
import {useContext, useEffect, useState} from "react";
import {Select} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";
import {AppContext, IAppContext} from "./App";

interface HeroCardProps {
  authRepository: AuthRepository;
  d3Repository: D3Repository;
  account: string;
  heroid: string;
  heroIndex: number;
  handleGearMouseEnter: (gearSpot: string) => void;
  gearSpotTooltip: string;
}

function HeroCard(props: HeroCardProps) {
  const [hero, setHero] = useState<DetailedHeroData>();
  const [items, setItems] = useState<DetailedItems>();
  const [profileInput, setProfileInput] = useState<string>("");
  const [profile, setProfile] = useState<Profile>();
  const [heroInput, setHeroInput] = useState<string>("");
  const [accessToken, setAccessToken] = useState<AccessToken>({});

  const appContext = useContext<IAppContext>(AppContext);

  const fetchAccessToken = async () => {
    const fetchedAccessToken: AccessToken = await props.authRepository.getAccessToken();
    setAccessToken(fetchedAccessToken);
  };

  useEffect(() => {
    setHeroInput(props.heroid);
    setProfileInput(props.account);
    fetchAccessToken();
  }, []);

  function handleProfileChange(event: any) {
    setProfileInput(event.target.value);
  }

  function handleHeroChange(event: any) {
    setHeroInput(event.target.value);
  }

  async function fetchProfile() {
    const fetchedProfile: Profile = await props.d3Repository.getProfile(profileInput, accessToken);
    setProfile(fetchedProfile);
  }

  async function fetchHero() {
    const fetchedHero: DetailedHeroData = await props.d3Repository.getHero(profileInput, heroInput, accessToken);
    const fetchedItems: DetailedItems = await props.d3Repository.getDetailedItems(profileInput, heroInput, accessToken);

    setHero(fetchedHero);
    setItems(fetchedItems);
  }

  function handleGearMouseEnter(gearSpot: string) {
    props.handleGearMouseEnter(gearSpot);
  }

  function startCase(stat: string) {
    const result = stat.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  return (
    <>
      <div className={"HeroCard"}>
        <Card className="Selector">
          <Input value={profileInput} onChange={handleProfileChange}/>
          <br/>
          <Button onClick={fetchProfile}>submit</Button>
          <br/>
          {profile && (
            <>
              <Select
                native
                value={heroInput}
                onChange={handleHeroChange}
              >
                <option/>
                {profile.heroes && profile.heroes.map((hero: BasicHeroData) => {
                  return (
                    <option
                      key={hero.id}
                      value={hero.id}
                    >
                      {`${hero.name} (${hero.class})`}
                    </option>
                  )
                })}
              </Select>
              <br/>
              <Button onClick={fetchHero}>submit</Button>
            </>
          )}
        </Card>
        {hero && items && (
          <div className="Hero">
            {hero && hero.name}
            <div className={"HeroGrid"}>
              {Object.keys(items).map((item: string, i) => {
                return (
                  <GearItem
                    key={`${props.heroIndex}-${item}`}
                    hero={hero}
                    gearSpot={item}
                    detailedItem={items[item]}
                    handleGearMouseEnter={handleGearMouseEnter}
                    gearSpotTooltip={props.gearSpotTooltip}
                  />
                );
              })}
            </div>
            <Card className={"Stats"}>
              {Object.keys(hero.stats).map((stat: string) => {
                return <div
                  style={appContext.hoveredStat === stat ? {color: "red"} : {color: "white"}}
                  onMouseEnter={() => appContext.setSelectedStat(stat)}
                  className={"StatItem"}
                  key={stat}
                >
                  {`${startCase(stat)}: ${hero.stats[stat]}`}
                </div>
              })}
            </Card>
          </div>
        )}
      </div>
    </>
  );
}

export default HeroCard;
