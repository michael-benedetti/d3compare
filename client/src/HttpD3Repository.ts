import {D3Repository, Leaderboard} from "./interfaces";

export class HttpD3Repository implements D3Repository {
  public async getProfile(account: string) {
    const fetchedProfile = await fetch(`/api/v1/getProfile?profile=${this.sanitize(account)}`);
    return await fetchedProfile.json();
  }

  public async getHero(account: string, heroId: string) {
    const hero = await fetch(`/api/v1/getHero?profile=${this.sanitize(account)}&heroId=${heroId}`);
    return await hero.json();
  }

  public async getDetailedItems(account: string, heroId: string) {
    const detailedItems = await fetch(`/api/v1/getDetailedItems?profile=${this.sanitize(account)}&heroId=${heroId}`);
    return await detailedItems.json();
  }

  public async getLeaderboard(season: string, leaderboard: string): Promise<Leaderboard> {
    const leaders = await fetch(`/api/v1/getLeaderboard?season=${season}&leaderboard=${leaderboard}`);
    return await leaders.json();
  }

  private sanitize(original: string) {
    return original.replace("#", "-");
  }
}