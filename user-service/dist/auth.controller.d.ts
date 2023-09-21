import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    private jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    private readonly logger;
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<import("./user.entity").User>;
    signIn(req: any, response?: Response): {
        username: any;
        user_id: any;
    };
}
