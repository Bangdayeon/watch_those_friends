import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { PERSONALITY_OPTIONS, CAR_MODEL_OPTIONS, MOTORCYCLE_MODEL_OPTIONS } from '../../constants/characterOptions';
import { CHARACTER_TYPE_LABEL, CHARACTER_TYPES } from '../../types/character';
import type { Character, CharacterType } from '../../types/character';
import { INITIAL_FORM_VALUES } from './types';
import type { FormErrors, FormValues } from './types';
import { buildCharacter, validate } from './utils';
import SelectField from './fields/SelectField';
import PersonFields from './fields/PersonFields';
import CatFields from './fields/CatFields';
import VehicleFields from './fields/VehicleFields';

interface CharacterFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (character: Character) => void;
}

export default function CharacterFormDialog({ open, onClose, onSubmit }: CharacterFormDialogProps) {
  const [type, setType] = useState<CharacterType>('PERSON');
  const [values, setValues] = useState<FormValues>(INITIAL_FORM_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});

  const resetForm = () => {
    setType('PERSON');
    setValues(INITIAL_FORM_VALUES);
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleTypeChange = (_event: React.MouseEvent<HTMLElement>, nextType: CharacterType | null) => {
    if (!nextType) return;
    setType(nextType);
    setValues((prev) => ({ ...INITIAL_FORM_VALUES, name: prev.name, personality: prev.personality }));
    setErrors({});
  };

  const handleFieldChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = () => {
    const nextErrors = validate(type, values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    onSubmit(buildCharacter(type, values));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        주민 등록
        <IconButton onClick={handleClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3} sx={{ pt: 1 }}>
          <ToggleButtonGroup exclusive value={type} onChange={handleTypeChange} sx={{ '& > *': { flex: 1 } }}>
            {CHARACTER_TYPES.map((characterType) => (
              <ToggleButton key={characterType} value={characterType}>
                {CHARACTER_TYPE_LABEL[characterType]}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <TextField
            label="이름"
            value={values.name}
            error={Boolean(errors.name)}
            helperText={errors.name}
            onChange={(event) => handleFieldChange('name', event.target.value)}
          />

          <SelectField
            label="성향"
            value={values.personality}
            options={PERSONALITY_OPTIONS}
            error={errors.personality}
            onChange={(value) => handleFieldChange('personality', value)}
          />

          {type === 'PERSON' && <PersonFields values={values} errors={errors} onChange={handleFieldChange} />}
          {type === 'CAT' && <CatFields values={values} errors={errors} onChange={handleFieldChange} />}
          {type === 'CAR' && (
            <VehicleFields values={values} errors={errors} modelOptions={CAR_MODEL_OPTIONS} onChange={handleFieldChange} />
          )}
          {type === 'MOTORCYCLE' && (
            <VehicleFields
              values={values}
              errors={errors}
              modelOptions={MOTORCYCLE_MODEL_OPTIONS}
              onChange={handleFieldChange}
            />
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button variant="contained" onClick={handleSubmit}>
          등록
        </Button>
      </DialogActions>
    </Dialog>
  );
}