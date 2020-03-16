import {D3Repository, Leaderboard, Seasons} from "./helpers/interfaces";

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

  public async getSeasons(): Promise<Seasons> {
    const seasons = await fetch(`/api/v1/getSeasons`);
    return await seasons.json();
  }

  public async getBattleTag(): Promise<string> {
    const battleTag = await fetch(`/user/getBattleTag`);
    return await battleTag.text();
  }

  private sanitize(original: string) {
    return original.replace("#", "-");
  }
}