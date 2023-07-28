import { userModel } from "../model/User.model.js";

export async function CheckUserName(req, res) {
  try {
    const userNameChecker = await userModel.exists({
      userName: req.body.userName,
    });

    if (userNameChecker === null) {
      res.status(404);
      res.send("User does not exit");
    } else {
      res.status(403);
      res.send("User Name exits");
    }
  } catch (err) {
    throw new Error(err);
  }
}
