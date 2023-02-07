export class CreateBookingDto {
  readonly date: Date;
  readonly code: string;
  readonly user: string;
  readonly movie: string;
  readonly cinema: string;
  readonly tickets: string[];
  readonly products: string[];
}
