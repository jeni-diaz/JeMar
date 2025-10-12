import { User } from "../models/user.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user)
    return res.status(400).send({ message: "User already exists" });

  const saltRounds = 10;

  const salt = await bcrypt.genSalt(saltRounds);

  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  res.json(newUser.id);
};

