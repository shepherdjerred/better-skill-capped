export interface Env {
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  BUCKET: R2Bucket;
}

export default {
  async scheduled(_event: ScheduledEvent, env: Env, _ctx: ExecutionContext): Promise<void> {
    const response = await fetch("https://www.skill-capped.com/lol/browse");
    const body = await response.text();
    const groups = body.match(/loc: *"(.*)"/);
    if (groups === null || groups[1] === undefined) {
      console.error(body, groups);
      throw Error("unable to find url");
    }
    const url = groups[1];
    console.log(`found ${url}`);
    const jsonResponse = await fetch(url);
    const jsonContent = await jsonResponse.json();
    console.log(jsonContent);
    await env.BUCKET.put("manifest.json", JSON.stringify(jsonContent));
    console.log("all done!");
  },
};
