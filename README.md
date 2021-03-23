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
```
{
  "zones": [
    ["example1.com", "<zone_id>"],
    ["example2.com", "<zone_id>"],
    ["example3.com", "<zone_id>"],
  ],
  "checkInterval": 30000
}
```