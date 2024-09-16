import { client } from './redisConnection';

export async function checkSession(req: any, res: any, next: any) {
  const excludedRoutes = ['/login', '/signup-mail', '/signup-phone'];

  if (excludedRoutes.includes(req.path)) {
    console.log(`Skipping session check for ${req.path}`);
    return next();
  }

  const sessionId = req.cookies.sessionId;
  console.log('Session ID:', sessionId);

  if (!sessionId) {
    console.log('No session ID found, returning activeSession: false');
    return res.status(200).json({ activeSession: false });
  }

  const key = `user-session:${sessionId}`;

  try {
    const sessionData = await client.hGetAll(key);
    console.log('Session Data:', sessionData);

    if (Object.keys(sessionData).length > 0) {
      console.log('Valid session found, returning activeSession: true');
      return next();
    } else {
      console.log('No valid session data found, returning activeSession: false');
      return res.status(200).json({ activeSession: false });
    }
  } catch (err) {
    console.error('Error during session retrieval:', err);
    return res.status(500).json({ error: 'Server Error :(' });
  }
}
