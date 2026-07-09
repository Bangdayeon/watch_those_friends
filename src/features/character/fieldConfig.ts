import {
  // 고양이
  CAT_COLOR_OPTIONS,
  CAT_FACE_OPTIONS,
  // 사람
  BAG_OPTIONS,
  BOTTOM_OPTIONS,
  FACE_TYPE_OPTIONS,
  HAIR_STYLE_OPTIONS,
  TOP_OPTIONS,
  HAT_OPTIONS,
  // 교통수단
  CAR_MODEL_OPTIONS,
  MOTORCYCLE_MODEL_OPTIONS,
  VEHICLE_COLOR_OPTIONS
} from '@/constants/characterOptions';
import type { CharacterType } from '@/types/character';
import type { FormValues } from './types';

export interface AttributeTabConfig {
  key: string;
  field: keyof FormValues;
  label: string;
  options: string[];
}

// 이 타입은 어떤 속성 탭을 갖는지에 대한 유일한 출처.
// 탭 렌더링(CharacterFormDialog)과 필수값 검증(utils.ts) 둘 다 여기서 파생됨.
export const ATTRIBUTE_TABS_BY_TYPE: Record<CharacterType, AttributeTabConfig[]> = {
  PERSON: [
    { key: 'faceType', label: '얼굴', field: 'faceType', options: FACE_TYPE_OPTIONS },
    { key: 'hairStyle', label: '헤어', field: 'hairStyle', options: HAIR_STYLE_OPTIONS },
    { key: 'top', label: '상의', field: 'top', options: TOP_OPTIONS },
    { key: 'bottom', label: '하의', field: 'bottom', options: BOTTOM_OPTIONS },
    { key: 'hat', label: '모자', field: 'hat', options: HAT_OPTIONS },
    { key: 'bag', label: '가방', field: 'bag', options: BAG_OPTIONS },
  ],
  CAT: [
    { key: 'face', label: '얼굴', field: 'face', options: CAT_FACE_OPTIONS },
    { key: 'color', label: '색상', field: 'color', options: CAT_COLOR_OPTIONS },
  ],
  CAR: [
    { key: 'color', label: '색상', field: 'color', options: VEHICLE_COLOR_OPTIONS },
    { key: 'model', label: '차종', field: 'model', options: CAR_MODEL_OPTIONS },
  ],
  MOTORCYCLE: [
    { key: 'color', label: '색상', field: 'color', options: VEHICLE_COLOR_OPTIONS },
    { key: 'model', label: '차종', field: 'model', options: MOTORCYCLE_MODEL_OPTIONS },
  ],
};