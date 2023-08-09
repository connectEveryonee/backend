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
      userfinder.hourlyCounter++;
      // console.log(date.setTime() - date.getTime());
      // userfinder.lastVisit = date;
      const diff = GetDateDifference(userfinder.lastVisit, date);
      console.log(diff);
      if (diff.hours >= 1) {
        res.send("rate limiter");
        res.send(500);
      } else {
        userfinder.hourlyCounter++;
        userfinder.lastVisit = date;
        await RateLimiterRepository.save(userfinder);
        next();
      }
      // console.log(userfinder.lastVisit.getTime(),date.getTime())

      // console.log(getDateDifference(userfinder.lastVisit,date))
      // await RateLimiterRepository.save(userfinder);
    }
  } catch (error) {
    // throw new Error(error);
    res.status(500).send("Internal Server Error");
  }
}
