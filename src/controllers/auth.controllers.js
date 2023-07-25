import SimpleLinkModel from "../model/SimpleLink.model.js";
import { userModel } from "../model/User.model.js";
import rolesModel from "../model/roles.model.js";
import { AssignJwt, VerifyJwt } from "../util/Jwt.js";
import { ComparePassword, HashPassword } from "../util/crypt.js";

export const Register = async (req, res) => {
  const { email, password, userName, roles } = req.body;
  const isEmailTaken = await userModel.findOne({ email });

  try {
    if (isEmailTaken) {
      res.status(403);
      res.send("user exist");
    } else {
      if (req.body.roles) {
        const rolesIDFinder = await rolesModel.findOne({
          name: req.body.roles,
        });
        const link = await SimpleLinkModel.create({});
        await userModel.create({
          userName: userName,
          roles: rolesIDFinder._id,
          email: email,
          password: await HashPassword(password),
          SimpleLink: link._id,
        });

        res.status(200).json({ msg: "created user" });
      } else {
        const rolefinder = await rolesModel.findOne({ name: "user" });
        await userModel.create({
          userName: firstname,
          roles: rolefinder._id.toHexString(),
          email: email,
          password: await HashPassword(password),
          SimpleLInk: undefined,
        });
        res.status(200);
        res.send("user Created");
      }
    }
  } catch (err) {
    res.status(400);
    res.send(err);
    throw new Error(err);
  }
};

export async function Login(req, res) {
  try {
    const { email, password } = req.body;
    const userFinder = await userModel.findOne({ email: email });
    if (userFinder) {
      const VerrifyPassowrd = await ComparePassword(
        password,
        userFinder.password
      );
      if (VerrifyPassowrd === true) {
        const jwttoken = AssignJwt(email, userFinder._id);
        res.cookie("userInfo", JSON.stringify(userFinder._doc), {
          encode: Object,
          sameSite:'None',
          secure:false,
        });
        res.cookie("access_token", JSON.stringify(jwttoken), {
           encode: Object,
         sameSite:'None',
          secure:false,
        });
        res.status(200);
        res.send({
          userInfo: {
            userName: userFinder.userName,
            token: jwttoken,
            email: userFinder.email,
          },
        });
      } else {
        res.status(401);
        res.send("bad password");
      }
    } else {
      res.status(401);
      res.send("no user found");
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function UpateUser(req, res) {
  try {
    const { id } = VerifyJwt(req.cookies.access_token);
    const update = await userModel.findByIdAndUpdate(id);
  } catch (error) {}
}

export async function Logout(req, res) {
  try {
    res.clearCookie("access_token", { path: "/" });
    res.clearCookie("userInfo");
    res.status(200);
    res.send("cleared cookies");
  } catch (error) {
    throw new Error(error);
  }
}
