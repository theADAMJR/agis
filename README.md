# AGIS

## Cloudflare Dynamic IP Change
Auto update Cloudflare DNS A records, to the new IP, when it unexpectedly changes.
> This will increase website uptime if hosting locally.

.env
```.env
CLOUDFLARE_EMAIL=""
CLOUDFLARE_TOKEN=""
```

config.json
```
{
  "zones": [
    ["example.com", "<zone_id>"],
  ],
  "checkInterval": 30000
}
```