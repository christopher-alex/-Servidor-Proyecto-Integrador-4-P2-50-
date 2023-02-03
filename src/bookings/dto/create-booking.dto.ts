export class CreateBookingDto {
  readonly date: Date;
  readonly code: string;
  readonly user: string;
  readonly movie: string;
  readonly cinema: string;
  readonly ticket_type: string;
  readonly product: string;
}
