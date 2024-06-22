import { User } from "../models/user.js";

// create a new user and save it in database and save in cookie
const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;

  const avatar = {
    public_id: "asd",
    url: "asd",
  };
  try {
    await User.create({
      name,
      bio,
      username,
      password,
      avatar,
    });
    res.status(201).json({ message: "User creaeted successfully" });
  } catch (err) {
    console.log(err);
  }
};

const login = (req, res) => {
  res.send("Hello world");
};

export { login, newUser };
