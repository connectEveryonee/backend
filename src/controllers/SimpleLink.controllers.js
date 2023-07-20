import SimpleLinkModel from "../model/SimpleLink.model.js";
import SimpleLink from "../model/SimpleLink.model.js";
import { userModel } from "../model/User.model.js";
import { VerifyJwt } from "../util/Jwt.js";

export async function UpdateSimpleLink(req, res) {
  const { id, email } = VerifyJwt(req.cookies.access_token);
  const links = req.body;
  try {
    const findUser = await userModel.findById(id).select("SimpleLink");

    const finder = await SimpleLink.findByIdAndUpdate(findUser.SimpleLink, {
      $push: { links: links },
    });

    res.send("sucessful");
    res.status(100);
  } catch (error) {
    throw new Error(error);
  }
}

export async function GetSimpleLink(req, res) {
  try {
    const { user } = req.params;

    const Link = await userModel
      .find({ userName: user })
      .select("userName")
      .populate({ path: "SimpleLink" })
      .select("SimpleLink");

    res.send(Link);
    res.status(200);
  } catch (error) {
    throw new Error(error);
  }
}

export async function UpdateLinkItems(req, res) {
  try {
    const { id, email } = VerifyJwt(req.cookies.access_token);
    const userFinder = await userModel.findById(id);
    const z = await SimpleLink.findOneAndUpdate(
      { _id: userFinder.SimpleLink },
      { links: req.body }
    );

    res.status(200);
    res.send("Updation Sucessful");
  } catch (err) {
    res.status(400);
    res.send("unsucessful updation");
  }
}

export async function DeleteLinkItems(req, res) {
  try {
    const { id, email } = VerifyJwt(req.cookies.access_token);

    const userFinder = await userModel.findById(id);
    const z = await SimpleLink.findOneAndUpdate(
      { _id: userFinder.SimpleLink },
      { links: req.body }
    );

    res.status(200);
    res.send("Updation Sucessful");
  } catch (err) {
    res.status(400);
    res.send("unsucessful updation");
  }
}
