import { OnModuleInit } from '@nestjs/common';
export declare class RabbitMQService implements OnModuleInit {
    private connection;
    private channel;
    onModuleInit(): Promise<void>;
    publish(queue: string, message: string): Promise<void>;
}
