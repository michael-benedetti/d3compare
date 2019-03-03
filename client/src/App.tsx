import * as  React from 'react';
import './App.css';
import {Component} from "react";
import {D3Repository} from "./interfaces";
import HeroCard from "./HeroCard";

interface AppState {
  profile: any;
}

interface AppProps {
  authRepository: any;
  d3Repository: D3Repository;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      profile: "",
    }
  }

  public async componentDidMount() {
    const accessToken: any = await this.props.authRepository.getAccessToken();
    const profile = await this.props.d3Repository.getProfile("Demospheus-1879", accessToken);
    console.log(profile);
    this.setState({
      profile,
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Hi.
          </p>
          <br/>
          <div className={"heros"}>
            <HeroCard
              authRepository={this.props.authRepository}
              d3Repository={this.props.d3Repository}
              account={"Demospheus-1879"}
              heroid={"108710068"}
            />
            <HeroCard
              authRepository={this.props.authRepository}
              d3Repository={this.props.d3Repository}
              account={"Sammo-1931"}
              heroid={"108541224"}
            />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
