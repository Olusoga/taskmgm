"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const task_module_1 = require("./task.module");
const dotenv = require("dotenv");
async function bootstrap() {
    dotenv.config();
    const app = await core_1.NestFactory.create(task_module_1.TaskModule);
    await app.listen(8080);
}
bootstrap();
//# sourceMappingURL=main.js.map