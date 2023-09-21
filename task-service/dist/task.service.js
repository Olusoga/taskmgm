"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./task.entity");
const rabbitmq_service_1 = require("./rabbitmq/rabbitmq.service");
let TaskService = class TaskService {
    constructor(taskRepository, rabbitMQService) {
        this.taskRepository = taskRepository;
        this.rabbitMQService = rabbitMQService;
    }
    async findById(id) {
        return this.taskRepository.findOne({ where: { id: id } });
    }
    async create(taskData) {
        const task = await this.taskRepository.create(taskData);
        return await this.taskRepository.save(task);
    }
    async update(id, taskData) {
        const taskId = await this.findById(id);
        return await this.taskRepository.update(taskId.id, taskData);
    }
    async remove(id) {
        await this.taskRepository.delete(id);
    }
    async assignTaskToUser(taskId, userIds) {
        const task = await this.findById(taskId);
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        task.assignedUserIds = userIds;
        const updatedTask = await this.taskRepository.save(task);
        const message = JSON.stringify({ taskId, userIds });
        await this.rabbitMQService.publish('task-assignment', message);
        return updatedTask;
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        rabbitmq_service_1.RabbitMQService])
], TaskService);
//# sourceMappingURL=task.service.js.map