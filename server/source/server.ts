import helmet from 'helmet';
import { z } from 'zod';
import {v4 as uuidv4} from 'uuid'
import cookieParser from 'cookie-parser'
import express , {Request,Response} from 'express'
import {client} from './redisConnection';
const app = express();
const port = 3000;
app.use(helmet());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(cookieParser())
app.use(express.json());
 const loginRequestSchema = z.object({
   email: z.string().email()
  });

type LoginRequest = z.infer<typeof loginRequestSchema>;
app.post('/login',async(req: Request,res: Response)=>{
const parsedResult = loginRequestSchema.safeParse(req.body);
const {email} = parsedResult.data as LoginRequest;
const uuid = uuidv4();
const sessionId = uuid.replace(/-/g , '');
try{
  //  I forgot which to take as key ,hence have written both .Delete the one that you dont want :)
    const key = `user-session:${sessionId}`;
    // const key = `user-session:${email}`;
    // await client.hSet(key,{email});
    await client.hSet(key,{email});
    res.status(200).json({message:"Data stored successfully !"})
    // let userSession = await client.hGetAll(`user-session:${sessionId}`);
    // let userSession = await client.hGetAll(`user-session:${email}`);
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
app.get('/hello', async (req: Request, res: Response) => {
  const sessionId = req.cookies.sessionId;
  console.log(sessionId);

  if(!sessionId)
  {
    return res.status(404).json({message : "SessionId cookie is missing :("});
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