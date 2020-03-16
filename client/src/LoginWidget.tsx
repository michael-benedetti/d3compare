import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {AppContext, IAppContext} from "./App";
import UserHeroSelector from "./UserHeroSelector";
import {HeroIdentifier} from "./helpers/interfaces";

interface LoginWidgetProps {
  handleAddHero: (heroIdentifier: HeroIdentifier) => void;
}

function LoginWidget(props: LoginWidgetProps) {
  const [usersBattleTag, setUsersBattleTag] = useState<string>();

  const appContext = useContext<IAppContext>(AppContext);

  useEffect(() => {
    appContext.d3Repository.getBattleTag().then((battleTag: string) => setUsersBattleTag(battleTag));
  }, []);

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "red",
      padding: "5px",
      whiteSpace: "nowrap",
      fontFamily: "exocet-blizzard-light",
      fontSize: "20px",
      fontWeight: "bold",
      textShadow: "1px 1px 1px black"
  }}>
      {
        usersBattleTag ?
          <UserHeroSelector
            battleTag={usersBattleTag}
            handleAddHero={props.handleAddHero}
          /> :
          <a href={"/user/login"} style={{fontFamily: "exocet-blizzard-light", fontSize: "20px"}}>LOGIN</a>
      }
    </div>
  )
}

export default LoginWidget