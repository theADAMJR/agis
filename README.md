# Agis

## Cloudflare Dynamic IP Change
Auto update Cloudflare DNS A records, to the new IP, when it unexpectedly changes.
> This will increase website uptime if hosting locally.

Create `.env`:
```.env
CLOUDFLARE_EMAIL=""
CLOUDFLARE_TOKEN=""
```

Create `config.json`:
```{
  "cloudflare": {
    "endpoint": "https://api.cloudflare.com/client/v4",
    "zones": [
      ["example.com", "cloudflare-zone-id"]
    ],
    "checkInterval": 60000
  }
}
```