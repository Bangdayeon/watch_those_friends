// features/characters/fields/TypeFields.tsx
import { Stack } from '@mui/material';
import type { CharacterType } from '../../../types/character';
import { FIELD_CONFIG_BY_TYPE } from '../fieldConfig';
import type { FormErrors, FormValues } from '../types';
import SelectField from './SelectField';

interface TypeFieldsProps {
  type: CharacterType;
  values: FormValues;
  errors: FormErrors;
  onChange: (field: keyof FormValues, value: string) => void;
}

export default function TypeFields({ type, values, errors, onChange }: TypeFieldsProps) {
  const fields = FIELD_CONFIG_BY_TYPE[type];

  // 2개씩 묶어서 한 줄에 배치 (기존 레이아웃 유지)
  const rows: (typeof fields)[] = [];
  for (let i = 0; i < fields.length; i += 2) {
    rows.push(fields.slice(i, i + 2));
  }

  return (
    <Stack spacing={2}>
      {rows.map((row) => (
        <Stack key={row.map((f) => f.field).join('-')} direction="row" spacing={2} sx={{ '& > *': { flex: 1 } }}>
          {row.map((f) => (
            <SelectField
              key={f.field}
              label={f.label}
              value={values[f.field]}
              options={f.options}
              error={errors[f.field]}
              onChange={(value) => onChange(f.field, value)}
            />
          ))}
        </Stack>
      ))}
    </Stack>
  );
}