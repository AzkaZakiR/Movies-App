import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import secretKey from "../Middleware/config.js";
import { response } from "express";

const prisma = new PrismaClient();
const saltRound = 5;
//const bcrypt = new bcrypt();

export const topUp = async (req, res) => {
  const userId = req.userId;
  const { moneyAmount } = req.body;

  console.log(typeof moneyAmount);
  try {
    const isiUang = await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        balance: {
          increment: parseInt(moneyAmount),
        },
      },
    });
    res.status(201).json(isiUang);
    console.log(isiUang);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message });
  }
};
export const withdraw = async (req, res) => {
  const userId = req.userId;
  const { moneyAmount } = req.body;
  console.log("jumlah duit");
  const compare = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });
  console.log(compare);
  if (moneyAmount > compare.balance) {
    return res.status(400).json({ msg: "Insufficient balance." });
  }
  try {
    const isiUang = await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        balance: {
          decrement: parseInt(moneyAmount),
        },
      },
    });
    res.status(201).json(isiUang);
    console.log(isiUang);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message });
  }
};
export const getUserDetail = async (req, res) => {
  //const userId = req.params.id;
  const userId = req.userId;
  console.log("This is the user ID:", userId);

  try {
    const detail = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
    res.status(200).json(detail);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};
export const registerUser = async (req, res) => {
  const { name, username, password, confPassword, age, role } = req.body;
  const checkUsername = await prisma.users.findUnique({
    where: { username: username },
  });
  if (checkUsername) {
    return res.status(400).json({ msg: "username already exist" });
  }
  if (password.length < 8) return res.status(400).json({ msg: "Password can't be less than 8 characters!" });

  if (password !== confPassword) return res.status(400).json({ msg: "Password and Confirmation password do not match!!" });
  const hashPass = bcrypt.hashSync(password, saltRound);
  let uid, roles;
  if (role == 1) {
    uid = `adm-${uuidv4().split("-")[0]}`;
    roles = "admin";
  } else if (role == 2) {
    uid = `usr-${uuidv4().split("-")[0]}`;
    roles = "user";
  } else {
    return res.status(400).json({ msg: "Role tidak ada" });
  }
  try {
    const user = await prisma.users.create({
      data: {
        id: uid,
        name: name,
        username: username,
        password: hashPass,
        age: age,
        role: roles,
        balance: 500000,
      },
    });
    res.status(201).json({ message: "User registered succesfully", user });
  } catch (error) {
    res.status(400).json({ msg: error.message });
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  let { username, password } = req.body;
  let existingUser;
  try {
    existingUser = await prisma.users.findFirst({
      where: {
        username: username,
      },
    });
    if (!existingUser) {
      return res.status(400).json({ msg: "user not found" });
    }

    let checkPas = await bcrypt.compare(password, existingUser.password);
    if (!checkPas) {
      return res.status(400).json({
        accessToken: null,
        msg: "Wrong Password",
      });
    }

    //generate JWT token
    const token = jwt.sign(
      {
        id: existingUser.id,
      },
      secretKey,
      {
        algorithm: "HS256",
        expiresIn: "5h",
      }
    );
    res.status(200).json({
      success: true,
      data: {
        userId: existingUser.id,
        username: username,
        roles: existingUser.role,
        accessToken: token,
      },
    });
    console.log("Login successful");
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

export const allAccess = async (req, res) => {
  res.status(200).send("Public access");
};
export const userAccess = async (req, res) => {
  res.status(200).send("user access");
};
export const adminAccess = async (req, res) => {
  res.status(200).send("admin access");
};
