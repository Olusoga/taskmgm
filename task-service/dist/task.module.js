"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModule = void 0;
const common_1 = require("@nestjs/common");
const task_controller_1 = require("./task.controller");
const task_service_1 = require("./task.service");
const database_1 = require("./database/database");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("./task.entity");
const rabbitmq_module_1 = require("./rabbitmq/rabbitmq.module");
const rabbitmq_service_1 = require("./rabbitmq/rabbitmq.service");
let TaskModule = class TaskModule {
};
exports.TaskModule = TaskModule;
exports.TaskModule = TaskModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(database_1.databaseConfig),
            typeorm_1.TypeOrmModule.forFeature([task_entity_1.Task]),
            rabbitmq_module_1.RabbitMQModule,
        ],
        providers: [task_service_1.TaskService, rabbitmq_service_1.RabbitMQService],
        controllers: [task_controller_1.TaskController],
    })
], TaskModule);
//# sourceMappingURL=task.module.js.map