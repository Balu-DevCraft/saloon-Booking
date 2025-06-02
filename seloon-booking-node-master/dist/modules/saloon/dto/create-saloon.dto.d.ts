export declare class CreateSaloonDto {
    name: string;
    city: string;
    place: string;
    latitude: string;
    longitude: string;
    email: string;
    password: string;
}
export declare class PaginationDto {
    page?: number;
    limit?: number;
    isActive?: boolean;
    search?: string;
    saloonId?: string;
}
export declare class AddSaloonEmployeeDto {
    name: string;
    email: string;
    password: string;
    specialization?: string[];
    workHistory?: string;
    openingTimes?: string;
    image?: string;
}
