import { Stack } from '@mui/material';
import { CAT_COLOR_OPTIONS, CAT_FACE_OPTIONS } from '@/constants/characterOptions';
import type { FormErrors, FormValues } from '../types';
import SelectField from './SelectField';

interface CatFieldsProps {
  values: FormValues;
  errors: FormErrors;
  onChange: (field: keyof FormValues, value: string) => void;
}

export default function CatFields({ values, errors, onChange }: CatFieldsProps) {
  return (
    <Stack direction="row" spacing={2} sx={{ '& > *': { flex: 1 } }}>
      <SelectField
        label="얼굴"
        value={values.face}
        options={CAT_FACE_OPTIONS}
        error={errors.face}
        onChange={(value) => onChange('face', value)}
      />
      <SelectField
        label="색상"
        value={values.color}
        options={CAT_COLOR_OPTIONS}
        error={errors.color}
        onChange={(value) => onChange('color', value)}
      />
    </Stack>
  );
}