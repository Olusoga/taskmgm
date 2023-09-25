"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const auth_module_1 = require("./auth.module");
const dotenv = require("dotenv");
async function bootstrap() {
    dotenv.config();
    const app = await core_1.NestFactory.create(auth_module_1.AuthModule);
    await app.listen(9090);
}
bootstrap();
//# sourceMappingURL=main.js.map