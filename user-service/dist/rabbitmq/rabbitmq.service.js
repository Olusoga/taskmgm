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
exports.RabbitMQService = void 0;
const common_1 = require("@nestjs/common");
const amqplib_1 = require("amqplib");
let RabbitMQService = class RabbitMQService {
    constructor() { }
    async onModuleInit() {
        try {
            this.connection = await (0, amqplib_1.connect)('amqp://localhost');
            this.channel = await this.connection.createChannel();
            await this.setupQueues();
        }
        catch (error) {
            console.error('Error initializing RabbitMQ:', error);
        }
    }
    async setupQueues() {
        const queuesToDeclare = ['task-assignment', 'task-due-notification'];
        for (const queue of queuesToDeclare) {
            await this.channel.assertQueue(queue, { durable: false });
        }
    }
    async publish(queue, message) {
        if (this.channel) {
            this.channel.sendToQueue(queue, Buffer.from(message));
        }
        else {
            console.error('RabbitMQ channel is not available.');
        }
    }
    async consume(queue, callback) {
        if (this.channel) {
            this.channel.consume(queue, (msg) => {
                if (msg) {
                    const message = msg.content.toString();
                    callback(message);
                    this.channel.ack(msg);
                }
            });
        }
        else {
            console.error('RabbitMQ channel is not available.');
        }
    }
};
exports.RabbitMQService = RabbitMQService;
exports.RabbitMQService = RabbitMQService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RabbitMQService);
//# sourceMappingURL=rabbitmq.service.js.map