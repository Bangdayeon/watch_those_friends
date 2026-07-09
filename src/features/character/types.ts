export interface FormValues {
    name: string;
    personality: string;
    faceType: string;
    hairStyle: string;
    top: string;
    bottom: string;
    hat: string;
    bag: string;
    face: string;
    color: string;
    model: string;
}

export type FormErrors = Partial<Record<keyof FormValues, string>>;

export const INITIAL_FORM_VALUES: FormValues = {
  name: '',
  personality: '',
  faceType: '',
  hairStyle: '',
  top: '',
  bottom: '',
  hat: '',
  bag: '',
  face: '',
  color: '',
  model: '',
};