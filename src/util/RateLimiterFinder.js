import { RateLimiterRepository } from "../model/rateLimiter.model.js";

export default async function RateLimiterFinder(ipAdd) {
  await RateLimiterRepository.createIndex();

  const s = await RateLimiterRepository.search()
    .where("ipAdd")
    .eq(ipAdd)
    .returnAll();

  return s[0];
}
 //ending