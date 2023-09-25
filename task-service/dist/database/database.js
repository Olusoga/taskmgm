"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const task_entity_1 = require("../task.entity");
exports.databaseConfig = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_DB_NAME || 'taskmgm_task',
    autoLoadEntities: true,
    synchronize: true,
    entities: [task_entity_1.Task],
};
//# sourceMappingURL=database.js.map