import * as  React from 'react';
import './App.css';
import {AuthRepository, D3Repository} from "./interfaces";
import GearItem from "./GearItem";
import {useEffect, useState} from "react";
import {Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

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
  const [hero, setHero] = useState();
  const [items, setItems] = useState();
  const [profileInput, setProfileInput] = useState();
  const [profile, setProfile] = useState();
  const [heroInput, setHeroInput] = useState();
  const [accessToken, setAccessToken] = useState();

  const fetchAccessToken = async () => {
    const fetchedAccessToken: any = await props.authRepository.getAccessToken();
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
    const fetchedProfile = await props.d3Repository.getProfile(profileInput, accessToken);
    setProfile(fetchedProfile);
  }

  async function fetchHero() {
    const fetchedHero = await props.d3Repository.getHero(profileInput, heroInput, accessToken);
    const fetchedItems = await props.d3Repository.getDetailedItems(profileInput, heroInput, accessToken);

    setHero(fetchedHero);
    setItems(fetchedItems);
  }

  function handleGearMouseEnter(gearSpot: string) {
    props.handleGearMouseEnter(gearSpot);
  }

  return (
    <>
      <div>
        <div className="selectors">
          <input value={profileInput} onChange={handleProfileChange}/>
          <button onClick={fetchProfile}>submit</button>
          <br/>
          {profile && (
            <>
              <Select
                native
                value={heroInput}
                onChange={handleHeroChange}
              >
                <MenuItem value={""}/>
                {profile["heroes"].map((hero: any) => {
                  return (
                    <option
                      key={hero["id"]}
                      value={hero["id"]}
                    >
                      {`${hero["name"]} (${hero["class"]})`}
                    </option>
                  )
                })}
              </Select>
              <button onClick={fetchHero}>submit</button>
            </>
          )}
        </div>
        {
          hero && items && (
            <div>
              {hero && hero["name"]}
              <div className={"hero-grid"}>
                {Object.keys(items).map((item: string, i) => {
                  return (
                    <GearItem
                      hero={hero}
                      gearSpot={item}
                      detailedItem={items[item]}
                      handleGearMouseEnter={handleGearMouseEnter}
                      gearSpotTooltip={props.gearSpotTooltip}
                    />
                  );
                })}
              </div>
              Life: {hero["stats"]["life"]} <br/>
              Damage: {hero["stats"]["damage"]} <br/>
              Toughness: {hero["stats"]["toughness"]} <br/>
            </div>
          )}
      </div>
    </>
  );
}

export default HeroCard;
