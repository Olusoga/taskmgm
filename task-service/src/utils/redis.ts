/* eslint-disable prettier/prettier */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import Redis from 'ioredis';
0
// Create a Redis client instance
const redisClient = new Redis({
  host: 'localhost', // Redis server host
  port: 6379, // Redis server port
});

// Test the connection
redisClient.ping().then(() => {
  console.log('Connected to Redis');
});

// Export the Redis client instance so it can be used in other files
export default redisClient;
