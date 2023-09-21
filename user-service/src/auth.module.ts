import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { databaseConfig } from './database/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { HttpModule } from '@nestjs/axios';
import { User } from './user.entity';
import { jwtConstants } from './constants';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.LOGIN_EXPIRY },
    }),
    PassportModule,
    TypeOrmModule.forFeature([User]),
    HttpModule,
    RabbitMQModule,
    JwtModule.register({
      secret: 'your-secret-key-here', // Replace 'your-secret-key-here' with your actual secret key
      signOptions: { expiresIn: '1h' }, // You can adjust token expiration as needed
    }),
  ],
  providers: [AuthService, LocalStrategy, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
