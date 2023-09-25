"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = require("ioredis");
0;
const redisClient = new ioredis_1.default({
    host: 'localhost',
    port: 6379,
});
redisClient.ping().then(() => {
    console.log('Connected to Redis');
});
exports.default = redisClient;
//# sourceMappingURL=redis.js.map