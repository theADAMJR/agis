import 'colors';
import fetch, { Response } from 'node-fetch';
import { Log } from './log';

export class HTTPService {
  constructor(
    private endpoint: string,
    private headers: object) {}

  protected async get(routes: string, headers = {}) {
    const res = await fetch(
      `${this.endpoint}/${routes}`,
      { headers: { ...this.headers, ...headers } }
    );
    return await this.getResult(res);
  }

  protected async post(routes: string, body: object, headers = {}) {
    const res = await fetch(
      `${this.endpoint}/${routes}`, { 
        body: JSON.stringify(body),
        method: 'POST',
        headers: { ...this.headers, ...headers },
      }
    );
    return await this.getResult(res);
  }

  protected async patch(routes: string, body: object, headers = {}) {
    const res = await fetch(
      `${this.endpoint}/${routes}`, { 
        body: JSON.stringify(body),
        method: 'PATCH',
        headers: { ...this.headers, ...headers },
      }
    );
    return await this.getResult(res);
  }

  public async ping(url: string) {
    const before = new Date();
    await fetch(url);
    const after = new Date();
    return after.getTime() - before.getTime();
  }

  private async getResult(res: Response) {
    const json = await res.json();
    if (!res.ok) {
      Log.info(`${json.errors?.[0].message ?? json.message}`.red);
      return res;
    }
    return json.result ?? json;
  }  
}
