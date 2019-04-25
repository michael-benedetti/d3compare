import * as  React from 'react';
import './css/HeroCard.css';
import {
  DetailedHeroData, DetailedItems, HeroIdentifier,
  Profile
} from "./helpers/interfaces";
import {useContext, useEffect, useState} from "react";
import HeroInfo from "./HeroInfo";
import HeroGrid from "./HeroGrid";
import HeroSelector from "./HeroSelector";
import HeroSkills from "./HeroSkills";
import HeroStats from "./HeroStats";
import HeroLegendaryPowers from "./HeroLegendaryPowers";
import CircularProgress from '@material-ui/core/CircularProgress';
import {AppContext} from "./App";
import {defaultDetailedItems} from "./helpers/helpers";

interface HeroCardProps {
  handleHeroChange: (newHeroIdentifier: HeroIdentifier, heroIndex: number) => void;
  heroIdentifier: HeroIdentifier;
  heroIndex: number;
  handleGearMouseEnter: (gearSpot: string) => void;
  gearSpotTooltip: string;
  handleRemoveHero: (heroIndex: number) => void;
}

function HeroCard(props: HeroCardProps) {
  const [hero, setHero] = useState<DetailedHeroData>();
  const [detailedItems, setDetailedItems] = useState<DetailedItems>(defaultDetailedItems);
  const [profile, setProfile] = useState<Profile>({battleTag: ""});
  const [loadingHero, setLoadingHero] = useState<boolean>(false);

  const appContext = useContext(AppContext);

  function handleGearMouseEnter(gearSpot: string) {
    props.handleGearMouseEnter(gearSpot);
  }

  async function handleHeroChange(region: string, account: string, heroId: string) {
    const newHeroIdentifier: HeroIdentifier = {region, account, heroId, key: props.heroIdentifier.key};
    props.handleHeroChange(newHeroIdentifier, props.heroIndex);
  }

  async function fetchProfile() {
    const fetchedProfile: Profile = await appContext.d3Repository.getProfile(props.heroIdentifier.region, props.heroIdentifier.account);
    setProfile(fetchedProfile);
  }

  async function fetchHero() {
    setLoadingHero(true);
    await appContext.d3Repository.getHero(props.heroIdentifier.region, props.heroIdentifier.account, props.heroIdentifier.heroId).then(async (fetchedHero) => {
      if (fetchedHero.code !== "NOTFOUND") {
        setHero(fetchedHero);
        await appContext.d3Repository.getDetailedItems(props.heroIdentifier.region, props.heroIdentifier.account, fetchedHero.id.toString()).then((fetchedDetailedItems) => {
          setDetailedItems(fetchedDetailedItems);
        });
      }
    }, () => {
      setLoadingHero(false);
    });
    setLoadingHero(false);
  }

  useEffect(() => {
    if (props.heroIdentifier.account && props.heroIdentifier.heroId) {
      fetchProfile();
      fetchHero();
    }
  }, [props.heroIdentifier.heroId]);

  return (
    <>
      <div className={"HeroCard"}>
        <HeroSelector
          heroIndex={props.heroIndex}
          handleRemoveHero={props.handleRemoveHero}
          initialHero={props.heroIdentifier}
          setProfile={setProfile}
          handleHeroChange={handleHeroChange}
          profile={profile}
        />
        {!loadingHero ? hero && profile ?
          <div className="Hero">
            <HeroInfo hero={hero}/>
            <HeroGrid
              heroIdentifier={props.heroIdentifier}
              heroIndex={props.heroIndex}
              hero={hero}
              detailedItems={detailedItems}
              handleGearMouseEnter={handleGearMouseEnter}
              gearSpotTooltip={props.gearSpotTooltip}
            />
            <HeroSkills
              hero={hero}
              heroIndex={props.heroIndex}
            />
            <HeroLegendaryPowers
              hero={hero}
              heroIndex={props.heroIndex}
            />
            <HeroStats
              hero={hero}
              heroIndex={props.heroIndex}
            />
          </div>
          :
          <div style={{fontFamily: "exocet-blizzard-light", color: "red"}}>
            <div>-Error-</div>
            <div>-Loading-</div>
            <div>-Hero-</div>
          </div>
          :
          <CircularProgress style={{color: "red"}}/>
        }
      </div>
    </>
  );
}

export default HeroCard;
