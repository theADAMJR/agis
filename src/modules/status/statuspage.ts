import { Log } from '../../services/log';
import { HTTPService } from '../../services/http-service';
import config from '../../../config.json';

export class Statuspage extends HTTPService {
  pageId = process.env.STATUSPAGE_PAGE_ID;

  constructor() {
    super(config.statuspage.endpoint, {
      'Authorization': `OAuth ${process.env.STATUSPAGE_TOKEN}`,
      'Content-Type': 'application/json',
    });
  }

  // https://developer.statuspage.io/#operation/postPagesPageIdIncidents
  public async createIncident(name: string, status: StatusType, body: string) {
    const result = await super.post(`pages/${this.pageId}/incidents`, {
      incident: {
        'name': name,
        'status': status,
        'incident': `${body}\nThis message is automated.`,
      },
    });
    Log.info(`Created incident - ${result.shortlink}`.blue);

    return result;
  }

  // https://developer.statuspage.io/#operation/patchPagesPageIdIncidentsIncidentId
  public async updateIncident(id: string, name: string, status: StatusType, body: string) {
    const result = await super.patch(`pages/${this.pageId}/incidents/${id}`, {
      incident: {
        'name': name,
        'status': status,
        'incident': `${body}\nThis message is automated.`,
      },
    });
    Log.info(`Updated incident - ${result.shortlink}`.blue);
  }

  // https://developer.statuspage.io/#tag/metrics
  public async postMetrics(metric_id: string, value: number) {
    const unixTimestamp = new Date().getTime() / 1000;    
    await super.post(`pages/${this.pageId}/metrics/data`, {
      data: {
        [metric_id]: [
          { timestamp: unixTimestamp, value },
        ],
      },
    });
  }
}

type StatusType = 'investigating' | 'identified' | 'monitoring' | 'resolved' | 'scheduled' | 'in_progress' | 'verifying' | 'completed';
