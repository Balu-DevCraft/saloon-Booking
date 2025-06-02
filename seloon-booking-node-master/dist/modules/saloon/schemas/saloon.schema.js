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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaloonSchema = exports.Saloon = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Saloon = class Saloon extends mongoose_2.Document {
    name;
    ownerName;
    email;
    city;
    place;
    status;
    employees;
    services;
    openingTime;
    closingTime;
    ratings;
    averageRating;
};
exports.Saloon = Saloon;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Saloon.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Saloon.prototype, "ownerName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, trim: true, lowercase: true }),
    __metadata("design:type", String)
], Saloon.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Saloon.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Saloon.prototype, "place", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }),
    __metadata("design:type", String)
], Saloon.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'User' }] }),
    __metadata("design:type", Array)
], Saloon.prototype, "employees", void 0);
__decorate([
    (0, mongoose_1.Prop)([{
            name: { type: String, required: true },
            price: { type: Number, required: true },
            duration: { type: Number, required: true },
            description: { type: String }
        }]),
    __metadata("design:type", Array)
], Saloon.prototype, "services", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: '09:00' }),
    __metadata("design:type", String)
], Saloon.prototype, "openingTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: '18:00' }),
    __metadata("design:type", String)
], Saloon.prototype, "closingTime", void 0);
__decorate([
    (0, mongoose_1.Prop)([{
            userId: { type: mongoose_2.Schema.Types.ObjectId, ref: 'User' },
            rating: Number,
            review: String,
            date: { type: Date, default: Date.now }
        }]),
    __metadata("design:type", Array)
], Saloon.prototype, "ratings", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Saloon.prototype, "averageRating", void 0);
exports.Saloon = Saloon = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Saloon);
exports.SaloonSchema = mongoose_1.SchemaFactory.createForClass(Saloon);
//# sourceMappingURL=saloon.schema.js.map