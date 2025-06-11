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
        data: import("mongoose").Document<unknown, {}, import("../../schemas/user.schema").User, {}> & import("../../schemas/user.schema").User & Required<{
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
        pagination: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
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
            customerName: string;
            stylistName: string;
            _id: unknown;
            saloonId: import("mongoose").Types.ObjectId;
            id?: any;
            set: {
                <T extends string | number | symbol>(path: T, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("../../schemas/review.schema").Review;
                (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("../../schemas/review.schema").Review;
                (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): import("../../schemas/review.schema").Review;
                (value: string | Record<string, any>): import("../../schemas/review.schema").Review;
            };
            get: {
                <T extends string | number | symbol>(path: T, type?: any, options?: any): any;
                (path: string, type?: any, options?: any): any;
            };
            comment: string;
            $assertPopulated: <Paths = {}>(path: string | string[], values?: Partial<Paths> | undefined) => Omit<import("../../schemas/review.schema").Review, keyof Paths> & Paths;
            $clearModifiedPaths: () => import("../../schemas/review.schema").Review;
            $clone: () => import("../../schemas/review.schema").Review;
            $createModifiedPathsSnapshot: () => import("mongoose").ModifiedPathsSnapshot;
            $getAllSubdocs: () => import("mongoose").Document[];
            $ignore: (path: string) => void;
            $isDefault: (path: string) => boolean;
            $isDeleted: (val?: boolean) => boolean;
            $getPopulatedDocs: () => import("mongoose").Document[];
            $inc: (path: string | string[], val?: number) => import("../../schemas/review.schema").Review;
            $isEmpty: (path: string) => boolean;
            $isValid: (path: string) => boolean;
            $locals: Record<string, unknown>;
            $markValid: (path: string) => void;
            $model: {
                <ModelType = import("mongoose").Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown, {}> & {
                    _id: import("mongoose").Types.ObjectId;
                } & {
                    __v: number;
                }, any>>(name: string): ModelType;
                <ModelType = import("mongoose").Model<any, {}, {}, {}, any, any>>(): ModelType;
            };
            $op: "save" | "validate" | "remove" | null;
            $restoreModifiedPathsSnapshot: (snapshot: import("mongoose").ModifiedPathsSnapshot) => import("../../schemas/review.schema").Review;
            $session: (session?: import("mongoose").ClientSession | null) => import("mongoose").ClientSession | null;
            $set: {
                (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("../../schemas/review.schema").Review;
                (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): import("../../schemas/review.schema").Review;
                (value: string | Record<string, any>): import("../../schemas/review.schema").Review;
            };
            $where: Record<string, unknown>;
            baseModelName?: string | undefined;
            collection: import("mongoose").Collection;
            db: import("mongoose").Connection;
            deleteOne: (options?: import("mongoose").QueryOptions) => any;
            depopulate: <Paths = {}>(path?: string | string[]) => import("mongoose").MergeType<import("../../schemas/review.schema").Review, Paths>;
            directModifiedPaths: () => Array<string>;
            equals: (doc: import("mongoose").Document<unknown, any, any, Record<string, any>>) => boolean;
            errors?: import("mongoose").Error.ValidationError | undefined;
            getChanges: () => import("mongoose").UpdateQuery<import("../../schemas/review.schema").Review>;
            increment: () => import("../../schemas/review.schema").Review;
            init: (obj: import("mongoose").AnyObject, opts?: import("mongoose").AnyObject) => import("../../schemas/review.schema").Review;
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
                <ModelType = import("mongoose").Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown, {}> & {
                    _id: import("mongoose").Types.ObjectId;
                } & {
                    __v: number;
                }, any>>(name: string): ModelType;
                <ModelType = import("mongoose").Model<any, {}, {}, {}, any, any>>(): ModelType;
            };
            modifiedPaths: (options?: {
                includeChildren?: boolean;
            }) => Array<string>;
            overwrite: (obj: import("mongoose").AnyObject) => import("../../schemas/review.schema").Review;
            $parent: () => import("mongoose").Document | undefined;
            populate: {
                <Paths = {}>(path: string | import("mongoose").PopulateOptions | (string | import("mongoose").PopulateOptions)[]): Promise<import("mongoose").MergeType<import("../../schemas/review.schema").Review, Paths>>;
                <Paths = {}>(path: string, select?: string | import("mongoose").AnyObject, model?: import("mongoose").Model<any>, match?: import("mongoose").AnyObject, options?: import("mongoose").PopulateOptions): Promise<import("mongoose").MergeType<import("../../schemas/review.schema").Review, Paths>>;
            };
            populated: (path: string) => any;
            replaceOne: (replacement?: import("mongoose").AnyObject, options?: import("mongoose").QueryOptions | null) => import("mongoose").Query<any, import("../../schemas/review.schema").Review, {}, unknown, "find", Record<string, never>>;
            save: (options?: import("mongoose").SaveOptions) => Promise<import("../../schemas/review.schema").Review>;
            schema: import("mongoose").Schema;
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
            updateOne: (update?: import("mongoose").UpdateWithAggregationPipeline | import("mongoose").UpdateQuery<import("../../schemas/review.schema").Review> | undefined, options?: import("mongoose").QueryOptions | null) => import("mongoose").Query<any, import("../../schemas/review.schema").Review, {}, unknown, "find", Record<string, never>>;
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
            userId: {
                name: string;
            };
            createdAt: Date;
            updatedAt: Date;
            bookingId: import("mongoose").Types.ObjectId;
            rating: number;
            stylistRating: number;
            stylistComment: string;
            stylistId: {
                name: string;
            };
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
