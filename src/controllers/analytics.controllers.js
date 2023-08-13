import SimpleLinkModel from "../model/SimpleLink.model.js";

export default async function Analytics(req, res) {
  const date = new Date();
  try {
    const { username, link } = req.query;
    const userfinder = await SimpleLinkModel.findOne({
      owner: username,
    });
    const links = new Array(userfinder.links);
    const finder = userfinder.links.findIndex((data, index) => {
      return data.name === link;
    });
    userfinder.links[finder].analytics.push({ date: date, ip: req.ip });
    await SimpleLinkModel.updateOne(
      { owner: username },
      { links: userfinder.links }
    );
    res.send("updated viewCount on pages");
    res.status(200);
  } catch (error) {
    res.send("server error");
    res.status(500);
    throw new Error(error);
  }
}

export async function PageAnalytics(req, res) {
  try {
    const { username } = req.query;
    const userfinder = await SimpleLinkModel.findOne({
      owner: username,
    });
    await SimpleLinkModel.updateOne(
      { owner: username },
      { views: userfinder.views + 1 }
    );
    res.send("updated analytics");
    res.status(200);
  } catch (error) {
    res.send("server error");
    res.status(500);
    throw new Error(error);
  }
}
