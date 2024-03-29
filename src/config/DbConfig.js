import mongoose from "mongoose";

export async function DbConnect(url) {
  try {
    
    await mongoose.connect(url).then(console.log("server listening at ", process.env.Port));
  } catch (err) {
    console.error(err);
    throw err;
  }
}
