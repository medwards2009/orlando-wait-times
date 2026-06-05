export interface PriceDto {
  amount: number;
  currency: string;
  formatted: string;
}

export interface StandardQueueDto {
  waitTime: number;
}

export interface ReturnTimeQueueDto {
  state: string;
  returnStart: string;
  returnEnd: string;
}

export interface PaidReturnTimeQueueDto {
  state: string;
  returnStart: string;
  returnEnd: string;
  price: PriceDto;
}

export interface BoardingGroupQueueDto {
  allocationStatus: string;
  currentGroupStart: number;
  currentGroupEnd: number;
  nextAllocationTime: string;
  estimatedWait: number;
}

export interface QueueDto {
  STANDBY?: StandardQueueDto;
  SINGLE_RIDER?: StandardQueueDto;
  RETURN_TIME?: ReturnTimeQueueDto;
  PAID_RETURN_TIME?: PaidReturnTimeQueueDto;
  BOARDING_GROUP?: BoardingGroupQueueDto;
  PAID_STANDBY?: StandardQueueDto;
}

export interface ParkDto {
  id: string;
  name: string;
}

export interface DestinationDto {
  id: string;
  name: string;
  slug: string;
  parks: ParkDto[];
}

export interface ForecastItemDto {
  time: string;
  waitTime: number;
  percentage: number;
}

export interface LiveDataItemDto {
  id: string;
  name: string;
  entityType: string;
  parkId: string;
  externalId: string;
  queue?: QueueDto;
  status: string;
  forecast?: ForecastItemDto[];
  operatingHours?: string[];
  lastUpdated: string;
}

// One element of the array returned by GET /live/{id} — represents a single park
export interface LiveDto {
  id: string;
  name: string;
  entityType: string;
  timezone: string;
  liveData: LiveDataItemDto[];
}
