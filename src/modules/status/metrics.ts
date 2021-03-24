import { Log } from '../../services/log';
import config from '../../../config.json';
import { Statuspage } from './statuspage';
import { Emitter } from '../../services/emitter';

export class Metrics {
  constructor(
    private statuspage = new Statuspage(),
  ) {}

  public start() {
    const seconds = config.statuspage.metricsInterval / 1000;
    Log.info(`Sending metrics every ${seconds}s`.blue);

    Emitter.on('IP_CHANGE', async () => {
      if (!config.statuspage.autoReport.ipChange) return;

      await this.sendIncident();
    });

    setInterval(this.send.bind(this), config.statuspage.metricsInterval);
  }

  private async sendIncident() {
    const name = 'IP Change';
    const status = 'in_progress' as const;
    const body = `A Router IP change has been detected.
        This happens at random intervals at points in the day.
        Websites may not work during this time.`.trim();

    const { id } = await this.statuspage.createIncident(name, status, body);

    const timeToResolve = 5 * 60 * 1000;
    setTimeout(async () => {
      await this.statuspage.updateIncident(id, name, 'resolved', body);
    }, timeToResolve);
  }

  public async send() {
    for (const [metricId, url, name] of config.statuspage.metrics) {  
      const ms = await this.statuspage.ping(url);          
      await this.statuspage.postMetrics(metricId, ms);
    }
  }
}