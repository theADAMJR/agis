import { HTTPService } from '../../services/http-service';
import { Log } from '../../services/log';
import * as config from '../../../config.json';

export class Cloudflare extends HTTPService {
  constructor() {
    super(config.cloudflare.endpoint, {
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
  async getRecord(zoneId: string, name: string) {
    const records = await this.get(
      `zones/${zoneId}/dns_records?type=A&name=${name}`
    );
    return records?.[0];
  }

  // https://api.cloudflare.com/#dns-records-for-a-zone-update-dns-record
  async patchRecord(zoneId: string, recordId: string, body: object) {
    const record = await this.patch(
      `zones/${zoneId}/dns_records/${recordId}`,
      body,
    );
    Log.info(`Updated DNS A Record for ${record?.name}`.green);
  }
}