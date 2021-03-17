import 'colors';
import fetch from 'node-fetch';

export class Cloudflare {
  endpoint = 'https://api.cloudflare.com/client/v4';

  // https://api.cloudflare.com/#user-api-tokens-verify-token
  async checkToken() {
    const res = await fetch(`${this.endpoint}/user/tokens/verify`, {
      headers: {
        'Authorization': `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
        'Content-Type': 'application/json',
      }
    });
    const result = await this.#getResult(res);
    return result?.status;
  }

  // https://api.cloudflare.com/#dns-records-for-a-zone-list-dns-records
  async getRecord(zoneId, name) {
    const res = await fetch(`${this.endpoint}/zones/${zoneId}/dns_records?type=A&name=${name}`, {
      headers: {
        'Authorization': `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
        'X-Auth-Email': process.env.CLOUDFLARE_EMAIL,
        'Content-Type': 'application/json',
      }
    });
    const { 0: result } = await this.#getResult(res);
    return result;
  }

  // https://api.cloudflare.com/#dns-records-for-a-zone-update-dns-record
  async patchRecord(zoneId, recordId, body) {
    const res = await fetch(`${this.endpoint}/zones/${zoneId}/dns_records/${recordId}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Authorization': `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
        'X-Auth-Email': process.env.CLOUDFLARE_EMAIL,
        'Content-Type': 'application/json',
      }
    });
    const { name } = await this.#getResult(res);
    console.log(`Updated DNS A Record for ${name}`.green);
  }
  
  async #getResult(res) {
    const json = await res.json();
    if (!json.success) {
      console.log(`${json.errors[0].message}`.red);
      return;
    }
    return json.result;
  }
}