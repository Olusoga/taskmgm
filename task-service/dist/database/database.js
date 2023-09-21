"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const task_entity_1 = require("../task.entity");
exports.databaseConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'taskmgm_task',
    autoLoadEntities: true,
    synchronize: true,
    entities: [task_entity_1.Task],
};
//# sourceMappingURL=database.js.map