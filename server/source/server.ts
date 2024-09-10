import { z } from 'zod';
import express , {Request,Response} from 'express'
import {client} from './redisConnection';
const app = express();
const port = 3000;
app.use(express.json());
 const loginRequestSchema = z.object({
   sessionId: z.string(),
   email: z.string().email()
  });
  async function connectClient() {
    try {
  await client.connect();
  console.log('Connected to Redis');
} catch (err) {
  console.error('Redis connection error:', err);
}
}

type LoginRequest = z.infer<typeof loginRequestSchema>;
app.post('/login',async(req: Request,res: Response)=>{
connectClient();
const parsedResult = loginRequestSchema.safeParse(req.body);
const {sessionId,email} = parsedResult.data as LoginRequest;
try{
  //  I forgot which to take as key ,hence have written both .Delete the one that you dont want :)
    // const key = `user-session:${sessionId}`;
    const key = `user-session:${email}`;
    // await client.hSet(key,{email});
    await client.hSet(key,{sessionId});
    res.status(200).json({message:"Data stored successfully !"})
    // let userSession = await client.hGetAll(`user-session:${sessionId}`);
    let userSession = await client.hGetAll(`user-session:${email}`);
    const x = {key , ...userSession}
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
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });