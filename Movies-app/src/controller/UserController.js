import { PrismaClient } from "@prisma/client";
import {v4 as uuidv4} from "uuid";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import secretKey from "../Middleware/config.js";

const prisma = new PrismaClient();
const saltRound = 5;
//const bcrypt = new bcrypt();

export const registerUser = async(req, res) => {
    console.log(req.body);
    const {name,  username, password, confPassword, age, role} = req.body;
    const checkUsername = await prisma.users.findUnique({
        where: { username: username } })
    if(username == checkUsername) {
        return res.status(400).json({msg: "username sudah ada"});}
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const hashPass = bcrypt.hashSync(password, saltRound);
    let uid, roles;
    if(role == 1){
        uid = `adm-${uuidv4().split('-')[0]}`;
        roles = "admin";
    } else if(role == 2){
        uid = `usr-${uuidv4().split('-')[0]}`;
        roles = "user";
    } else{
        return res.status(400).json({msg: "Role tidak ada"});
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
                balance: 500000
            },
        }) 
        res.status(201).json({message: "User registered succesfully", user});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const loginUser = async(req, res,) => {
    let { username, password} = req.body
    let existingUser;
    try {
        existingUser = await prisma.users.findFirst({ 
            where: {
                username: username
        }})
        if(!existingUser){
            return res.status(400).json({msg: "user not found"});
        }

        let checkPas = await bcrypt.compare( password, existingUser.password)
        if(!checkPas){
            return res.status(400).json({
                accessToken: null,
                msg: "Wrong Password"});  
        } 

        //generate JWT token
        const token = jwt.sign({
            id: existingUser.id},
            secretKey,{
                algorithm: 'HS256',
                expiresIn: "5h"
            })
        res.status(200).json({
            success: true,
            data: {
                userId: existingUser.id,
                username: username,
                roles: existingUser.role,
                accessToken: token,
            }});
        console.log("Login successful")
    } catch (error) {
        console.log(error);
        res.status(400).json({msg: error.message});
    }
}

export const allAccess = async(req, res) => {
    res.status(200).send("Public access")
}
export const userAccess = async(req, res) => {
    res.status(200).send("user access")
}
export const adminAccess = async(req, res) => {
    res.status(200).send("admin access")
}