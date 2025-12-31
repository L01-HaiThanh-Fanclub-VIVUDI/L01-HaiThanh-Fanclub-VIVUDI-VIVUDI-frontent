import { CreatePositionRequest } from "@/models/create_position_request.dto";
import { baseApiService } from "./base.service";
import { ApiResponse } from "@/models/api_response";
import { Position } from "@/models/position.dto";
import { DeletePositionResponse } from "@/models/delete_position_response.dto";

class PositionServiceClass {
    private static instance: PositionServiceClass;

    private constructor() { }

    static getInstance(): PositionServiceClass {
        if (!PositionServiceClass.instance) {
            PositionServiceClass.instance = new PositionServiceClass();
        };

        return PositionServiceClass.instance;
    };

    public async createPosition(payload: CreatePositionRequest): Promise<ApiResponse<Position>> {
        return baseApiService.post<Position>('/position/create', { body: payload });
    }

    public async getPositionById(id: string): Promise<ApiResponse<Position>> {
        return baseApiService.get<Position>(`/position/getInfo/${id}`);
    }

    public async getAllPositions(): Promise<ApiResponse<Position[]>> {
        return baseApiService.get<Position[]>('/position/getAllInfo');
    }

    public async getNearbyPositions(
        longtitude: number,
        lattitude: number,
        radius: number
    ): Promise<ApiResponse<Position[]>> {
        const url = `/position/getInfo/${longtitude}/${lattitude}/${radius}`;
        console.log(url);
        return baseApiService.get<Position[]>(url);
    }

    public async deletePosition(id: string): Promise<ApiResponse<DeletePositionResponse>> {
        return baseApiService.delete<DeletePositionResponse>(`/position/${id}`);
    }
};

export const positionService = PositionServiceClass.getInstance();