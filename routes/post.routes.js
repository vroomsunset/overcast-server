import express from 'express';
import prisma from '../db/prisma.js';
const router = express.Router();
import auth from '../middleware/auth.js'

router.post('/create', auth, async(req, res) => {
    const { content } = req.body;
    try{
        const post = await prisma.post.create({ data : {
            authorid : req.user.id,
            content : content
        }})
        res.json({msg : 'post created'});
    }catch(e){
        console.error(e);
        res.json({msg : e});
    }
})

router.get('/:id', auth, async(req, res) => {
    const postid = req.params.id;
    try{
        const post = await prisma.post.findUnique({where : {
            id : postid
        }})
        res.json({ post });
    }catch(e){
        console.error(e);
    }
})

router.put('/edit/:id', auth, async(req, res) => {
    try{
        const postid = Number(req.params.id);
        const { content } = req.body;
        const updated = await prisma.post.update({
            where : { id : postid },
            data : { content }
        })
        res.json({msg : 'post updated'});
    }catch(e){
        console.error(e);
    }
})


router.delete('/delete', auth, async(req, res) => {
    const { postid } = req.body;
    try{
        const post = await prisma.post.findUnique({ where : { id : postid }});
        if(!post){
            res.json({msg : 'post doesnt exists'});
        }
        const del = await prisma.post.delete({ where : { id : postid }});
        res.json({ msg : 'post deleted '});
    }catch(e){
        console.error(e);
        return res.json({msg : e});
    }
})

router.get('/explore', auth, async(req, res) => {
    try{
        const post = await prisma.post.findMany({ take : 20});
        res.json({post});
    }catch(e){
        console.error(e);
    }
})

export default router;
