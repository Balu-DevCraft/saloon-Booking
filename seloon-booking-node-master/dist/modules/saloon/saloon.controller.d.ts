import { SaloonService } from './saloon.service';
import { AddSaloonEmployeeDto, CreateSaloonDto, PaginationDto } from './dto/create-saloon.dto';
import { CreateBookSaloonDto } from './dto/book-saloon.dto';
import { CreateReviewDto } from './dto/review.dto';
export declare class SaloonController {
    private readonly saloonService;
    constructor(saloonService: SaloonService);
    createSaloon(createSaloonDto: CreateSaloonDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../../schemas/saloon.schema").Saloon, {}> & import("../../schemas/saloon.schema").Saloon & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    getAllSaloons(paginationDto: PaginationDto): Promise<{
        message: string;
        data: (import("mongoose").FlattenMaps<import("../../schemas/saloon.schema").Saloon> & Required<{
            _id: import("mongoose").FlattenMaps<unknown>;
        }> & {
            __v: number;
        })[];
    }>;
    getSaloonsByLocation(city: string, place: string, latitude: string, longitude: string): Promise<{
        message: string;
        data: (import("mongoose").FlattenMaps<import("../../schemas/saloon.schema").Saloon> & Required<{
            _id: import("mongoose").FlattenMaps<unknown>;
        }> & {
            __v: number;
        })[];
    }>;
    getSalonById(id: string): Promise<{
        message: string;
        data: import("mongoose").FlattenMaps<import("../../schemas/saloon.schema").Saloon> & Required<{
            _id: import("mongoose").FlattenMaps<unknown>;
        }> & {
            __v: number;
        };
    }>;
    addSaloonEmployee(req: any, addSaloonEmployeeDto: AddSaloonEmployeeDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas/user.schema").User, {}> & import("../../schemas/user.schema").User & Required<{
            _id: string;
        }> & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, import("../../schemas/user.schema").User, {}> & import("../../schemas/user.schema").User & Required<{
            _id: string;
        }> & {
            __v: number;
        };
    }>;
    getSaloonEmployees(req: any, paginationDto: PaginationDto): Promise<{
        message: string;
        data: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("../../schemas/user.schema").User, {}> & import("../../schemas/user.schema").User & Required<{
            _id: string;
        }> & {
            __v: number;
        }> & Required<{
            _id: string;
        }>)[];
    }>;
    bookSaloon(req: any, body: CreateBookSaloonDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../../schemas/booking.schema").Booking, {}> & import("../../schemas/booking.schema").Booking & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    getMyBookings(req: any, paginationDto: PaginationDto): Promise<{
        message: string;
        data: (import("mongoose").FlattenMaps<import("../../schemas/booking.schema").Booking> & Required<{
            _id: import("mongoose").FlattenMaps<unknown>;
        }> & {
            __v: number;
        })[];
    }>;
    getMyBookingsByEmployee(req: any, paginationDto: PaginationDto): Promise<{
        message: string;
        data: (import("mongoose").FlattenMaps<import("../../schemas/booking.schema").Booking> & Required<{
            _id: import("mongoose").FlattenMaps<unknown>;
        }> & {
            __v: number;
        })[];
    }>;
    updateBookingStatus(req: any, body: {
        status: string;
    }): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../../schemas/booking.schema").Booking, {}> & import("../../schemas/booking.schema").Booking & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    deleteSaloon(req: any, saloonId: string): Promise<{
        message: string;
    }>;
    deleteEmployee(req: any, employeeId: string): Promise<{
        message: string;
    }>;
    addReview(req: any, createReviewDto: CreateReviewDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../../schemas/review.schema").Review, {}> & import("../../schemas/review.schema").Review & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    getReview(req: any, bookingId: string): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("../../schemas/review.schema").Review, {}> & import("../../schemas/review.schema").Review & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }) | null;
    }>;
    getSalonReviews(req: any, salonId: string): Promise<{
        message: string;
        data: {
            customerName: any;
            stylistName: any;
            userId: import("mongoose").Types.ObjectId;
            saloonId: import("mongoose").Types.ObjectId;
            stylistId: import("mongoose").Types.ObjectId;
            bookingId: import("mongoose").Types.ObjectId;
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
    getStylistReviews(req: any, stylistId: string): Promise<{
        message: string;
        data: {
            customerName: any;
            service: any;
            bookingDate: any;
            userId: import("mongoose").Types.ObjectId;
            saloonId: import("mongoose").Types.ObjectId;
            stylistId: import("mongoose").Types.ObjectId;
            bookingId: import("mongoose").Types.ObjectId;
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
