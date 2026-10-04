import concurrent.futures, hashlib, json, pathlib, urllib.request
ROOT = pathlib.Path(__file__).resolve().parents[1]
def fetch(asset):
    try:
        req = urllib.request.Request(asset['source'], headers={'User-Agent': 'Mozilla/5.0 AerolistImagePreserver/1.0'})
        with urllib.request.urlopen(req, timeout=40) as response:
            data = response.read(15 * 1024 * 1024 + 1)
            mime = response.headers.get_content_type()
        if len(data) > 15 * 1024 * 1024: raise ValueError('image exceeds 15 MiB')
        if not mime.startswith('image/'): raise ValueError('source returned ' + mime)
        target = ROOT / asset['path']
        if not target.resolve().is_relative_to((ROOT / 'listings').resolve()): raise ValueError('invalid destination')
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(data)
        return {**asset, 'status':'preserved','bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'content_type':mime}
    except Exception as error:
        return {**asset, 'status':'error','error':str(error)}
for manifest in sorted((ROOT / 'image-import/manifests').glob('*.json')):
    receipt = ROOT / 'image-import/receipts' / manifest.name
    if receipt.exists(): continue
    assets = json.loads(manifest.read_text())['assets']
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
        results = list(pool.map(fetch, assets))
    receipt.parent.mkdir(parents=True, exist_ok=True)
    receipt.write_text(json.dumps({'manifest':manifest.name,'results':results}, indent=2))
    print(json.dumps({'manifest':manifest.name,'preserved':sum(r['status']=='preserved' for r in results),'errors':sum(r['status']=='error' for r in results)}))
