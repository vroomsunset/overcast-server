import express from 'express';
import user from './routes/user.routes.js';
import cors from 'cors'
// import prisma from './db/prisma.js';
const port = 8080;

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,

}))
app.use('/api/v1/auth', user);
app.get('/test', (req, res) => {
    console.log("test");
    res.json({msg : 'test'});
})

app.listen(port, () => {
    console.log('listening');
})
