import { Place } from "./PlaceDto";

export type MateType = {
  id: number;
  title: string;
  desc: string;
  color: string;
  places: Place[];
  member: [];
};
