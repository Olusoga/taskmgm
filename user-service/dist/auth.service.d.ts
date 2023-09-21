import { JwtService } from '@nestjs/jwt';
import { Connection, Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
export declare class AuthService {
    private readonly userRepository;
    private readonly connection;
    private readonly httpService;
    private jwtService;
    constructor(userRepository: Repository<User>, connection: Connection, httpService: HttpService, jwtService: JwtService);
    findOne(username: string): Promise<User>;
    validateUser(username: string, pass: any): Promise<{
        id: string;
        username: string;
    }>;
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<User>;
}
