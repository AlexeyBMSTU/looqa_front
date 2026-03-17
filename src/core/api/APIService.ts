import { GENERAL_URL } from '@/env';

interface DataProps {
  url: string;
  body?: unknown;
  query?: Record<string, string | number | boolean>;
}

interface RequestProps extends DataProps {
  method: string;
}

class ApiService {
  private baseUrl: string;
  private headers = {
    'Content-Type': 'application/json',
  };

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  private async request<T>({
    url,
    query,
    method,
    body,
  }: RequestProps): Promise<T> {
    const apiUrl = `/api${url}`;

    let requestUrl = `${this.baseUrl}${apiUrl}`;

    if (query) {
      const queryParams = new URLSearchParams();
      Object.entries(query).forEach(([key, value]) => {
        queryParams.append(key, String(value));
      });
      requestUrl += `?${queryParams.toString()}`;
    }

    const response = await fetch(requestUrl, {
      method,
      headers: this.headers,
      body: body ? JSON.stringify(body) : null,
      mode: 'cors',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }

    return await response.json();
  }

  async get<T>(data: DataProps): Promise<T> {
    const method = 'GET';

    return await this.request({ method, ...data });
  }

  async post<T>(data: DataProps): Promise<T> {
    const method = 'POST';

    return await this.request({ method, ...data });
  }

  async put<T>(data: DataProps): Promise<T> {
    const method = 'PUT';

    return await this.request({ method, ...data });
  }

  async patch<T>(data: DataProps): Promise<T> {
    const method = 'PATCH';

    return await this.request({ method, ...data });
  }

  async delete<T>(data: DataProps): Promise<T> {
    const method = 'DELETE';

    return await this.request({ method, ...data });
  }
}

export const apiService = new ApiService(GENERAL_URL);
