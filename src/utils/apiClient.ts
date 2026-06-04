import { DestinationDto, LiveDto } from '@/types/api';
import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = 'https://waittimes.michaelswebstuff.com';

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string = API_BASE_URL) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getDestinations(): Promise<DestinationDto[]> {
    const response = await this.client.get<{ destinations: DestinationDto[] }>('/destinations');
    return response.data.destinations;
  }

  // parkId is the ID of a specific park within a destination (from DestinationDto.parks[].id)
  async getLiveData(parkId: string): Promise<LiveDto> {
    const response = await this.client.get<LiveDto>(`/live/${parkId}`);
    return response.data;
  }
}

export const apiClient = new ApiClient();
export default apiClient;
