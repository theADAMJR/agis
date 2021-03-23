import { Log } from '../../services/log';
import config from '../../../config.json';
import { Statuspage } from './statuspage';
import { Emitter } from '../../services/emitter';

export class Metrics {
  currentIncidentId = '';

  constructor(
    private statuspage = new Statuspage(),
  ) {}

  public start() {
    const seconds = config.statuspage.metricsInterval / 1000;
    Log.info(`Sending metrics every ${seconds}s`.blue);

    Emitter.on('IP_CHANGE', async () => {
      if (!config.statuspage.autoReport.ipChange) return;

      const { id, body } = await this.statuspage.createIncident(
        'IP Change',
        'in_progress',
        `A Router IP change has been detected.
        This happens at random intervals at points in the day.
        Websites may not work during this time.`,
      );

      const timeToResolve =  5 * 60 * 1000;
      setTimeout(async() => {
        await this.statuspage.updateIncident(
          this.currentIncidentId,
          'resolved',
          body,
        );
      }, timeToResolve);
    });

    setInterval(this.send.bind(this), config.statuspage.metricsInterval);
  }

  public async send() {
    for (const [metricId, url, name] of config.statuspage.metrics) {  
      const ms = await this.statuspage.ping(url);          
      await this.statuspage.postMetrics(metricId, ms);
    }
  }
}