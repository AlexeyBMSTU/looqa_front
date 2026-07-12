import { makeAutoObservable, runInAction } from 'mobx';

interface TokenPayload {
  sub: string; // userID
  username: string;
  role: 'qa' | 'owner';
  exp: number;
}

const TOKEN_KEY = 'looqa_token';

function parseJWT(token: string): TokenPayload | null {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload)) as TokenPayload;
  } catch {
    return null;
  }
}

class AuthStore {
  token: string | null = null;
  payload: TokenPayload | null = null;

  constructor() {
    makeAutoObservable(this);
    // Восстанавливаем сессию из localStorage при старте
    const saved = localStorage.getItem(TOKEN_KEY);
    if (saved) this.setToken(saved);
  }

  get isAuthenticated(): boolean {
    if (!this.token || !this.payload) return false;
    return this.payload.exp * 1000 > Date.now();
  }

  get username(): string {
    return this.payload?.username ?? '';
  }

  get role(): 'qa' | 'owner' | null {
    return this.payload?.role ?? null;
  }

  get isOwner(): boolean {
    return this.payload?.role === 'owner';
  }

  get isQA(): boolean {
    return this.payload?.role === 'qa';
  }

  get userID(): string {
    return this.payload?.sub ?? '';
  }

  setToken(token: string) {
    const parsed = parseJWT(token);
    if (!parsed) return;
    runInAction(() => {
      this.token = token;
      this.payload = parsed;
    });
    localStorage.setItem(TOKEN_KEY, token);
  }

  logout() {
    runInAction(() => {
      this.token = null;
      this.payload = null;
    });
    localStorage.removeItem(TOKEN_KEY);
  }
}

export const authStore = new AuthStore();
