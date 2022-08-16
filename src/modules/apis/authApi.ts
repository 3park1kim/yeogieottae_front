import axios from "../../shared/utils/axios";
import { LoginResult } from "../../types/LoginDto";

const GATEWAY_URL = "127.0.0.1";

interface AuthApi {
  sessionLogin(userId: string, password: string): Promise<LoginResult>;
}

class AuthServerApi implements AuthApi {
  async sessionLogin(userId: string, password: string): Promise<LoginResult> {
    const params = new URLSearchParams();
    params.append("userId", userId);
    params.append("password", password);

    const resp = await axios.post<LoginResult>(
      `${GATEWAY_URL}/sessions/admins/login`,
      params
    );

    return Promise.resolve(resp.data);
  }
}

const authApi: AuthApi = new AuthServerApi();
export default authApi;
