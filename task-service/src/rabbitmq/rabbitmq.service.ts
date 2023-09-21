/* eslint-disable prettier/prettier */
// rabbitmq/rabbitmq.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect, Channel } from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit {
  private connection: any;
  private channel: Channel;

  async onModuleInit() {
    this.connection = await connect('amqp://localhost'); // Change the connection URL as needed
    this.channel = await this.connection.createChannel();
  }

  async publish(queue: string, message: string) {
    console.log(`Publishing message to queue "${queue}": ${message}`);
    this.channel.sendToQueue(queue, Buffer.from(message));
  }
}

