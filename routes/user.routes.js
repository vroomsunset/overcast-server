import express from 'express';
const router = express.Router();
import { z } from 'zod';
import prisma from '../db/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userschema = z.object({
    username : z.string().trim().min(4).max(15),
    email : z.string().email().trim().optional(),
    password : z.string().trim().min(5).max(20)
})

router.post('/signup', async(req, res) => {
    // const data = req.body;
    try{
        const result = userschema.safeParse(req.body); //safeParse throws boolean, parse throws error
        // console.log(result);
        if(!result.success) return res.json({msg : 'invalid credentials'})
        const hash = await bcrypt.hash(result.data.password, 10);
        // console.log(hash);
        const user = await prisma.user.create({ data : {
            username : result.data.username,
            email : result.data.email,
            password : hash

        }})
        // console.log(user);
        const token = jwt.sign({ id : user.id }, process.env.JWT_SECRET)
        res.cookie('token', token, {
            httpOnly: true,
            sameSite : true
        }).json({msg : 'signed up'});
    }catch(e){
        console.error(e);
        res.json({msg : e});
    }
})

router.post('/login', async(req, res) => {
    try{
        const result = userschema.safeParse(req.body);
        // console.log(result);
        if(!result.success) return res.json({msg : 'invalid credentials'});
        const user = await prisma.user.findUnique({ where : {
            username : result.data.username
        }})
        // console.log(user);
        if(!user) return res.json({msg : 'user not found'});

        const pass = await bcrypt.compare(result.data.password, user.password);
        if(!pass) return res.json({msg : 'invalid password'});

        const token = jwt.sign({id : user.id}, process.env.JWT_SECRET);
        // console.log(token);
        res.cookie('token', token, {
            httpOnly: true,
            sameSite : true
        }).json({msg : 'logged in!'});

    }catch(e){
        console.error(e);
        res.json({msg : e});
    }
})

router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite : true
    }).json({msg : 'logged out!'});
})

export default router;
