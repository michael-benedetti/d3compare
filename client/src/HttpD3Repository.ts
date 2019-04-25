import {D3Repository, Leaderboard} from "./helpers/interfaces";

export class HttpD3Repository implements D3Repository {
  public async getProfile(region: string, account: string) {
    const fetchedProfile = await fetch(`/api/v1/getProfile?region=${region}&profile=${this.sanitize(account)}`);
    return await fetchedProfile.json();
  }

  public async getHero(region: string, account: string, heroId: string) {
    const hero = await fetch(`/api/v1/getHero?region=${region}&profile=${this.sanitize(account)}&heroId=${heroId}`);
    return await hero.json();
  }

  public async getDetailedItems(region: string, account: string, heroId: string) {
    const detailedItems = await fetch(`/api/v1/getDetailedItems?region=${region}&profile=${this.sanitize(account)}&heroId=${heroId}`);
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