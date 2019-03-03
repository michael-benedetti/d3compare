import {D3Repository} from "./interfaces";

export class HttpD3Repository implements D3Repository {
  public async getProfile(profile: string, accessToken: any) {
    const fetchedProfile = await fetch(`https://us.api.blizzard.com/d3/profile/${profile}/?locale=en_US&access_token=${accessToken["access_token"]}`);
    return await fetchedProfile.json();
  }

  public async getHero(account: string, heroId: string, accessToken: any) {
    const hero = await fetch(`https://us.api.blizzard.com/d3/profile/${account}/hero/${heroId}?locale=en_US&access_token=${accessToken["access_token"]}`);
    return await hero.json();
  }

  public async getDetailedItems(account: string, heroId: string, accessToken: any) {
    const detailedItems = await fetch(`https://us.api.blizzard.com/d3/profile/${account}/hero/${heroId}/items?locale=en_US&access_token=${accessToken["access_token"]}`);
    return await detailedItems.json();
  }
}