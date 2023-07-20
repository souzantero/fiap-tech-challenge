"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const prisma_database_1 = require("./databases/prisma/prisma-database");
const environment_1 = require("./configuration/environment");
const app = app_1.App.create(new prisma_database_1.PrismaDatabase());
if (environment_1.environment.name === 'development') {
    app.swagger();
}
app.start(environment_1.environment.port);
//# sourceMappingURL=server.js.map