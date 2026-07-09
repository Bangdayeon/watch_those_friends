import { CHARACTER_TYPES } from '@/types/character';
import type { Character, CharacterType } from '@/types/character';
import { ATTRIBUTE_TABS_BY_TYPE } from './fieldConfig';
import type { FormErrors, FormValues } from './types';

const COMMON_FIELDS: (keyof FormValues)[] = ['name', 'personality'];
const COMMON_LABELS: Partial<Record<keyof FormValues, string>> = {
  name: '이름',
  personality: '성향',
};

const REQUIRED_FIELDS_BY_TYPE = CHARACTER_TYPES.reduce(
  (acc, type) => {
    acc[type] = [...COMMON_FIELDS, ...ATTRIBUTE_TABS_BY_TYPE[type].map((tab) => tab.field)];
    return acc;
  },
  {} as Record<CharacterType, (keyof FormValues)[]>,
);

const FIELD_LABELS = CHARACTER_TYPES.reduce(
  (acc, type) => {
    ATTRIBUTE_TABS_BY_TYPE[type].forEach((tab) => {
      acc[tab.field] = tab.label;
    });
    return acc;
  },
  { ...COMMON_LABELS } as Record<keyof FormValues, string>,
);

export function validate(type: CharacterType, values: FormValues): FormErrors {
  const errors: FormErrors = {};
  REQUIRED_FIELDS_BY_TYPE[type].forEach((field) => {
    if (!values[field]) {
      errors[field] = `${FIELD_LABELS[field]}을(를) 선택해주세요`;
    }
  });
  return errors;
}

export function buildCharacter(type: CharacterType, values: FormValues): Character {
  const base = {
    id: crypto.randomUUID(),
    name: values.name,
    personality: values.personality,
    createdAt: new Date().toISOString(),
  };

  switch (type) {
    case 'PERSON':
      return {
        ...base,
        type,
        faceType: values.faceType,
        hairStyle: values.hairStyle,
        top: values.top,
        bottom: values.bottom,
        hat: values.hat,
        bag: values.bag,
      };
    case 'CAT':
      return { ...base, type, face: values.face, color: values.color };
    case 'CAR':
    case 'MOTORCYCLE':
      return { ...base, type, color: values.color, model: values.model };
  }
}

export function getCharacterSummary(character: Character): string {
  switch (character.type) {
    case 'PERSON':
      return `${character.hairStyle} · ${character.top}/${character.bottom}`;
    case 'CAT':
      return `${character.color} · ${character.face}`;
    case 'CAR':
    case 'MOTORCYCLE':
      return `${character.color} · ${character.model}`;
  }
}