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
exports.CreateReviewDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateReviewDto {
    bookingId;
    stylistId;
    saloonId;
    rating;
    comment;
    stylistRating;
    stylistComment;
    static _OPENAPI_METADATA_FACTORY() {
        return { bookingId: { required: true, type: () => String, pattern: "/^[0-9a-fA-F]{24}$/" }, stylistId: { required: true, type: () => String, pattern: "/^[0-9a-fA-F]{24}$/" }, saloonId: { required: true, type: () => String, pattern: "/^[0-9a-fA-F]{24}$/" }, rating: { required: true, type: () => Number, minimum: 1, maximum: 5 }, comment: { required: true, type: () => String }, stylistRating: { required: true, type: () => Number, minimum: 1, maximum: 5 }, stylistComment: { required: true, type: () => String } };
    }
}
exports.CreateReviewDto = CreateReviewDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[0-9a-fA-F]{24}$/, {
        message: 'bookingId must be a valid MongoDB ObjectId'
    }),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "bookingId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[0-9a-fA-F]{24}$/, {
        message: 'stylistId must be a valid MongoDB ObjectId'
    }),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "stylistId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[0-9a-fA-F]{24}$/, {
        message: 'saloonId must be a valid MongoDB ObjectId'
    }),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "saloonId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateReviewDto.prototype, "rating", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "comment", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateReviewDto.prototype, "stylistRating", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "stylistComment", void 0);
//# sourceMappingURL=review.dto.js.map