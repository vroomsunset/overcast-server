
import jwt from "jsonwebtoken";
import 'dotenv/config'

export default function auth(req, res, next) {
    const token = req.cookies.token;
    if (token === undefined) {
        console.log('undefined')
    }
    console.log(token)
    if (!token) {
        res.json({ msg: 'log in first' });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        console.log(data);
        req.user = data;
        return next();

    } catch (e) {
        console.error(e)
        res.json({ msg: e });
    }

}
