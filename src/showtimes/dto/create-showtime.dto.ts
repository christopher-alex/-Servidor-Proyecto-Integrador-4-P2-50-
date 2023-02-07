import mongoose from "mongoose";

export class CreateShowtimeDto {
  readonly code: string;
  readonly movie: mongoose.Types.ObjectId;
  readonly cinema: mongoose.Types.ObjectId;
  readonly date: Date;
  readonly time: Date;
  readonly available_seats: number;
}
