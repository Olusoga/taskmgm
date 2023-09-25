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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const typeorm_2 = require("typeorm");
const axios_1 = require("@nestjs/axios");
const user_entity_1 = require("./user.entity");
const custom_exception_1 = require("./error/custom.exception");
let AuthService = class AuthService {
    constructor(userRepository, connection, httpService, jwtService) {
        this.userRepository = userRepository;
        this.connection = connection;
        this.httpService = httpService;
        this.jwtService = jwtService;
    }
    async findOne(username) {
        const user = await this.userRepository.findOne({ where: { username: username } });
        return user;
    }
    async validateUser(username, pass) {
        const user = await this.findOne(username);
        if (!user)
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'invalid username',
            }, common_1.HttpStatus.BAD_REQUEST);
        if (!(await bcrypt.compare(pass, user.password)))
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: ' invalid password',
            }, common_1.HttpStatus.BAD_REQUEST);
        const { password, ...result } = user;
        return result;
    }
    async signUp(authCredentialsDto) {
        const user = await this.findOne(authCredentialsDto.username);
        if (user)
            throw new common_1.ConflictException(' user already exist');
        const saltOrRounds = 10;
        const password = authCredentialsDto.password;
        const hashed = await bcrypt.hash(password, saltOrRounds);
        const result = await this.userRepository.create({ ...authCredentialsDto, password: hashed });
        try {
            return await this.userRepository.save(result);
        }
        catch (error) {
            throw new custom_exception_1.CustomException('An error occurred during processing', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findUserById(id) {
        const user = await this.userRepository.findOne({ where: { id: id } });
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Connection,
        axios_1.HttpService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map