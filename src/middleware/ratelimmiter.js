import { EntityId } from "redis-om";
import { RateLimiterRepository } from "../model/rateLimiter.model.js";
import RateLimiterFinder from "../util/RateLimiterFinder.js";
import GetDateDifference from "../util/timeDiffCalc.js";

export async function Ratelimite(req, res, next) {
  try {
    var date = new Date();
    let userfinder = await RateLimiterFinder(req.connection.remoteAddress);

    if (userfinder === undefined) {
      const body = {
        ipAdd: req.connection.remoteAddress,
        dailyCounter: 1,
        hourlyCounter: 0,
        date: date,
        lastVisit: date,
      };
      await RateLimiterRepository.save({ ...body }).then((data) => {
        RateLimiterRepository.expire(data[EntityId], 60 * 60*24);
        return data;
      });
      next();
    } else {
    
      const diff = GetDateDifference(userfinder.lastVisit, date);
      console.log(diff);
      if (diff.hours < 1) {
        res.send("rate limited");
        res.status(500);
      } else {
        
        userfinder.hourlyCounter++;
        userfinder.lastVisit = date;
        await RateLimiterRepository.save(userfinder);
        next();
      }
    
    }
  } catch (error) {
    // throw new Error(error);
    res.status(500).send("Internal Server Error");
  }
}
