import 'colors';
import { HTTPService } from '../../services/http-service.js';
import { Log } from '../../services/log.js';

export class Cloudflare extends HTTPService {
  constructor() {
    super('https://api.cloudflare.com/client/v4', {
      'Authorization': `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
      'X-Auth-Email': process.env.CLOUDFLARE_EMAIL,
      'Content-Type': 'application/json',
    });
  }

  // https://api.cloudflare.com/#user-api-tokens-verify-token
  async checkToken() {
    const result = await this.get(`user/tokens/verify`);
    return result?.status;
  }

  // https://api.cloudflare.com/#dns-records-for-a-zone-list-dns-records
  async getRecord(zoneId, name) {
    const records = await this.get(
      `zones/${zoneId}/dns_records?type=A&name=${name}`
    );
    return records?.[0];
  }

  // https://api.cloudflare.com/#dns-records-for-a-zone-update-dns-record
  async patchRecord(zoneId, recordId, body) {
    const record = await this.patch(
      `zones/${zoneId}/dns_records/${recordId}`,
      body,
    );
    Log.info(`Updated DNS A Record for ${record?.name}`.green);
  }
}