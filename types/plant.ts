import { WaterNeed, LightNeed, FertiliserSeason } from "@/types/enums";

export interface Plant {
  _id: string;
  name: string;
  botanicalName: string;
  imageUrl: string;
  waterNeed?: WaterNeed;
  lightNeed?: LightNeed;
  fertiliserSeason?: FertiliserSeason[];
  description?: string;
  isOwned?: boolean;
  ownedBy: string[];
}

export interface DailyPlant {
  _id: string;
  date: string;
  plant: Plant;
}

export interface PlantsResponse {
  plants: Plant[];
  total: number;
  page: number;
  totalPages: number;
  allLightNeeds: string[];
  allWaterNeeds: string[];
}