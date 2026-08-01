import sitemap from '@/app/sitemap';

const INDEXNOW_KEY = 'provning-indexnow-key';
const HOST = 'xn--prvning-b1a.se';
const KEY_LOCATION = `https://${HOST}/provning-indexnow-key.txt`;

function allUrls(): string[] {
  return [...new Set(sitemap().map((entry) => entry.url))];
}

/** Pingar IndexNow med alla indexerbara URL:er. */
export async function POST() {
  const urlList = allUrls();
  const body = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urlList.slice(0, 10000),
  };

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return Response.json({
    ok: res.ok,
    status: res.status,
    submitted: urlList.length,
  });
}

export async function GET() {
  return Response.json({
    message: 'POST för att skicka alla URL:er till IndexNow',
    keyLocation: KEY_LOCATION,
    urlCount: allUrls().length,
  });
}
