
import jwt from "jsonwebtoken";

export default function auth(req, res, next){
    const token = req.cookies.token;
    if(!token){
        res.json({msg : 'log in first'});
    }
    try{
        const data = jwt.verify(token, process.env.JWT_SECRET);
        console.log(data);
        if(data){
            req.user = data;
            next();
        }
    }catch(e){
        console.error(e)
        res.json({msg : e});
    }

}
