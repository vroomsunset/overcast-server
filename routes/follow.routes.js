
import express from 'express';
import auth from '../middleware/auth.js'
import prisma from '../db/prisma.js'
const router = express.Router();

router.post('/:id', auth, async(req, res) => {
    const userid = Number(req.params.id);
    try{
        const follow = await prisma.user.update({
            where : {id : req.user.id},
            data : { following : { connect : { id : userid }}}
        })
        res.json({msg : 'followed'});
    }catch(e){
        console.error(e);
    }
})

router.delete('/:id', auth, async(req, res) => {
    const userid = Number(req.params.id);
    try{
        const follow = await prisma.user.update({
            where : {id : req.user.id},
            data : { following : { disconnect : { id : userid}}}
        })
        res.json({msg : 'unfollowed'})
    }catch(e){
        console.error(e)
    }
})


export default router;
