import { createClient, RedisClientType } from 'redis';
const client: RedisClientType = createClient({
    url: 'redis://127.0.0.1:6379'

});

export { client };
