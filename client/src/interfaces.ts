export interface AccessToken {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
}

export interface D3Repository {
    getProfile: (profile: string, accessToken: AccessToken) => Promise<any>;
    getHero: (account: string, heroId: string, accessToken: AccessToken) => Promise<any>;
    getDetailedItems: (account: string, heroId: string, accessToken: any) => Promise<any>;
}

export interface AuthRepository {
    getAccessToken: () => Promise<any>;
}