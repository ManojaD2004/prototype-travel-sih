import helmet from 'helmet';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import { client } from './redisConnection';
import {checkSession} from './middleware'
// import bcrypt from 'bcrypt';
const app = express();
const port = 3000;
app.use(helmet());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(checkSession)
const loginRequestSchema = z.object({
  email: z.string().email()
});
// async function hashPassword(password: string) {
//   const saltRounds = 10; 
//   const hashedPassword = await bcrypt.hash(password, saltRounds);
//   return hashedPassword;
// }

type LoginRequest = z.infer<typeof loginRequestSchema>;


app.post('/login', async (req, res) => {
  const parsedResult = loginRequestSchema.safeParse(req.body);
  const { email } = parsedResult.data as LoginRequest;
  const uuid = uuidv4();
  const sessionId = uuid.replace(/-/g, '');
  try {
    //  I forgot which to take as key ,hence have written both .Delete the one that you dont want :)
    const key = `user-session:${sessionId}`;
    // const key = `user-session:${email}`;
    // await client.hSet(key,{email});
    await client.hSet(key, { email });
    await client.expire(key, 432000);
    // let userSession = await client.hGetAll(`user-session:${sessionId}`);
    // let userSession = await client.hGetAll(`user-session:${email}`);
    const expiry = 5*24*60*60*1000;
    res.cookie('sessionId',sessionId,{maxAge : expiry , httpOnly : true})
    res.status(200).json({ message: "Data stored successfully !" })
    const x = key
    console.log(JSON.stringify(x))
    //to close client connection ->
    // await client.quit()
    // console.log('Connection is closed')
  }
  catch (err) {
    console.error('Error storing user data:', err);
    res.status(500).json({ error: 'Server Error :( ' });
  }
})
app.get('/checkCookies', (req,res) => {
const sessionId = req.cookies.sessionId;
if (sessionId) {
  res.status(200).json({ message: `Cookie is set: ${sessionId}` });
} else {
  res.status(404).json({ message: 'No session cookie found' });
}
})
app.get('/hello', async (req, res) => {
  const sessionId = req.cookies.sessionId;
  console.log(sessionId);

  if (!sessionId) {
    return res.status(404).json({ message: "SessionId cookie is missing :(" });
  }
  const key = `user-session:${sessionId}`;

  try {
    const sessionData = await client.hGetAll(key);

    if (Object.keys(sessionData).length > 0) {
      res.status(200).json({ message: `Hi, tiger!` });
      console.log(sessionData);
    } else {
      res.status(404).json({ message: 'No active session found!' });
    }
  } catch (err) {
    console.error('Error :', err);
    res.status(500).json({ error: 'Server Error :(' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});