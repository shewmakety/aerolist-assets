/* SETTINGS
   Worker name, the static-asset binding, and the YouTube thumbnail route.
   Brand tokens, sizes, and sample copy live in studio.js.
   The live asset proxy must allow this same route. It is not a static file.
*/
const SETTINGS = {
  name: "aogalerts-linkedin-studio",
  assetsBinding: "ASSETS",
  youtubeThumb: {
    upstream: "https://img.youtube.com/vi/",
    files: ["maxresdefault", "hqdefault"],
    id: "^[A-Za-z0-9_-]{11}$",
    route: "^/yt-thumb/([A-Za-z0-9_-]{11})/(maxresdefault|hqdefault)\\.jpg$",
    maxBytes: 2000000,
  },
};

const THUMB_ROUTE = new RegExp(SETTINGS.youtubeThumb.route);
const THUMB_ID = new RegExp("^" + SETTINGS.youtubeThumb.id + "$");

export function matchYouTubeThumb(pathname) {
  if (typeof pathname !== "string" || pathname.includes("%") || pathname.includes("\\")) return null;
  const match = THUMB_ROUTE.exec(pathname);
  if (!match) return null;
  const id = match[1];
  const file = match[2];
  if (!THUMB_ID.test(id) || !SETTINGS.youtubeThumb.files.includes(file)) return null;
  return {
    id,
    file,
    upstream: SETTINGS.youtubeThumb.upstream + id + "/" + file + ".jpg",
  };
}

function thumbHeaders(mark, type, cache) {
  const headers = new Headers();
  headers.set("content-type", type || "text/plain; charset=utf-8");
  headers.set("x-content-type-options", "nosniff");
  headers.set("cache-control", cache || "no-store");
  headers.set("x-aog-thumb", mark);
  return headers;
}

async function closeBody(response) {
  if (!response || !response.body || !response.body.cancel) return;
  try {
    await response.body.cancel();
  } catch (err) {
    /* The body is already closed. */
  }
}

export async function fetchYouTubeThumb(request, match) {
  if (!request || (request.method !== "GET" && request.method !== "HEAD")) {
    return new Response("Not found", { status: 404, headers: thumbHeaders("missing") });
  }
  let upstream;
  try {
    upstream = await fetch(match.upstream, { method: "GET", redirect: "follow" });
  } catch (err) {
    return new Response("Thumbnail unavailable", { status: 502, headers: thumbHeaders("unavailable") });
  }
  const type = upstream.headers.get("content-type") || "";
  const length = Number(upstream.headers.get("content-length") || "0");
  if (!upstream.ok || !type.startsWith("image/") || (length > 0 && length > SETTINGS.youtubeThumb.maxBytes)) {
    await closeBody(upstream);
    const missing = upstream.status === 404;
    return new Response("Thumbnail unavailable", {
      status: missing ? 404 : 502,
      headers: thumbHeaders(missing ? "missing" : "unavailable"),
    });
  }
  const headers = thumbHeaders("ok", "image/jpeg", "public, max-age=86400");
  if (request.method === "HEAD") {
    await closeBody(upstream);
    return new Response(null, { status: 200, headers });
  }
  return new Response(upstream.body, { status: 200, headers });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/yt-thumb/")) {
      const match = matchYouTubeThumb(url.pathname);
      if (!match) return new Response("Not found", { status: 404, headers: thumbHeaders("missing") });
      return fetchYouTubeThumb(request, match);
    }
    return env[SETTINGS.assetsBinding].fetch(request);
  },
};
