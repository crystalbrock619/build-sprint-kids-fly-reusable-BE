import {
  findUser,
  findUsers,
  createUser,
  updateUser,
  deleteUser,
  findUserByLogin
} from "../models/user";
import { createToken } from "../middleware/verifyToken";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByLogin(email, password);
    if (user === undefined) {
      return res.status(404).json({ msg: "404: User cannot be found." });
    }
    res.status(200).json({ token: `${createToken(user[0])}` });
  } catch (e) {
    e.statusCode = 400;
    next(e);
  }
};
