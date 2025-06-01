import { Saloon } from 'src/schemas/saloon.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model, Types } from 'mongoose';
import { AddSaloonEmployeeDto, CreateSaloonDto, PaginationDto } from './dto/create-saloon.dto';
import { CreateBookSaloonDto } from './dto/book-saloon.dto';
import { Booking } from 'src/schemas/booking.schema';
import { Review } from 'src/schemas/review.schema';
import { CreateReviewDto } from './dto/review.dto';
export declare class SaloonService {
    private userModel;
    private saloonModel;
    private bookingModel;
    private reviewModel;
    constructor(userModel: Model<UserDocument>, saloonModel: Model<Saloon>, bookingModel: Model<Booking>, reviewModel: Model<Review>);
    createSaloon(createSaloonDto: CreateSaloonDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, Saloon, {}> & Saloon & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    getAllSaloons(paginationDto: PaginationDto): Promise<{
        message: string;
        data: (import("mongoose").FlattenMaps<Saloon> & Required<{
            _id: import("mongoose").FlattenMaps<unknown>;
        }> & {
            __v: number;
        })[];
    }>;
    getSaloonsByLocation(city?: string, place?: string, latitude?: string, longitude?: string): Promise<{
        message: string;
        data: (import("mongoose").FlattenMaps<Saloon> & Required<{
            _id: import("mongoose").FlattenMaps<unknown>;
        }> & {
            __v: number;
        })[];
    }>;
    getSalonById(id: string): Promise<{
        message: string;
        data: import("mongoose").FlattenMaps<Saloon> & Required<{
            _id: import("mongoose").FlattenMaps<unknown>;
        }> & {
            __v: number;
        };
    }>;
    addSaloonEmployee(userId: string, addSaloonEmployeeDto: AddSaloonEmployeeDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
            _id: string;
        }> & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
            _id: string;
        }> & {
            __v: number;
        };
    }>;
    getAllEmployees(userId: string, paginationDto: PaginationDto): Promise<{
        message: string;
        data: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
            _id: string;
        }> & {
            __v: number;
        }> & Required<{
            _id: string;
        }>)[];
    }>;
    bookSaloon(userId: string, createBookSaloonDto: CreateBookSaloonDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, Booking, {}> & Booking & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    getMyBookings(userId: string, paginationDto: PaginationDto): Promise<{
        message: string;
        data: (import("mongoose").FlattenMaps<Booking> & Required<{
            _id: import("mongoose").FlattenMaps<unknown>;
        }> & {
            __v: number;
        })[];
    }>;
    getMyBookingsByEmployee(userId: string, paginationDto: PaginationDto): Promise<{
        message: string;
        data: (import("mongoose").FlattenMaps<Booking> & Required<{
            _id: import("mongoose").FlattenMaps<unknown>;
        }> & {
            __v: number;
        })[];
    }>;
    updateBookingStatus(userId: string, bookingId: string, status: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, Booking, {}> & Booking & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    deleteSaloon(saloonId: string): Promise<{
        message: string;
    }>;
    deleteEmployee(employeeId: string): Promise<{
        message: string;
    }>;
    addReview(userId: string, createReviewDto: CreateReviewDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, Review, {}> & Review & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    getReview(userId: string, bookingId: string): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, Review, {}> & Review & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }) | null;
    }>;
    getSalonReviews(salonId: string): Promise<{
        message: string;
        data: {
            customerName: any;
            stylistName: any;
            userId: Types.ObjectId;
            saloonId: Types.ObjectId;
            stylistId: Types.ObjectId;
            bookingId: Types.ObjectId;
            rating: number;
            comment: string;
            stylistRating: number;
            stylistComment: string;
            createdAt: Date;
            updatedAt: Date;
            _id: unknown;
            $locals: Record<string, unknown>;
            $op: "save" | "validate" | "remove" | null;
            $where: Record<string, unknown>;
            baseModelName?: string;
            collection: import("mongoose").Collection;
            db: import("mongoose").Connection;
            errors?: import("mongoose").Error.ValidationError;
            id?: any;
            isNew: boolean;
            schema: import("mongoose").Schema;
            __v: number;
        }[];
    }>;
    getStylistReviews(stylistId: string): Promise<{
        message: string;
        data: {
            customerName: any;
            service: any;
            bookingDate: any;
            userId: Types.ObjectId;
            saloonId: Types.ObjectId;
            stylistId: Types.ObjectId;
            bookingId: Types.ObjectId;
            rating: number;
            comment: string;
            stylistRating: number;
            stylistComment: string;
            createdAt: Date;
            updatedAt: Date;
            _id: unknown;
            $locals: Record<string, unknown>;
            $op: "save" | "validate" | "remove" | null;
            $where: Record<string, unknown>;
            baseModelName?: string;
            collection: import("mongoose").Collection;
            db: import("mongoose").Connection;
            errors?: import("mongoose").Error.ValidationError;
            id?: any;
            isNew: boolean;
            schema: import("mongoose").Schema;
            __v: number;
        }[];
    }>;
}
