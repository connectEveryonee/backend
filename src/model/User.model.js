import Joi from "joi";
import mongoose, { Schema, Types, model } from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  SimpleLink: {
    type: Types.ObjectId,
    ref: "simplelinks",
  },

  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "roles",
    },
  ],
});

export const userModel = mongoose.model("user", UserSchema);

//validate middleware for schema
export function ValidateUserSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    roles: Joi.array(),
  });

  const { value, error } = schema.validate(req.body);

  if (!error) {
    next();
  } else {
    res.status(400);
    res.send(error);
  }
}

export function ValidateLoginSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string(),
  });

  const { value, error } = schema.validate(req.body);

  if (!error) {
    next();
  } else {
    res.status(400);
    res.send(error);
  }
}
