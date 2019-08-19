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
import {AppContext, IAppContext} from "./App";
import {defaultDetailedItems} from "./helpers/helpers";
import ErrorBoundary from "./ErrorBoundary";

interface HeroCardProps {
  handleHeroChange: (newHeroIdentifier: HeroIdentifier, heroIndex: number) => void;
  heroIdentifier: HeroIdentifier;
  heroIndex: number;
  handleRemoveHero: (heroIndex: number) => void;
}

function HeroCard(props: HeroCardProps) {
  const [hero, setHero] = useState<DetailedHeroData>();
  const [detailedItems, setDetailedItems] = useState<DetailedItems>(defaultDetailedItems);
  const [profile, setProfile] = useState<Profile>({battleTag: ""});
  const [loadingHero, setLoadingHero] = useState<boolean>(false);
  const [attemptedToLoadHero, setAttemptedToLoadHero] = useState<boolean>(false);

  const appContext = useContext<IAppContext>(AppContext);

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
    setAttemptedToLoadHero(true);
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
            <ErrorBoundary>
              <HeroInfo hero={hero}/>
            </ErrorBoundary>
            <ErrorBoundary>
              <HeroGrid
                heroIdentifier={props.heroIdentifier}
                heroIndex={props.heroIndex}
                hero={hero}
                detailedItems={detailedItems}
              />
            </ErrorBoundary>
            <ErrorBoundary>
              <HeroSkills
                hero={hero}
                heroIndex={props.heroIndex}
              />
            </ErrorBoundary>
            <ErrorBoundary>
              <HeroLegendaryPowers
                hero={hero}
                heroIndex={props.heroIndex}
              />
            </ErrorBoundary>
            <ErrorBoundary message={"Error loading stats"}>
            <HeroStats
              hero={hero}
              heroIndex={props.heroIndex}
              detailedItems={detailedItems}
            />
            </ErrorBoundary>
          </div>
          : attemptedToLoadHero &&
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
