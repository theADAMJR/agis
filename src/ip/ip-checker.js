import 'colors';
import { Cloudflare } from './cloudflare.js';
import ip from 'public-ip';
import config from '../../config.json';

export class IPChecker {
  previousIP = null;

  constructor(cloudflare = new Cloudflare()) {
    this.cloudflare = cloudflare;
  }

  async start() {
    const status = await this.cloudflare.checkToken();
    if (status !== 'active') return;

    console.log(`Cloudflare Token is active`.green);

    const seconds = config.checkInterval / 1000;
    console.log(`Checking for IP updates every ${seconds}s`.blue);

    setInterval(this.checkIP.bind(this), config.checkInterval);
  }

  async checkIP() {
    const newIP = await ip.v4();
    const ipChange = this.previousIP && newIP === this.previousIP;
  
    console.log(`[IP] ${ipChange ? 'NOMINAL' : 'CHANGED'} - ${newIP}`.blue);
    if (ipChange) return;
    
    this.previousIP = newIP;
    await this.#updateDNS();
  }

  async #updateDNS() {  
    console.log(`Updating DNS records for ${config.zones.length} zones`.blue);
  
    for (const { 0: name, 1: zoneId } of config.zones) {
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
