import { createClient, RedisClientType } from 'redis';
const client: RedisClientType = createClient({
    url: 'redis://127.0.0.1:6379'

});
async function connectClient() {
    try {
  await client.connect();
  console.log('Connected to Redis');
} catch (err) {
  console.error('Redis connection error:', err);
}
}
connectClient();
export { client };
