import { hashSync } from "bcrypt";
import { userModel } from "../model/User.model.js";
import { HashPassword } from "../util/crypt.js";

export async function CheckUserName(req, res, next) {
  try {
    const userNameChecker = await userModel.exists({
      userName: req.body.userName,
    });

    if (userNameChecker === null) {
      next();
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

export async function EditUserUser(req, res) {
  try {
    const { userName } = req.params;
    const UpdatingBody = structuredClone(req.body);
    // if (!req.body.password) {
      UpdatingBody.password = await HashPassword(req.body.password);
      delete UpdatingBody.password;
      // const findUser = await userModel.findOneAndUpdate(
      //   { userName },
      //   UpdatingBody
      // );
      // if (findUser === null) {
      //   res.send("user Does not exits");
      //   res.status(404);
      // } else {
      //   res.send("User Details Updated");
      //   res.status(200);
      // }
      console.log(UpdatingBody);
    
  } catch (error) {
    console.log(error);
  }
}
