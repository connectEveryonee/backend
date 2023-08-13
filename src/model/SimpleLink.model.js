import Joi from "joi";
import mongoose, { Schema, Types } from "mongoose";

const SimpleLinkSchema = new Schema(
  {
    owner: {
      type: String,
    },
    views: Number,
    uniqueId: String,
    links: [
      {
        name: String,
        description: String,
        url: String,
        analytics: [
          {
            date: Date,
            ip: String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("simplelinks", SimpleLinkSchema);

export function ValidateSimpleLink(req, res, next) {
  const schema = Joi.object({
    owner: Joi.string().required(),
    links: Joi.object().required(),
  });

  const { value, error } = schema.validate(req.body);

  if (!error) {
    next();
  } else {
    res.status(400);
    res.send(error);
  }
}
