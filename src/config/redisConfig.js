import { createClient } from "redis";

export let redis = createClient();

export default async function ConnectRedis() {
  redis.on("error", (err) => {
    throw new Error(err);
  });
  await redis.connect().then(() => {
    console.log(`connected with redis `);
  });
}
