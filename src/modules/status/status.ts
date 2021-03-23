import { Log } from '../../services/log.js';
import { HTTPService } from '../../services/http-service.js';

export class Statuspage extends HTTPService {
  pageId = process.env.STATUSPAGE_PAGE_ID;

  constructor() {
    super(`https://api.statuspage.io/v1`, {
      'Authorization': `OAuth ${process.env.STATUSPAGE_TOKEN}`,
    });
  }

  // https://developer.statuspage.io/#operation/postPagesPageIdIncidents
  async createIncident(name, status, body) {
    await this.post(`pages/${this.pageId}/incidents`, {
      'incident[name]': `[Automated] - ${name}`,
      'incident[status]': status,
      'incident[body]': `${body}\nThis message was automated.`,
    });
  }

  // https://developer.statuspage.io/#operation/postPagesPageIdIncidents
  async resolveIncident(id) {
    await this.patch(`pages/${this.pageId}/incidents/${id}`, {
      'incident[name]': `[Automated] - ${name}`,
      'incident[status]': status,
      'incident[body]': `${body}\nThis message was automated.`,
    });
  }
}

  

  /**
   * curl https://api.statuspage.io/v1/pages/{page_id}/incidents \
      -H "Authorization: OAuth your-api-key-goes-here" \
      -X POST \
      -d "incident[name]=string" \
      -d "incident[status]=string" \
      -d "incident[body]=string"
   */

/*
curl -X POST https://api.statuspage.io/v1/example \
  -d "incident[name]=test incident" \
  -d "incident[components][]=8kbf7d35c070" \
  -d "incident[components][]=vtnh60py4yd7"

curl -H "Authorization: OAuth 89a229ce1a8dbcf9ff30430fbe35eb4c0426574bca932061892cefd2138aa4b1" \
  /pages/gytm4qzbx9t6.json
  
*/