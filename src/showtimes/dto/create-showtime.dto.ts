export class CreateShowtimeDto {
    readonly code: string;
    readonly movie: string;
    readonly cinema: string;
    readonly date: Date;
    readonly time: number;
    readonly available_seats: [];
}
