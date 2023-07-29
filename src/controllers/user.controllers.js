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

export async function GetUser(req, res) {
  console.log(req.data)
  try {
    const user = userModel
      .find({ userName: req.body.userName })
      .select("email")
      .select("password")
      .select("userName")
      .then((data) => {
        res.status(200);
        res.send(data);
      })
      .catch((err) => {
        res.status(404);
        res.send(err);
      });
  } catch (err) {
    throw new Error(err);
  }
}
