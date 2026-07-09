import { Stack } from '@mui/material';
import {
  BAG_OPTIONS,
  BOTTOM_OPTIONS,
  FACE_TYPE_OPTIONS,
  HAIR_STYLE_OPTIONS,
  HAT_OPTIONS,
  TOP_OPTIONS,
} from '@/constants/characterOptions';
import type { FormErrors, FormValues } from '../types';
import SelectField from './SelectField';

interface PersonFieldsProps {
  values: FormValues;
  errors: FormErrors;
  onChange: (field: keyof FormValues, value: string) => void;
}

export default function PersonFields({ values, errors, onChange }: PersonFieldsProps) {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} sx={{ '& > *': { flex: 1 } }}>
        <SelectField
          label="얼굴 타입"
          value={values.faceType}
          options={FACE_TYPE_OPTIONS}
          error={errors.faceType}
          onChange={(value) => onChange('faceType', value)}
        />
        <SelectField
          label="헤어스타일"
          value={values.hairStyle}
          options={HAIR_STYLE_OPTIONS}
          error={errors.hairStyle}
          onChange={(value) => onChange('hairStyle', value)}
        />
      </Stack>

      <Stack direction="row" spacing={2} sx={{ '& > *': { flex: 1 } }}>
        <SelectField
          label="상의"
          value={values.top}
          options={TOP_OPTIONS}
          error={errors.top}
          onChange={(value) => onChange('top', value)}
        />
        <SelectField
          label="하의"
          value={values.bottom}
          options={BOTTOM_OPTIONS}
          error={errors.bottom}
          onChange={(value) => onChange('bottom', value)}
        />
      </Stack>

      <Stack direction="row" spacing={2} sx={{ '& > *': { flex: 1 } }}>
        <SelectField
          label="모자"
          value={values.hat}
          options={HAT_OPTIONS}
          error={errors.hat}
          onChange={(value) => onChange('hat', value)}
        />
        <SelectField
          label="가방"
          value={values.bag}
          options={BAG_OPTIONS}
          error={errors.bag}
          onChange={(value) => onChange('bag', value)}
        />
      </Stack>
    </Stack>
  );
}