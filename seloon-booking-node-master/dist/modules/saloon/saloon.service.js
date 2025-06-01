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
exports.SaloonService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const saloon_schema_1 = require("../../schemas/saloon.schema");
const user_schema_1 = require("../../schemas/user.schema");
const mongoose_2 = require("mongoose");
const booking_schema_1 = require("../../schemas/booking.schema");
const review_schema_1 = require("../../schemas/review.schema");
let SaloonService = class SaloonService {
    userModel;
    saloonModel;
    bookingModel;
    reviewModel;
    constructor(userModel, saloonModel, bookingModel, reviewModel) {
        this.userModel = userModel;
        this.saloonModel = saloonModel;
        this.bookingModel = bookingModel;
        this.reviewModel = reviewModel;
    }
    async createSaloon(createSaloonDto) {
        try {
            const { name, city, place, latitude, longitude, email, password } = createSaloonDto;
            const ownerExists = await this.userModel.findOne({ email });
            if (ownerExists)
                throw new common_1.BadRequestException('Owner with this email already exists');
            const newOwner = await this.userModel.create({
                name,
                email,
                password,
                userType: user_schema_1.UserType.ADMIN
            });
            const newSaloon = await this.saloonModel.create({
                name,
                city,
                place,
                latitude,
                longitude,
                owner: newOwner._id,
                isActive: true
            });
            newOwner.saloonId = newSaloon._id;
            await newOwner.save();
            return {
                message: 'Saloon created successfully',
                data: newSaloon
            };
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getAllSaloons(paginationDto) {
        try {
            const { page = 1, limit = 100, isActive, search } = paginationDto;
            const skip = (page - 1) * limit;
            const filter = {};
            if (search) {
                filter['name'] = { $regex: search, $options: 'i' };
                filter['city'] = { $regex: search, $options: 'i' };
                filter['place'] = { $regex: search, $options: 'i' };
            }
            if (isActive !== undefined) {
                filter['isActive'] = isActive;
            }
            const saloons = await this.saloonModel.find(filter).populate('owner', 'name email')
                .skip(skip)
                .limit(limit)
                .lean();
            return {
                message: 'Saloons fetched successfully',
                data: saloons
            };
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getSaloonsByLocation(city, place, latitude, longitude) {
        try {
            const filter = { isActive: true };
            if (city) {
                filter.city = { $regex: new RegExp(city, 'i') };
            }
            if (place) {
                filter.place = { $regex: new RegExp(place, 'i') };
            }
            if (latitude && longitude) {
                const maxDistanceInKm = 10;
                const earthRadiusKm = 6371;
                const lat = parseFloat(latitude);
                const lon = parseFloat(longitude);
                const saloons = await this.saloonModel.find({
                    ...filter,
                    latitude: { $exists: true },
                    longitude: { $exists: true }
                }).lean();
                const saloonsWithDistance = saloons
                    .map(saloon => {
                    const saloonLat = parseFloat(saloon.latitude);
                    const saloonLon = parseFloat(saloon.longitude);
                    const dLat = (saloonLat - lat) * Math.PI / 180;
                    const dLon = (saloonLon - lon) * Math.PI / 180;
                    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(lat * Math.PI / 180) * Math.cos(saloonLat * Math.PI / 180) *
                            Math.sin(dLon / 2) * Math.sin(dLon / 2);
                    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    const distance = earthRadiusKm * c;
                    return { ...saloon, distance };
                })
                    .filter(saloon => saloon.distance <= maxDistanceInKm)
                    .sort((a, b) => a.distance - b.distance);
                return {
                    message: 'Saloons fetched successfully',
                    data: saloonsWithDistance
                };
            }
            const saloons = await this.saloonModel.find(filter)
                .populate('owner', 'name email')
                .lean();
            return {
                message: 'Saloons fetched successfully',
                data: saloons
            };
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getSalonById(id) {
        try {
            const salon = await this.saloonModel.findById(id)
                .populate('owner', 'name email')
                .lean();
            if (!salon) {
                throw new common_1.BadRequestException('Salon not found');
            }
            return {
                message: 'Salon fetched successfully',
                data: salon
            };
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async addSaloonEmployee(userId, addSaloonEmployeeDto) {
        try {
            const user = await this.userModel.findById(userId);
            if (!user)
                throw new common_1.BadRequestException('User not found');
            if (!user.isActive)
                throw new common_1.BadRequestException('User is not active');
            const newEmployee = await this.userModel.create({
                ...addSaloonEmployeeDto,
                userType: user_schema_1.UserType.EMPLOYEE,
                saloonId: new mongoose_2.Types.ObjectId(user.saloonId),
                isActive: true
            });
            return {
                message: 'Employee added successfully',
                data: newEmployee
            };
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getAllEmployees(userId, paginationDto) {
        try {
            const { page = 1, limit = 100 } = paginationDto;
            const user = await this.userModel.findById(userId);
            if (!user)
                throw new common_1.BadRequestException('User not found');
            if (!user.isActive)
                throw new common_1.BadRequestException('User is not active');
            const filter = {};
            filter['saloonId'] = user.saloonId;
            if (!user.saloonId) {
                filter['saloonId'] = paginationDto.saloonId;
            }
            if (paginationDto.isActive !== undefined) {
                filter['isActive'] = paginationDto.isActive;
            }
            const skip = (page - 1) * limit;
            const employees = await this.userModel.find(filter)
                .skip(skip)
                .limit(limit)
                .lean();
            return {
                message: 'Employees fetched successfully',
                data: employees
            };
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async bookSaloon(userId, createBookSaloonDto) {
        try {
            const user = await this.userModel.findById(userId);
            if (!user)
                throw new common_1.BadRequestException('User not found');
            if (!user.isActive)
                throw new common_1.BadRequestException('User is not active');
            if (createBookSaloonDto.saloonId)
                createBookSaloonDto.saloonId = new mongoose_2.Types.ObjectId(createBookSaloonDto.saloonId);
            if (createBookSaloonDto.employeeId)
                createBookSaloonDto.employeeId = new mongoose_2.Types.ObjectId(createBookSaloonDto.employeeId);
            const newBooking = await this.bookingModel.create({
                ...createBookSaloonDto,
                userId: user._id
            });
            return {
                message: 'Saloon booked successfully',
                data: newBooking
            };
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getMyBookings(userId, paginationDto) {
        try {
            const { page = 1, limit = 100 } = paginationDto;
            const user = await this.userModel.findById(userId);
            if (!user)
                throw new common_1.BadRequestException('User not found');
            if (!user.isActive)
                throw new common_1.BadRequestException('User is not active');
            const skip = (page - 1) * limit;
            const bookings = await this.bookingModel.find({ userId: user._id })
                .populate('saloonId', 'name city place')
                .populate('employeeId', 'name')
                .skip(skip)
                .limit(limit)
                .lean();
            return {
                message: 'Booked saloons fetched successfully',
                data: bookings
            };
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getMyBookingsByEmployee(userId, paginationDto) {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new common_1.BadRequestException('User not found');
        if (!user.isActive)
            throw new common_1.BadRequestException('User is not active');
        const { page = 1, limit = 100 } = paginationDto;
        const skip = (page - 1) * limit;
        const bookings = await this.bookingModel.find({ employeeId: user._id })
            .populate('saloonId', 'name city place')
            .populate('userId', 'name email')
            .skip(skip)
            .limit(limit)
            .lean();
        return {
            message: 'Booked saloons fetched successfully',
            data: bookings
        };
    }
    async updateBookingStatus(userId, bookingId, status) {
        const booking = await this.bookingModel.findById(bookingId);
        if (!booking)
            throw new common_1.BadRequestException('Booking not found');
        booking.bookingStatus = status;
        booking.updatedBy = new mongoose_2.Types.ObjectId(userId);
        await booking.save();
        return {
            message: 'Booking status updated successfully',
            data: booking
        };
    }
    async deleteSaloon(saloonId) {
        const saloon = await this.saloonModel.findById(saloonId);
        if (!saloon)
            throw new common_1.BadRequestException('Saloon not found');
        await this.saloonModel.deleteOne({ _id: saloonId });
        await this.userModel.deleteMany({ saloonId: saloonId });
        return {
            message: 'Saloon deleted successfully',
        };
    }
    async deleteEmployee(employeeId) {
        const employee = await this.userModel.findById(employeeId);
        if (!employee)
            throw new common_1.BadRequestException('Employee not found');
        if (employee.userType !== user_schema_1.UserType.EMPLOYEE)
            throw new common_1.BadRequestException('User is not an employee');
        await this.userModel.deleteOne({ _id: employeeId });
        return {
            message: 'Employee deleted successfully',
        };
    }
    async addReview(userId, createReviewDto) {
        try {
            const booking = await this.bookingModel.findOne({
                _id: new mongoose_2.Types.ObjectId(createReviewDto.bookingId),
                userId: new mongoose_2.Types.ObjectId(userId)
            });
            if (!booking) {
                throw new common_1.BadRequestException('Booking not found or does not belong to user');
            }
            const existingReview = await this.reviewModel.findOne({
                bookingId: new mongoose_2.Types.ObjectId(createReviewDto.bookingId)
            });
            if (existingReview) {
                throw new common_1.BadRequestException('Review already exists for this booking');
            }
            const review = await this.reviewModel.create({
                ...createReviewDto,
                userId: new mongoose_2.Types.ObjectId(userId),
                bookingId: new mongoose_2.Types.ObjectId(createReviewDto.bookingId),
                saloonId: new mongoose_2.Types.ObjectId(createReviewDto.saloonId),
                stylistId: new mongoose_2.Types.ObjectId(createReviewDto.stylistId)
            });
            return {
                message: 'Review added successfully',
                data: review
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getReview(userId, bookingId) {
        try {
            const review = await this.reviewModel.findOne({
                bookingId: new mongoose_2.Types.ObjectId(bookingId),
                userId: new mongoose_2.Types.ObjectId(userId)
            });
            return {
                message: 'Review fetched successfully',
                data: review
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getSalonReviews(salonId) {
        try {
            const reviews = await this.reviewModel.find({
                saloonId: new mongoose_2.Types.ObjectId(salonId)
            })
                .populate('userId', 'name')
                .populate('stylistId', 'name')
                .sort({ createdAt: -1 });
            const transformedReviews = reviews.map(review => ({
                ...review.toObject(),
                customerName: review.userId['name'],
                stylistName: review.stylistId['name']
            }));
            return {
                message: 'Reviews fetched successfully',
                data: transformedReviews
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getStylistReviews(stylistId) {
        try {
            const reviews = await this.reviewModel.find({
                stylistId: new mongoose_2.Types.ObjectId(stylistId)
            })
                .populate('userId', 'name email phoneNumber')
                .populate('bookingId', 'service bookingDate')
                .sort({ createdAt: -1 });
            const transformedReviews = reviews.map(review => ({
                ...review.toObject(),
                customerName: review.userId['name'],
                service: review.bookingId['service'],
                bookingDate: review.bookingId['bookingDate']
            }));
            return {
                message: 'Reviews fetched successfully',
                data: transformedReviews
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.SaloonService = SaloonService;
exports.SaloonService = SaloonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(saloon_schema_1.Saloon.name)),
    __param(2, (0, mongoose_1.InjectModel)(booking_schema_1.Booking.name)),
    __param(3, (0, mongoose_1.InjectModel)(review_schema_1.Review.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], SaloonService);
//# sourceMappingURL=saloon.service.js.map