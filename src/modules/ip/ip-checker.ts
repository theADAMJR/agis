import { Cloudflare } from './cloudflare';
import { Log } from '../../services/log';
import ip from 'public-ip';
import config from '../../../config.json';

export class IPChecker {
  private previousIP = '';

  constructor(
    private cloudflare = new Cloudflare(),
  ) {}

  public async start() {
    const status = await this.cloudflare.checkToken();
    if (status !== 'active') return;

    Log.info(`Cloudflare Token is active`.green);

    const seconds = config.cloudflare.checkInterval / 1000;
    Log.info(`Checking for IP updates every ${seconds}s`.blue);

    this.previousIP = await ip.v4();

    setInterval(this.checkIP.bind(this), config.cloudflare.checkInterval);
  }

  public async checkIP() {
    const newIP = await ip.v4();
    const ipChange = newIP === this.previousIP;
    
    Log.info(`[IP] ${ipChange ? 'NOMINAL' : 'CHANGED'} - ${newIP}`.blue);
    if (ipChange) return;
    
    this.previousIP = newIP;
    await this.updateDNS();
  }

  private async updateDNS() {  
    Log.info(`Updating DNS records for ${config.cloudflare.zones.length} zones`.blue);
  
    for (const [name, zoneId] of config.cloudflare.zones) {
      const { id } = await this.cloudflare.getRecord(zoneId, name);
  
      await this.cloudflare.patchRecord(zoneId, id, {
        type: 'A',
        name,
        content: await ip.v4(),
        ttl: 1,
        proxied: true,
      });
    }
  }
}
