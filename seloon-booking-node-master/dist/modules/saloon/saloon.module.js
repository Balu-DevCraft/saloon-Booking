"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaloonModule = void 0;
const common_1 = require("@nestjs/common");
const saloon_service_1 = require("./saloon.service");
const saloon_controller_1 = require("./saloon.controller");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../../schemas/user.schema");
const saloon_schema_1 = require("../../schemas/saloon.schema");
const booking_schema_1 = require("../../schemas/booking.schema");
const review_schema_1 = require("../../schemas/review.schema");
let SaloonModule = class SaloonModule {
};
exports.SaloonModule = SaloonModule;
exports.SaloonModule = SaloonModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: saloon_schema_1.Saloon.name, schema: saloon_schema_1.SaloonSchema },
                { name: booking_schema_1.Booking.name, schema: booking_schema_1.BookingSchema },
                { name: review_schema_1.Review.name, schema: review_schema_1.ReviewSchema }
            ]),
        ],
        controllers: [saloon_controller_1.SaloonController],
        providers: [saloon_service_1.SaloonService],
    })
], SaloonModule);
//# sourceMappingURL=saloon.module.js.map