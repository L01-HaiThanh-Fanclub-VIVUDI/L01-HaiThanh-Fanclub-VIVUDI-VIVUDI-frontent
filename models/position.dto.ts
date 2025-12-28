import { GeoPoint } from "./geo_point.dto";

export interface Position {
    id: string;
    name: string;
    address: string;
    description?: string;
    type: string;
    point: GeoPoint;
    createdAt: string;
    updatedAt: string;
    distance?: number;
}