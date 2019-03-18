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
import {useEffect, useState} from "react";
import {Select} from "@material-ui/core";

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
    const result = stat.replace( /([A-Z])/g, " $1" );
    return result.charAt(0).toUpperCase() + result.slice(1);
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
              <button onClick={fetchHero}>submit</button>
            </>
          )}
        </div>
        {hero && items && (
          <div>
            {hero && hero.name}
            <div className={"hero-grid"}>
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
            <div className={"stats"}>
              {Object.keys(hero.stats).map((stat: string) => {
                return <div key={stat}>{`${startCase(stat)}: ${hero.stats[stat]}`}</div>
              })}
            </div>
            <br/>
            <br/>
            <br/>
          </div>
        )}
      </div>
    </>
  );
}

export default HeroCard;
