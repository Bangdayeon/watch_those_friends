export const CHARACTER_TYPES = ['PERSON', 'CAT', 'CAR', 'MOTORCYCLE'] as const;
export type CharacterType = (typeof CHARACTER_TYPES)[number];

export const CHARACTER_TYPE_LABEL: Record<CharacterType, string> = {
    PERSON: '사람',
    CAT: '고양이',
    CAR: '자동차',
    MOTORCYCLE: '오토바이',
};

interface CharacterBase {
    id: string;
    name: string;
    personality: string;
    createdAt: string;
}

export interface PersonCharacter extends CharacterBase {
    type: 'PERSON';
    faceType: string;
    hairStyle: string;
    top: string;
    bottom: string;
    hat: string;
    bag: string;
}

export interface CatCharacter extends CharacterBase {
    type: 'CAT';
    face: string;
    color: string;
}

export interface VehicleCharacter extends CharacterBase {
    type: 'CAR' | 'MOTORCYCLE';
    color: string;
    model: string;
}

export type Character = PersonCharacter | CatCharacter | VehicleCharacter;