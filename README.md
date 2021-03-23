# AGIS

## Cloudflare Dynamic IP Change
Auto update Cloudflare DNS A records, to the new IP, when it unexpectedly changes.
> This will increase website uptime if hosting locally.

## Statuspage System Metrics
Send status page system metrics at a specific interval.
> This can accurately monitor uptime and performance.

## Statuspage Auto-report
Auto report IP changes or very high metric ping. 

.env
```.env
CLOUDFLARE_EMAIL=""
CLOUDFLARE_TOKEN=""
STATUSPAGE_PAGE_ID=""
STATUSPAGE_TOKEN=""
```

config.json
```{
  "cloudflare": {
    "endpoint": "https://api.cloudflare.com/client/v4",
    "zones": [
      ["example.com", "cloudflare-zone-id"]
    ],
    "checkInterval": 60000
  },
  "statuspage": {
    "endpoint": "https://api.statuspage.io/v1"
    "metrics": [
      ["metric_id", "https://example.com/api", "example"]
    ],
    "autoReport": {
      "ipChange": true
    },
    "metricsInterval": 60000
  }
}
```