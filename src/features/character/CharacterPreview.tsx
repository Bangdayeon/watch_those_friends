import { Box, Chip, Stack, Typography } from '@mui/material';
import { CHARACTER_TYPE_LABEL } from '@/types/character';
import type { CharacterType } from '@/types/character';
import { getSwatchColor } from './colorSwatch';
import type { FormValues } from './types';

interface CharacterPreviewProps {
     type: CharacterType;
     values: FormValues;
}

function getPreviewColorKey(type: CharacterType, values: FormValues): string {
    const primaryValue = type === 'PERSON' ? values.top : values.color;
    return primaryValue || type;
}

function getSelectedSummary(type: CharacterType, values: FormValues): { label: string; value: string }[] {
  const entries: { label: string; value: string }[] = [];
  if (values.personality) entries.push({ label: '성향', value: values.personality });

  if (type === 'PERSON') {
    if (values.faceType) entries.push({ label: '얼굴', value: values.faceType });
    if (values.hairStyle) entries.push({ label: '헤어', value: values.hairStyle });
    if (values.top) entries.push({ label: '상의', value: values.top });
    if (values.bottom) entries.push({ label: '하의', value: values.bottom });
    if (values.hat) entries.push({ label: '모자', value: values.hat });
    if (values.bag) entries.push({ label: '가방', value: values.bag });
  } else if (type === 'CAT') {
    if (values.face) entries.push({ label: '얼굴', value: values.face });
    if (values.color) entries.push({ label: '색상', value: values.color });
  } else {
    if (values.color) entries.push({ label: '색상', value: values.color });
    if (values.model) entries.push({ label: '차종', value: values.model });
  }

  return entries;
}

export default function CharacterPreview({ type, values }: CharacterPreviewProps) {
  const summary = getSelectedSummary(type, values);

  return (
    <Stack spacing={2} sx={{ alignItems: 'center' }}>
      <Box
        sx={{
          width: 180,
          height: 180,
          borderRadius: 3,
          backgroundColor: getSwatchColor(getPreviewColorKey(type, values)),
          boxShadow: 3,
          transition: 'background-color 0.2s',
        }}
      />
      <Typography variant="caption" color="text.secondary">
        {CHARACTER_TYPE_LABEL[type]} · {values.name || '이름 없음'}
      </Typography>
      {summary.length > 0 && (
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
          {summary.map((item) => (
            <Chip key={item.label} size="small" label={`${item.label}: ${item.value}`} />
          ))}
        </Stack>
      )}
    </Stack>
  );
}