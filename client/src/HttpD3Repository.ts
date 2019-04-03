import {AccessToken, D3Repository, Leaderboard} from "./interfaces";

export class HttpD3Repository implements D3Repository {
  public async getProfile(account: string, accessToken: AccessToken) {
    const fetchedProfile = await fetch(`https://us.api.blizzard.com/d3/profile/${this.sanitize(account)}/?locale=en_US&access_token=${accessToken["access_token"]}`);
    return await fetchedProfile.json();
  }

  public async getHero(account: string, heroId: string, accessToken: AccessToken) {
    const hero = await fetch(`https://us.api.blizzard.com/d3/profile/${this.sanitize(account)}/hero/${heroId}?locale=en_US&access_token=${accessToken["access_token"]}`);
    return await hero.json();
  }

  public async getDetailedItems(account: string, heroId: string, accessToken: AccessToken) {
    const detailedItems = await fetch(`https://us.api.blizzard.com/d3/profile/${this.sanitize(account)}/hero/${heroId}/items?locale=en_US&access_token=${accessToken["access_token"]}`);
    return await detailedItems.json();
  }

  public async getLeaderboard(season: string, leaderboard: string, accessToken: AccessToken): Promise<Leaderboard> {
    const leaders = await fetch(`https://us.api.blizzard.com/data/d3/season/${season}/leaderboard/${leaderboard}?access_token=${accessToken["access_token"]}`);
    return await leaders.json();
  }

  private sanitize(original: string) {
    return original.replace("#", "-");
  }
}