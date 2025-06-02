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
        data: import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
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
        pagination: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
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
            customerName: string;
            stylistName: string;
            createdAt: Date;
            updatedAt: Date;
            _id: unknown;
            $assertPopulated: <Paths = {}>(path: string | string[], values?: Partial<Paths> | undefined) => Omit<Review, keyof Paths> & Paths;
            $clearModifiedPaths: () => Review;
            $clone: () => Review;
            $createModifiedPathsSnapshot: () => import("mongoose").ModifiedPathsSnapshot;
            $getAllSubdocs: () => import("mongoose").Document[];
            $ignore: (path: string) => void;
            $isDefault: (path: string) => boolean;
            $isDeleted: (val?: boolean) => boolean;
            $getPopulatedDocs: () => import("mongoose").Document[];
            $inc: (path: string | string[], val?: number) => Review;
            $isEmpty: (path: string) => boolean;
            $isValid: (path: string) => boolean;
            $locals: Record<string, unknown>;
            $markValid: (path: string) => void;
            $model: {
                <ModelType = Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown, {}> & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }, any>>(name: string): ModelType;
                <ModelType = Model<any, {}, {}, {}, any, any>>(): ModelType;
            };
            $op: "save" | "validate" | "remove" | null;
            $restoreModifiedPathsSnapshot: (snapshot: import("mongoose").ModifiedPathsSnapshot) => Review;
            $session: (session?: import("mongoose").ClientSession | null) => import("mongoose").ClientSession | null;
            $set: {
                (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): Review;
                (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): Review;
                (value: string | Record<string, any>): Review;
            };
            $where: Record<string, unknown>;
            baseModelName?: string | undefined;
            collection: import("mongoose").Collection;
            db: import("mongoose").Connection;
            deleteOne: (options?: import("mongoose").QueryOptions) => any;
            depopulate: <Paths = {}>(path?: string | string[]) => import("mongoose").MergeType<Review, Paths>;
            directModifiedPaths: () => Array<string>;
            equals: (doc: import("mongoose").Document<unknown, any, any, Record<string, any>>) => boolean;
            errors?: import("mongoose").Error.ValidationError | undefined;
            get: {
                <T extends string | number | symbol>(path: T, type?: any, options?: any): any;
                (path: string, type?: any, options?: any): any;
            };
            getChanges: () => import("mongoose").UpdateQuery<Review>;
            id?: any;
            increment: () => Review;
            init: (obj: import("mongoose").AnyObject, opts?: import("mongoose").AnyObject) => Review;
            invalidate: {
                <T extends string | number | symbol>(path: T, errorMsg: string | NativeError, value?: any, kind?: string): NativeError | null;
                (path: string, errorMsg: string | NativeError, value?: any, kind?: string): NativeError | null;
            };
            isDirectModified: {
                <T extends string | number | symbol>(path: T | T[]): boolean;
                (path: string | Array<string>): boolean;
            };
            isDirectSelected: {
                <T extends string | number | symbol>(path: T): boolean;
                (path: string): boolean;
            };
            isInit: {
                <T extends string | number | symbol>(path: T): boolean;
                (path: string): boolean;
            };
            isModified: {
                <T extends string | number | symbol>(path?: T | T[] | undefined, options?: {
                    ignoreAtomics?: boolean;
                } | null): boolean;
                (path?: string | Array<string>, options?: {
                    ignoreAtomics?: boolean;
                } | null): boolean;
            };
            isNew: boolean;
            isSelected: {
                <T extends string | number | symbol>(path: T): boolean;
                (path: string): boolean;
            };
            markModified: {
                <T extends string | number | symbol>(path: T, scope?: any): void;
                (path: string, scope?: any): void;
            };
            model: {
                <ModelType = Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown, {}> & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }, any>>(name: string): ModelType;
                <ModelType = Model<any, {}, {}, {}, any, any>>(): ModelType;
            };
            modifiedPaths: (options?: {
                includeChildren?: boolean;
            }) => Array<string>;
            overwrite: (obj: import("mongoose").AnyObject) => Review;
            $parent: () => import("mongoose").Document | undefined;
            populate: {
                <Paths = {}>(path: string | import("mongoose").PopulateOptions | (string | import("mongoose").PopulateOptions)[]): Promise<import("mongoose").MergeType<Review, Paths>>;
                <Paths = {}>(path: string, select?: string | import("mongoose").AnyObject, model?: Model<any>, match?: import("mongoose").AnyObject, options?: import("mongoose").PopulateOptions): Promise<import("mongoose").MergeType<Review, Paths>>;
            };
            populated: (path: string) => any;
            replaceOne: (replacement?: import("mongoose").AnyObject, options?: import("mongoose").QueryOptions | null) => import("mongoose").Query<any, Review, {}, unknown, "find", Record<string, never>>;
            save: (options?: import("mongoose").SaveOptions) => Promise<Review>;
            schema: import("mongoose").Schema;
            set: {
                <T extends string | number | symbol>(path: T, val: any, type: any, options?: import("mongoose").DocumentSetOptions): Review;
                (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): Review;
                (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): Review;
                (value: string | Record<string, any>): Review;
            };
            toJSON: {
                (options: import("mongoose").ToObjectOptions & {
                    virtuals: true;
                }): any;
                (options?: import("mongoose").ToObjectOptions & {
                    flattenMaps?: true;
                    flattenObjectIds?: false;
                }): import("mongoose").FlattenMaps<any>;
                (options: import("mongoose").ToObjectOptions & {
                    flattenObjectIds: false;
                }): import("mongoose").FlattenMaps<any>;
                (options: import("mongoose").ToObjectOptions & {
                    flattenObjectIds: true;
                }): {
                    [x: string]: any;
                };
                (options: import("mongoose").ToObjectOptions & {
                    flattenMaps: false;
                }): any;
                (options: import("mongoose").ToObjectOptions & {
                    flattenMaps: false;
                    flattenObjectIds: true;
                }): any;
                <T = any>(options?: import("mongoose").ToObjectOptions & {
                    flattenMaps?: true;
                    flattenObjectIds?: false;
                }): import("mongoose").FlattenMaps<T>;
                <T = any>(options: import("mongoose").ToObjectOptions & {
                    flattenObjectIds: false;
                }): import("mongoose").FlattenMaps<T>;
                <T = any>(options: import("mongoose").ToObjectOptions & {
                    flattenObjectIds: true;
                }): import("mongoose").ObjectIdToString<import("mongoose").FlattenMaps<T>>;
                <T = any>(options: import("mongoose").ToObjectOptions & {
                    flattenMaps: false;
                }): T;
                <T = any>(options: import("mongoose").ToObjectOptions & {
                    flattenMaps: false;
                    flattenObjectIds: true;
                }): import("mongoose").ObjectIdToString<T>;
            };
            toObject: {
                (options: import("mongoose").ToObjectOptions & {
                    virtuals: true;
                }): any;
                (options?: import("mongoose").ToObjectOptions): any;
                <T>(options?: import("mongoose").ToObjectOptions): import("mongoose").Default__v<import("mongoose").Require_id<T>>;
            };
            unmarkModified: {
                <T extends string | number | symbol>(path: T): void;
                (path: string): void;
            };
            updateOne: (update?: import("mongoose").UpdateWithAggregationPipeline | import("mongoose").UpdateQuery<Review> | undefined, options?: import("mongoose").QueryOptions | null) => import("mongoose").Query<any, Review, {}, unknown, "find", Record<string, never>>;
            validate: {
                <T extends string | number | symbol>(pathsToValidate?: T | T[] | undefined, options?: import("mongoose").AnyObject): Promise<void>;
                (pathsToValidate?: import("mongoose").pathsToValidate, options?: import("mongoose").AnyObject): Promise<void>;
                (options: {
                    pathsToSkip?: import("mongoose").pathsToSkip;
                }): Promise<void>;
            };
            validateSync: {
                (options: {
                    pathsToSkip?: import("mongoose").pathsToSkip;
                    [k: string]: any;
                }): import("mongoose").Error.ValidationError | null;
                <T extends string | number | symbol>(pathsToValidate?: T | T[] | undefined, options?: import("mongoose").AnyObject): import("mongoose").Error.ValidationError | null;
                (pathsToValidate?: import("mongoose").pathsToValidate, options?: import("mongoose").AnyObject): import("mongoose").Error.ValidationError | null;
            };
            comment: string;
            saloonId: Types.ObjectId;
            userId: {
                name: string;
            };
            bookingId: Types.ObjectId;
            rating: number;
            stylistRating: number;
            stylistComment: string;
            stylistId: {
                name: string;
            };
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
