import { OnModuleInit } from '@nestjs/common';
export declare class RabbitMQService implements OnModuleInit {
    private connection;
    private channel;
    constructor();
    onModuleInit(): Promise<void>;
    private setupQueues;
    publish(queue: string, message: string): Promise<void>;
    consume(queue: string, callback: (message: string) => void): Promise<void>;
}
