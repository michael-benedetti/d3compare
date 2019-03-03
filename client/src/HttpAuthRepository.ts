import {AuthRepository} from "./interfaces";

export class HttpAuthRepository implements AuthRepository {
    public async getAccessToken() {
        const authToken = await fetch("/auth");

        return await authToken.json();
    }
}