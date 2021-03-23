# AGIS

## Cloudflare Dynamic IP Change
Auto update Cloudflare DNS A records, to the new IP, when it unexpectedly changes.
> This will increase website uptime if hosting locally.

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
    "zones": [
      ["example.com", "cloudflare-zone-id"]
    ],
    "checkInterval": 30000
  },
  "statuspage": {
    "metrics": [
      ["metric_id", "https://example.com/api"]
    ],
    "metricsInterval": 60000
  }
}
```