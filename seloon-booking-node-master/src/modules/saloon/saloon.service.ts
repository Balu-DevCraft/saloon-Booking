import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Saloon } from 'src/schemas/saloon.schema';
import { User, UserDocument, UserType } from 'src/schemas/user.schema';
import { Model, Types } from 'mongoose';
import { AddSaloonEmployeeDto, CreateSaloonDto, PaginationDto } from './dto/create-saloon.dto';
import { CreateBookSaloonDto } from './dto/book-saloon.dto';
import { Booking } from 'src/schemas/booking.schema';
import { Review } from 'src/schemas/review.schema';
import { CreateReviewDto } from './dto/review.dto';

@Injectable()
export class SaloonService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Saloon.name) private saloonModel: Model<Saloon>,
        @InjectModel(Booking.name) private bookingModel: Model<Booking>,
        @InjectModel(Review.name) private reviewModel: Model<Review>
    ) { }

    //create a saloon

    async createSaloon(createSaloonDto: CreateSaloonDto) {
        try {
            const { name, city, place, latitude, longitude, email, password } = createSaloonDto;

            // Check if the owner exists
            const ownerExists = await this.userModel.findOne({ email })
            if (ownerExists) throw new BadRequestException('Owner with this email already exists');
            // Create the owner
            const newOwner: any = await this.userModel.create({
                name,
                email,
                password,
                userType: UserType.ADMIN
            });

            // Create the saloon
            const newSaloon = await this.saloonModel.create({
                name,
                city,
                place,
                latitude,
                longitude,
                owner: newOwner._id, // Assign the newly created owner's ID
                isActive: true
            });
            newOwner.saloonId = newSaloon._id; // Assign the saloon ID to the owner
            await newOwner.save(); // Save the updated owner

            return {
                message: 'Saloon created successfully',
                data: newSaloon
            }

        } catch (error) {
            throw new Error(error);
        }
    }

    //get all saloons
    async getAllSaloons(paginationDto: PaginationDto) {
        try {
            const { page = 1, limit = 100, isActive, search } = paginationDto;
            const skip = (page - 1) * limit;
            const filter = {};
            if (search) {
                filter['name'] = { $regex: search, $options: 'i' }; // Case-insensitive search
                filter['city'] = { $regex: search, $options: 'i' }; // Case-insensitive search
                filter['place'] = { $regex: search, $options: 'i' }; // Case-insensitive search
            }
            if (isActive !== undefined) {
                filter['isActive'] = isActive; // Filter by isActive status
            }


            const saloons = await this.saloonModel.find(filter).populate('owner', 'name email')
                .skip(skip)
                .limit(limit)
                .lean();
            return {
                message: 'Saloons fetched successfully',
                data: saloons
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async getSaloonsByLocation(city?: string, place?: string, latitude?: string, longitude?: string) {
        try {
            const filter: any = { isActive: true };
            
            if (city) {
                filter.city = { $regex: new RegExp(city, 'i') };
            }
            
            if (place) {
                filter.place = { $regex: new RegExp(place, 'i') };
            }

            // If we have both latitude and longitude, we can find nearby saloons
            if (latitude && longitude) {
                const maxDistanceInKm = 10; // Search within 10km radius
                const earthRadiusKm = 6371;

                // Convert latitude and longitude to numbers
                const lat = parseFloat(latitude);
                const lon = parseFloat(longitude);

                // Find saloons within the radius
                const saloons = await this.saloonModel.find({
                    ...filter,
                    latitude: { $exists: true },
                    longitude: { $exists: true }
                }).lean();

                // Calculate distance for each saloon and filter
                const saloonsWithDistance = saloons
                    .map(saloon => {
                        const saloonLat = parseFloat(saloon.latitude);
                        const saloonLon = parseFloat(saloon.longitude);
                        
                        // Haversine formula to calculate distance
                        const dLat = (saloonLat - lat) * Math.PI / 180;
                        const dLon = (saloonLon - lon) * Math.PI / 180;
                        const a = 
                            Math.sin(dLat/2) * Math.sin(dLat/2) +
                            Math.cos(lat * Math.PI / 180) * Math.cos(saloonLat * Math.PI / 180) * 
                            Math.sin(dLon/2) * Math.sin(dLon/2);
                        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
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

            // If no coordinates provided, just search by city/place
            const saloons = await this.saloonModel.find(filter)
                .populate('owner', 'name email')
                .lean();

            return {
                message: 'Saloons fetched successfully',
                data: saloons
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    async getSalonById(id: string) {
        try {
            const salon = await this.saloonModel.findById(id)
                .populate('owner', 'name email')
                .lean();

            if (!salon) {
                throw new BadRequestException('Salon not found');
            }

            return {
                message: 'Salon fetched successfully',
                data: salon
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    async addSaloonEmployee(userId: string, addSaloonEmployeeDto: AddSaloonEmployeeDto) {
        try {
            const user: any = await this.userModel.findById(userId);
            if (!user) throw new BadRequestException('User not found');
            if (!user.isActive) throw new BadRequestException('User is not active');
            // Create the new employee
            const newEmployee = await this.userModel.create({
                ...addSaloonEmployeeDto,
                userType: UserType.EMPLOYEE,
                saloonId: new Types.ObjectId(user.saloonId), // Assign the saloon ID from the user
                isActive: true

            });

            return {
                message: 'Employee added successfully',
                data: newEmployee
            };
        } catch (error) {
            throw new Error(error);

        }
    }

    async getAllEmployees(userId: string, paginationDto: PaginationDto) {
        try {
            const { page = 1, limit = 100 } = paginationDto;
            const user: any = await this.userModel.findById(userId);
            if (!user) throw new BadRequestException('User not found');
            if (!user.isActive) throw new BadRequestException('User is not active');
            const filter: any = {};
            filter['saloonId'] = user.saloonId;
            if (!user.saloonId) {
                filter['saloonId'] = paginationDto.saloonId;
            }
            if (paginationDto.isActive !== undefined) {
                filter['isActive'] = paginationDto.isActive; // Filter by isActive status
            }

            const skip = (page - 1) * limit;
            const employees = await this.userModel.find(filter)
                .skip(skip)
                .limit(limit)
                .lean();
            return {
                message: 'Employees fetched successfully',
                data: employees
            }

        } catch (error) {
            throw new Error(error);

        }
    }

    async bookSaloon(userId: string, createBookSaloonDto: CreateBookSaloonDto) {
        try {
            const user: any = await this.userModel.findById(userId);
            if (!user) throw new BadRequestException('User not found');
            if (!user.isActive) throw new BadRequestException('User is not active');
            if (createBookSaloonDto.saloonId) createBookSaloonDto.saloonId = new Types.ObjectId(createBookSaloonDto.saloonId);
            if (createBookSaloonDto.employeeId) createBookSaloonDto.employeeId = new Types.ObjectId(createBookSaloonDto.employeeId);

            const newBooking = await this.bookingModel.create({
                ...createBookSaloonDto,
                userId: user._id
            });

            return {
                message: 'Saloon booked successfully',
                data: newBooking
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    async getMyBookings(userId: string, paginationDto: PaginationDto) {
        try {
            const { page = 1, limit = 100 } = paginationDto;
            const user: any = await this.userModel.findById(userId);
            if (!user) throw new BadRequestException('User not found');
            if (!user.isActive) throw new BadRequestException('User is not active');

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
        } catch (error) {
            throw new Error(error);
        }
    }

    async getMyBookingsByEmployee(userId: string, paginationDto: PaginationDto) {
        const user: any = await this.userModel.findById(userId);
        if (!user) throw new BadRequestException('User not found');
        if (!user.isActive) throw new BadRequestException('User is not active');

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

    async updateBookingStatus(userId: string, bookingId: string, status: string) {
        const booking = await this.bookingModel.findById(bookingId);
        if (!booking) throw new BadRequestException('Booking not found');
        booking.bookingStatus = status;
        booking.updatedBy = new Types.ObjectId(userId);

        await booking.save();
        return {
            message: 'Booking status updated successfully',
            data: booking
        };
    }

    async deleteSaloon(saloonId: string) {
        const saloon = await this.saloonModel.findById(saloonId);
        if (!saloon) throw new BadRequestException('Saloon not found');

        await this.saloonModel.deleteOne({ _id: saloonId });
        await this.userModel.deleteMany({ saloonId: saloonId }); // Delete all employees associated with the saloon

        return {
            message: 'Saloon deleted successfully',
        };
    }

    async deleteEmployee(employeeId: string) {
        const employee = await this.userModel.findById(employeeId);
        if (!employee) throw new BadRequestException('Employee not found');
        if (employee.userType !== UserType.EMPLOYEE) throw new BadRequestException('User is not an employee');

        await this.userModel.deleteOne({ _id: employeeId });
        return {
            message: 'Employee deleted successfully',
        };
    }

    async addReview(userId: string, createReviewDto: CreateReviewDto) {
        try {
            // Check if booking exists and belongs to user
            const booking = await this.bookingModel.findOne({
                _id: new Types.ObjectId(createReviewDto.bookingId),
                userId: new Types.ObjectId(userId)
            });

            if (!booking) {
                throw new BadRequestException('Booking not found or does not belong to user');
            }

            // Check if review already exists
            const existingReview = await this.reviewModel.findOne({
                bookingId: new Types.ObjectId(createReviewDto.bookingId)
            });

            if (existingReview) {
                throw new BadRequestException('Review already exists for this booking');
            }

            // Create review
            const review = await this.reviewModel.create({
                ...createReviewDto,
                userId: new Types.ObjectId(userId),
                bookingId: new Types.ObjectId(createReviewDto.bookingId),
                saloonId: new Types.ObjectId(createReviewDto.saloonId),
                stylistId: new Types.ObjectId(createReviewDto.stylistId)
            });

            return {
                message: 'Review added successfully',
                data: review
            };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async getReview(userId: string, bookingId: string) {
        try {
            const review = await this.reviewModel.findOne({
                bookingId: new Types.ObjectId(bookingId),
                userId: new Types.ObjectId(userId)
            });

            return {
                message: 'Review fetched successfully',
                data: review
            };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async getSalonReviews(salonId: string) {
        try {
            const reviews = await this.reviewModel.find({
                saloonId: new Types.ObjectId(salonId)
            })
            .populate('userId', 'name')
            .populate('stylistId', 'name')
            .sort({ createdAt: -1 });

            // Transform reviews to include customerName and stylistName
            const transformedReviews = reviews.map(review => ({
                ...review.toObject(),
                customerName: review.userId['name'],
                stylistName: review.stylistId['name']
            }));

            return {
                message: 'Reviews fetched successfully',
                data: transformedReviews
            };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async getStylistReviews(stylistId: string) {
        try {
            const reviews = await this.reviewModel.find({
                stylistId: new Types.ObjectId(stylistId)
            })
            .populate('userId', 'name email phoneNumber')
            .populate('bookingId', 'service bookingDate')
            .sort({ createdAt: -1 });

            // Transform reviews to include customer info and booking details
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
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
