import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {withStyles} from '@material-ui/core/styles';
import {Button} from "@material-ui/core";
import {AppContext, IAppContext} from "./App";
import {BasicHeroData, HeroIdentifier, Profile} from "./helpers/interfaces";
import Menu from "@material-ui/core/Menu";
import StyledMenuItem from "./shared/components/StyledMenuItem";
import HeroMenuItem from "./HeroMenuItem";


const UserBattleTag = withStyles(theme => ({
  root: {
    color: "red",
    fontFamily: "exocet-blizzard-light",
    fontSize: "20px",
    fontWeight: "bold",
    textShadow: "1px 1px 1px black"
  }

}))(Button);

interface UserHeroSelectorProps {
  battleTag: string;
  handleAddHero: (heroIdentifier: HeroIdentifier) => void;
}


interface StyledMenuProps {
  id: string,
  anchorEl: any,
  keepMounted: boolean,
  open: boolean,
  onClose: any,
}

const StyledMenu = withStyles({
  paper: {
    border: '1px solid black',
    boxShadow: "0 3px 6px #222",
  },
})((props: StyledMenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

export default function UserHeroSelector(props: UserHeroSelectorProps) {
  const [anchorEl, setAnchorEl] = useState(null);
  const appContext = useContext<IAppContext>(AppContext);
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    appContext.d3Repository.getProfile("us", props.battleTag).then((result: Profile) => {
      setProfile(result);
    })
  }, [props.battleTag]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <UserBattleTag onClick={handleClick}>
        {props.battleTag.split("#")[0]}
      </UserBattleTag>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >{
        profile && profile.heroes && profile.heroes.map((hero: BasicHeroData) => {
          return (
            <HeroMenuItem
              handleAddHero={props.handleAddHero}
              hero={hero}
              battleTag={props.battleTag}
            />
          )
        })
        }
        <StyledMenuItem style={{display: "flex", justifyContent: "right"}}>
          <a href={"/logout"}>Logout</a>
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}