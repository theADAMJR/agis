import { Log } from '../../services/log';
import config from '../../../config.json';
import { Statuspage } from './statuspage';

export class Metrics {
  constructor(
    private statuspage = new Statuspage(),
  ) {}

  public start() {
    const seconds = config.statuspage.metricsInterval / 1000;
    Log.info(`Sending metrics every ${seconds}s`.blue);

    setInterval(this.send.bind(this), config.statuspage.metricsInterval);
  }

  public async send() {
    for (const [metricId, url] of config.statuspage.metrics) {
      const ms = await this.statuspage.ping(url);
      await this.statuspage.postMetrics(metricId, ms);
    }
    Log.info(`Sent ${config.statuspage.metrics.length} metrics`);
  }
}