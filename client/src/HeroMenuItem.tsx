import * as React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import {BasicHeroData, HeroIdentifier} from "./helpers/interfaces";
import uniqid = require('uniqid');
import StyledMenuItem from "./shared/components/StyledMenuItem";
import {getClassPortraitOffset} from "./helpers/helpers";
import {useEffect, useState} from "react";

interface HeroMenuItemProps {
  battleTag: string;
  handleAddHero: (heroIdentifier: HeroIdentifier) => void;
  hero: BasicHeroData
}

export default function HeroMenuItem(props: HeroMenuItemProps) {
  const [portraitOffset, setPortraitOffset] = useState<string>("0 0");

  useEffect(() => {
    setPortraitOffset(getClassPortraitOffset(props.hero.class, props.hero.gender));
  }, [props.hero]);

  return (
    <StyledMenuItem onClick={() => props.handleAddHero({region: "us", account: props.battleTag, heroId: props.hero.id.toString(), key: uniqid.process()})}>
      <div style={{
        width: "83px",
        height: "66px",
        background: "url(https://us.diablo3.com/static/images/profile/hero/hero-nav-portraits.jpg)",
        backgroundPosition: portraitOffset,
      }}/>
      <ListItemText disableTypography style={{color: props.hero.hardcore ? "red" : "white"}} primary={props.hero.name}/>
    </StyledMenuItem>
  )
}