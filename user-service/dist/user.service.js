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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const rabbitmq_service_1 = require("./rabbitmq/rabbitmq.service");
const auth_service_1 = require("./auth.service");
const mail_1 = require("./mail");
let UserService = class UserService {
    constructor(rabbitMQService, authService) {
        this.rabbitMQService = rabbitMQService;
        this.authService = authService;
    }
    onModuleInit() {
        this.rabbitMQService.consume('task-assignment', (message) => {
            this.handleTaskAssignmentMessage(message);
        });
        this.rabbitMQService.consume('task-due-notification', (message) => {
            this.handleTaskDueNotificationMessage(message);
        });
    }
    async handleTaskAssignmentMessage(message) {
        try {
            const { userIds, taskId } = JSON.parse(message);
            const emailBody = `User ${userIds} has been assigned to task ${taskId}`;
            for (const userId of userIds) {
                const user = await this.authService.findUserById(userId);
                return (0, mail_1.sendEmailForTaskAssignment)(user.email, emailBody);
            }
        }
        catch (error) {
            console.error('Error handling task assignment message:', error);
        }
    }
    async handleTaskDueNotificationMessage(message) {
        try {
            const { userIds, taskId } = JSON.parse(message);
            const emailBody = `Task ${taskId} is overdue. Notify users.`;
            for (const userId of userIds) {
                const user = await this.authService.findUserById(userId);
                return (0, mail_1.sendEmailForTaskDue)(user.email, emailBody);
            }
        }
        catch (error) {
            console.error('Error handling task overdue notification message:', error);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rabbitmq_service_1.RabbitMQService,
        auth_service_1.AuthService])
], UserService);
//# sourceMappingURL=user.service.js.map