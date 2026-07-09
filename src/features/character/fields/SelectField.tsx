import { MenuItem, TextField } from '@mui/material';

interface SelectFieldProps {
  label: string;
  value: string;
  options: string[];
  error?: string;
  onChange: (value: string) => void;
}

export default function SelectField({ label, value, options, error, onChange }: SelectFieldProps) {
  return (
    <TextField
      select
      fullWidth
      label={label}
      value={value}
      error={Boolean(error)}
      helperText={error}
      onChange={(event) => onChange(event.target.value)}
    >
      <MenuItem value="" disabled>
        선택하세요
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
}