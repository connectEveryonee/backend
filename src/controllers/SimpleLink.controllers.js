import SimpleLinkModel from "../model/SimpleLink.model.js";
import SimpleLink from "../model/SimpleLink.model.js";
import { userModel } from "../model/User.model.js";
import { VerifyJwt } from "../util/Jwt.js";

export async function UpdateSimpleLink(req, res) {
  const { id, email } = VerifyJwt(req.cookies.access_token);
  const links = req.body;
  try {
    const findUser = await userModel.findById(id).select("SimpleLink");
    console.log(findUser);
    const finder = await SimpleLink.findByIdAndUpdate(findUser.SimpleLink, {
      $push: { links: links },
    });

    console.log(finder);
    res.status(200);
    res.send("sucessfir;");
  } catch (error) {
    throw new Error(error);
  }
}

export async function GetSimpleLink(req, res) {
  console.log(req)
  try {
    const { user } = req.params;
    const Link = await userModel
      .find({ userName: user })
      .populate({ path: "SimpleLink" })
      .select("SimpleLink");

    res.send(Link);
  } catch (error) {
    throw new Error(error);
  }
}
