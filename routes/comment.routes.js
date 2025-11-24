
import express from 'express';
import prisma from '../db/prisma.js';
import auth from '../middleware/auth.js'
const router = express.Router();

router.post('/:postid', auth, async(req, res) => {
    const postid = Number(req.params.postid);
    const { content } = req.body;
    try{
        const comment = await prisma.comment.create({ data : {
            content : content,
            authorid : req.user.id,
            postid : postid
        }})
        res.json({msg : 'comment created'});
    }catch(e){
        console.error(e);
    }
})

router.get('/:commentid', auth, async(req, res) => {
    const commentid = req.params.commentid;
    try{
        const comment = await prisma.comment.findFirst({
            where : {
                id : Number(commentid)
            }
        })
        res.json({comment});
    }catch(e){
        console.error(e);
    }
})

router.put('/:commentid', auth, async(req, res) => {
    const commentid = Number(req.params.commentid);
    const { content } = req.body;
    try{
        const comment = await prisma.comment.update({
            where : { id : commentid },
            data : {
                content : content
            }
        })
        res.json({msg : 'comment updated'});
    }catch(e){
        console.error(e);
    }
})

router.delete('/:commentid', auth, async(req, res) => {
    const commentid = Number(req.params.commentid);
    try{
        const comment = await prisma.comment.delete({ where : {
            id : commentid
        }})
        res.json({msg : 'comment deleted'});
    }catch(e){
        console.error(e)
    }
})


export default router;
