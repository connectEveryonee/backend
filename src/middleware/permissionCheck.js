import { userModel } from "../model/User.model.js";
import { VerifyJwt } from "../util/Jwt.js";

export default function PermissionCheck(permission) {
  return async (req, res, next) => {
    try {
      const { email, id } = VerifyJwt(req.cookies.access_token);

      const user = await userModel.findById(id).populate({
        path: "roles",
        select: "name",
        populate: {
          path: "permissions",
          select: "name",
        },
      });
    
      const adminChecker =   user.roles.find((data) => {
        return data.name === "admin";
      });
      if (adminChecker) {
        next();
      } else {
        if (user.roles[0].permissions[0].name != permission) {
          res.status(400);
          res.status("unauthorised");
        } else {
          next();
        }
      }
    } catch (err) {
      res.status(400);
      res.send("unauthorised");
      console.log(err);
    }
  };
}

