import { Stack } from '@mui/material';
import { VEHICLE_COLOR_OPTIONS } from '@/constants/characterOptions';
import type { FormErrors, FormValues } from '../types';
import SelectField from './SelectField';

interface VehicleFieldsProps {
  values: FormValues;
  errors: FormErrors;
  modelOptions: string[];
  onChange: (field: keyof FormValues, value: string) => void;
}

export default function VehicleFields({ values, errors, modelOptions, onChange }: VehicleFieldsProps) {
  return (
    <Stack direction="row" spacing={2} sx={{ '& > *': { flex: 1 } }}>
      <SelectField
        label="색상"
        value={values.color}
        options={VEHICLE_COLOR_OPTIONS}
        error={errors.color}
        onChange={(value) => onChange('color', value)}
      />
      <SelectField
        label="차종"
        value={values.model}
        options={modelOptions}
        error={errors.model}
        onChange={(value) => onChange('model', value)}
      />
    </Stack>
  );
}