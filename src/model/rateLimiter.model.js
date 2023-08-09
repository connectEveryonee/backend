import { Repository, Schema } from "redis-om";
import { redis } from "../config/redisConfig.js";

const RatelimiterModel = new Schema(
  "RateLimiter",
  {
    ipAdd: { type: "string" },
    dailyCounter: { type: "number" },
    hourlyCounter: { type: "number" },
    date: { type: "date" },
    lastVisit:{type:'date'}
  },
  { dataStructure: "JSON", prefix: "user" }
);

export const RateLimiterRepository = new Repository(RatelimiterModel, redis);
