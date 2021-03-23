import 'colors';
import fetch, { Response } from 'node-fetch';
import { Log } from './log';

export class HTTPService {
  constructor(
    private endpoint: string,
    private headers: object) {}

  public async get(routes: string, headers = {}) {
    const res = await fetch(
      `${this.endpoint}/${routes}`,
      { headers: { ...this.headers, ...headers } }
    );
    return await this.getResult(res);
  }

  public async post(routes: string, body: object, headers = {}) {
    const res = await fetch(
      `${this.endpoint}/${routes}`, { 
        body: JSON.stringify(body),
        method: 'POST',
        headers: { ...this.headers, ...headers },
      }
    );
    return await this.getResult(res);
  }

  public async patch(routes: string, body: object, headers = {}) {
    const res = await fetch(
      `${this.endpoint}/${routes}`, { 
        body: JSON.stringify(body),
        method: 'PATCH',
        headers: { ...this.headers, ...headers },
      }
    );
    return await this.getResult(res);
  }

  private async getResult(res: Response) {
    const json = await res.json();
    if (!res.ok) {
      Log.info(`${json.errors?.[0].message ?? json.message}`.red);
      return;
    }
    return json.result ?? json;
  }  
}
