"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithRoles = void 0;
const common_1 = require("@nestjs/common");
const WithRoles = (...roles) => (0, common_1.SetMetadata)('roles', roles);
exports.WithRoles = WithRoles;
//# sourceMappingURL=role.decorator.js.map