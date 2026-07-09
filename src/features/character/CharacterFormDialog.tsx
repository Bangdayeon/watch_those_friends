import { useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { PERSONALITY_OPTIONS } from '@/constants/characterOptions';
import { CHARACTER_TYPE_LABEL, CHARACTER_TYPES } from '@/types/character';
import type { Character, CharacterType } from '@/types/character';
import { ATTRIBUTE_TABS_BY_TYPE } from './fieldConfig';
import { INITIAL_FORM_VALUES } from './types';
import type { FormValues } from './types';
import { buildCharacter, validate } from './utils';
import CharacterPreview from './CharacterPreview';
import SwatchGrid from './SwatchGrid';

interface CharacterFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (character: Character) => void;
}

const SPECIES_TAB_KEY = 'species';
const PERSONALITY_TAB_KEY = 'personality';

export default function CharacterFormDialog({ open, onClose, onSubmit }: CharacterFormDialogProps) {
  const [type, setType] = useState<CharacterType>('PERSON');
  const [values, setValues] = useState<FormValues>(INITIAL_FORM_VALUES);
  const [activeTab, setActiveTab] = useState<string>(SPECIES_TAB_KEY);
  const [errorMessage, setErrorMessage] = useState('');

  const attributeTabs = ATTRIBUTE_TABS_BY_TYPE[type];

  const tabs = useMemo(
    () => [
      { key: SPECIES_TAB_KEY, label: '종족' },
      { key: PERSONALITY_TAB_KEY, label: '성향' },
      ...attributeTabs.map((tab) => ({ key: tab.key, label: tab.label })),
    ],
    [attributeTabs],
  );

  const resetForm = () => {
    setType('PERSON');
    setValues(INITIAL_FORM_VALUES);
    setActiveTab(SPECIES_TAB_KEY);
    setErrorMessage('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSpeciesSelect = (nextType: string) => {
    setType(nextType as CharacterType);
    setValues((prev) => ({ ...INITIAL_FORM_VALUES, name: prev.name, personality: prev.personality }));
  };

  const handleFieldSelect = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrorMessage('');
  };

  const handleSubmit = () => {
    const errors = validate(type, values);
    if (Object.keys(errors).length > 0) {
      setErrorMessage('아직 선택하지 않은 항목이 있어요. 하단 탭을 확인해주세요.');
      return;
    }
    onSubmit(buildCharacter(type, values));
    handleClose();
  };

  const renderActiveTabContent = () => {
    if (activeTab === SPECIES_TAB_KEY) {
      return (
        <SwatchGrid
          items={CHARACTER_TYPES.map((t) => ({ key: t, label: CHARACTER_TYPE_LABEL[t] }))}
          selectedKey={type}
          onSelect={handleSpeciesSelect}
        />
      );
    }

    if (activeTab === PERSONALITY_TAB_KEY) {
      return (
        <SwatchGrid
          items={PERSONALITY_OPTIONS.map((option) => ({ key: option, label: option }))}
          selectedKey={values.personality}
          onSelect={(value) => handleFieldSelect('personality', value)}
        />
      );
    }

    const config = attributeTabs.find((tab) => tab.key === activeTab);
    if (!config) return null;

    return (
      <SwatchGrid
        items={config.options.map((option) => ({ key: option, label: option }))}
        selectedKey={values[config.field]}
        onSelect={(value) => handleFieldSelect(config.field, value)}
      />
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen
      slotProps={{ paper: { sx: { display: 'flex', flexDirection: 'column' } } }}
    >
      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar>
          <IconButton onClick={handleClose} edge="start">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flex: 1, ml: 1 }}>
            주민 등록
          </Typography>
          <Button variant="contained" onClick={handleSubmit}>
            등록
          </Button>
        </Toolbar>
      </AppBar>

      <Stack sx={{ flex: 1, overflow: 'hidden' }}>
        <Stack spacing={3} sx={{ flex: 1, overflowY: 'auto', alignItems: 'center', justifyContent: 'center', p: 3 }}>
          <TextField
            label="이름"
            value={values.name}
            onChange={(event) => handleFieldSelect('name', event.target.value)}
            sx={{ width: 280 }}
          />
          <CharacterPreview type={type} values={values} />
          {errorMessage && (
            <Typography variant="body2" color="error">
              {errorMessage}
            </Typography>
          )}
        </Stack>

        <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_event, value) => setActiveTab(value)} variant="scrollable" scrollButtons="auto">
            {tabs.map((tab) => (
              <Tab key={tab.key} value={tab.key} label={tab.label} />
            ))}
          </Tabs>
          <Box sx={{ p: 2, minHeight: 120 }}>{renderActiveTabContent()}</Box>
        </Box>
      </Stack>
    </Dialog>
  );
}