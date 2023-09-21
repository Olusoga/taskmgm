"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const user_entity_1 = require("../user.entity");
exports.databaseConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'taskmgm_user',
    autoLoadEntities: true,
    synchronize: true,
    entities: [user_entity_1.User],
};
//# sourceMappingURL=database.js.map