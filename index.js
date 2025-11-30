import express from 'express';
import user from './routes/user.routes.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import post from './routes/post.routes.js';
import comment from './routes/comment.routes.js';
import follow from './routes/follow.routes.js';
import 'dotenv/config'
// import prisma from './db/prisma.js';
const port = 8080;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: [
        'http://127.0.0.1:5173',
        'https://overcastweb.vercel.app'
    ],
    credentials: true,
}))

//edited by supreme

app.use('/api/v1/auth', user);
app.use('/api/v1/post', post);
app.use('/api/v1/comment', comment);
app.use('/api/v1/follow', follow);
app.get('/', (req, res) => {
    console.log(req.cookies)
    console.log("test");
    res.json({ msg: req.cookies });
})

app.listen(process.env.PORT || 8080, () => {
    console.log('listening');
})
