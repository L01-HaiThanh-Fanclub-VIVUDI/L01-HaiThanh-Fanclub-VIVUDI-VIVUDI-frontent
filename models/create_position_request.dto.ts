export interface CreatePositionRequest {
    name: string;
    address: string;
    description?: string;
    type: string;
    longtitude: number;
    lattitude: number;
}