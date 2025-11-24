
import express from 'express';
const router = express.Router();

router.post('/:postid', auth, async(req, res) => {
    const postid = req.params.postid;
    try{
        const comment = await prisma.comment.create({ data : {
            content : content,
            authorid : req.user.id,
            postid : postid
        }})
    }catch(e){
        console.error(e);
    }
})


export default router;
