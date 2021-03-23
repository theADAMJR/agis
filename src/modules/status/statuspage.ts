import { Log } from '../../services/log';
import { HTTPService } from '../../services/http-service';

export class Statuspage extends HTTPService {
  currentIncidentId = '';
  pageId = process.env.STATUSPAGE_PAGE_ID;

  constructor() {
    super(`https://api.statuspage.io/v1`, {
      'Authorization': `OAuth ${process.env.STATUSPAGE_TOKEN}`,
    });
  }

  // https://developer.statuspage.io/#operation/postPagesPageIdIncidents
  public async createIncident(name: string, status: StatusType, body: string) {
    const result = await super.post(`pages/${this.pageId}/incidents`, {
      'incident[name]': name,
      'incident[status]': status,
      'incident[body]': `${body}\nThis message is automated.`,
    });
    this.currentIncidentId = result.id;

    Log.info(`Created incident - ${result.shortlink}`.blue);
  }

  // https://developer.statuspage.io/#operation/patchPagesPageIdIncidentsIncidentId
  public async updateIncident(name: string, status: StatusType, body: string) {
    const result = await super.patch(`pages/${this.pageId}/incidents/${this.currentIncidentId}`, {
      'incident[name]': name,
      'incident[status]': status,
      'incident[body]': `${body}\nThis message is automated.`,
    });
    Log.info(`Updated incident - ${result.shortlink}`.blue);
  }

  // https://developer.statuspage.io/#tag/metrics
  public async postMetrics(metric_id: string, value: number) {
    const unixTimestamp = new Date().getTime() / 1000;
    const result = await super.post(`pages/${this.pageId}/metrics/data`, {
      data: {
        [metric_id]: [
          { timestamp: unixTimestamp, value },
        ],
      },
    });
    Log.info(`Sent Metrics - ${value} - ${result.metric_id}`.blue);
  }

  public async getMetrics(): Promise<any[]> {
    return await super.get(`pages/${this.pageId}/metrics`);
  }
}

type StatusType = 'investigating' | 'identified' | 'monitoring' | 'resolved' | 'scheduled' | 'in_progress' | 'verifying' | 'completed';
