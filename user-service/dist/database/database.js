"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const user_entity_1 = require("../user.entity");
exports.databaseConfig = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB_NAME,
    autoLoadEntities: true,
    synchronize: true,
    entities: [user_entity_1.User],
};
//# sourceMappingURL=database.js.map