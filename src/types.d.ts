export interface HotelResponseData {
  id: string;
  name: string;
  description: string;
  address1: string;
  address2: string;
  postcode: string;
  town: string;
  country: string;
  countryCode: string;
  starRating: string;
  facilities?: FacilitiesEntity[] | null;
  telephone: string;
  email: string;
  images?: ImageEntity[] | null;
  checkInHours: string;
  checkInMinutes: string;
  checkOutHours: string;
  checkOutMinutes: string;
  position: Position;
}
interface FacilitiesEntity {
  code: string;
}
export interface ImageEntity {
  url: string;
  alt?: string | null;
}
interface Position {
  latitude?: number | null;
  longitude?: number | null;
  timezone: string;
}

export interface RoomRateResponseData {
  rooms?: RoomsEntity[] | null;
  ratePlans?: RatePlansEntity[] | null;
}
export interface RoomsEntity {
  id: string;
  name: string;
  shortDescription?: string;
  longDescription?: string;
  occupancy: Occupancy;
  disabledAccess: boolean;
  bedConfiguration: string;
  images?: ImageEntity[] | null;
  facilities?: (FacilitiesEntity | null)[] | null;
}
interface Occupancy {
  maxAdults: number;
  maxChildren: number;
  maxOverall: number;
}
interface ImageEntity {
  url: string;
  alt: string;
}
interface FacilitiesEntity {
  code: string;
  name: string;
}
interface RatePlansEntity {
  id: string;
  shortDescription: string;
  longDescription?: string | null;
  prePayment: string;
  cancellationPolicy?: CancellationPolicy | null;
  prePaymentValue?: number | null;
  prePaymentIsPercentage?: boolean | null;
}
interface CancellationPolicy {
  name: string;
  text: string;
  penalty: string;
  applicable: string;
  hour: string;
  amount?: number | null;
  days?: number | null;
}

export interface HotelData
  extends Pick<
    HotelResponseData,
    "id" | "name" | "address1" | "address2" | "starRating" | "images"
  > {}

export interface Room
  extends Pick<
    RoomsEntity,
    "id" | "name" | "occupancy" | "shortDescription" | "longDescription"
  > {}
export interface Hotel extends HotelData {
  rooms: Room[];
}
