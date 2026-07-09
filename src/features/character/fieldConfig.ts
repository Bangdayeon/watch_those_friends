import {CAT_COLOR_OPTIONS, CAT_FACE_OPTIONS,
  BAG_OPTIONS,BOTTOM_OPTIONS,FACE_TYPE_OPTIONS,HAIR_STYLE_OPTIONS,TOP_OPTIONS,HAT_OPTIONS,
  CAR_MODEL_OPTIONS,MOTORCYCLE_MODEL_OPTIONS,VEHICLE_COLOR_OPTIONS
} from '@/constants/characterOptions';
import type { CharacterType } from '@/types/character';
import type { FormValues } from './types';

export interface FieldConfig {
    field: keyof FormValues;
    label: string;
    options: string[];
}

export const FIELD_CONFIG_BY_TYPE: Record<CharacterType, FieldConfig[]> = {
  PERSON: [
    { field: 'faceType', label: '얼굴 타입', options: FACE_TYPE_OPTIONS },
    { field: 'hairStyle', label: '헤어스타일', options: HAIR_STYLE_OPTIONS },
    { field: 'top', label: '상의', options: TOP_OPTIONS },
    { field: 'bottom', label: '하의', options: BOTTOM_OPTIONS },
    { field: 'hat', label: '모자', options: HAT_OPTIONS },
    { field: 'bag', label: '가방', options: BAG_OPTIONS },
  ],
  CAT: [
    { field: 'face', label: '얼굴', options: CAT_FACE_OPTIONS },
    { field: 'color', label: '색상', options: CAT_COLOR_OPTIONS },
  ],
  CAR: [
    { field: 'color', label: '색상', options: VEHICLE_COLOR_OPTIONS },
    { field: 'model', label: '차종', options: CAR_MODEL_OPTIONS },
  ],
  MOTORCYCLE: [
    { field: 'color', label: '색상', options: VEHICLE_COLOR_OPTIONS },
    { field: 'model', label: '차종', options: MOTORCYCLE_MODEL_OPTIONS },
  ],
};