import 'colors';
import fetch from 'node-fetch';

export class HTTPService {
  constructor(endpoint, headers) {
    this.endpoint = endpoint;
    this.headers = headers;
  }

  async get(routes, headers = {}) {
    const res = await fetch(
      `${this.endpoint}/${routes}`,
      { headers: { ...this.headers, ...headers } }
    );
    return await this.getResult(res);
  }

  async post(routes, body, headers = {}) {
    const res = await fetch(
      `${this.endpoint}/${routes}`, { 
        body: JSON.stringify(body),
        method: 'POST',
        headers: { ...this.headers, ...headers },
      }
    );
    return await this.getResult(res);
  }

  async patch(routes, body, headers = {}) {
    const res = await fetch(
      `${this.endpoint}/${routes}`, { 
        body: JSON.stringify(body),
        method: 'PATCH',
        headers: { ...this.headers, ...headers },
      }
    );
    return await this.getResult(res);
  }

  async getResult(res) {
    const json = await res.json();
    if (!res.ok) {
      Log.info(`${json.errors[0].message}`.red);
      return;
    }
    return json.result;
  }  
}
