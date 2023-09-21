/* eslint-disable prettier/prettier */
// rabbitmq/rabbitmq.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect, Channel, Connection } from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit {
  private connection: Connection;
  private channel: Channel;

  constructor() {}

  async onModuleInit() {
    try {
      this.connection = await connect('amqp://localhost'); 
      this.channel = await this.connection.createChannel();

      // Set up the queues and bindings here
      await this.setupQueues();
    } catch (error) {
      console.error('Error initializing RabbitMQ:', error);
    }
  }

  private async setupQueues() {
    const queuesToDeclare = ['task-assignment', 'task-due-notification'];
    for (const queue of queuesToDeclare) {
      await this.channel.assertQueue(queue, { durable: false });
    }
  }

  async publish(queue: string, message: string) {
    if (this.channel) {
      this.channel.sendToQueue(queue, Buffer.from(message));
    } else {
      console.error('RabbitMQ channel is not available.');
    }
  }

  async consume(queue: string, callback: (message: string) => void) {
    if (this.channel) {
      this.channel.consume(queue, (msg) => {
        if (msg) {
          const message = msg.content.toString();
          callback(message);
          this.channel.ack(msg); // Acknowledge the message
        }
      });
    } else {
      console.error('RabbitMQ channel is not available.');
    }
  }
}
