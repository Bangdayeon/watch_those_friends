import { Box, Stack, Typography } from '@mui/material';
import { getSwatchColor } from './colorSwatch';

interface SwatchItem {
  key: string;
  label: string;
}

interface SwatchGridProps {
  items: SwatchItem[];
  selectedKey: string;
  onSelect: (key: string) => void;
}

export default function SwatchGrid({ items, selectedKey, onSelect }: SwatchGridProps) {
  return (
    <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 2 }}>
      {items.map((item) => {
        const isSelected = item.key === selectedKey;
        return (
          <Stack
            key={item.key}
            onClick={() => onSelect(item.key)}
            spacing={1}
            sx={{ alignItems: 'center', cursor: 'pointer', width: 72 }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                backgroundColor: getSwatchColor(item.key),
                border: '3px solid',
                borderColor: isSelected ? 'primary.main' : 'transparent',
                boxShadow: isSelected ? 4 : 1,
                transition: 'all 0.15s',
              }}
            />
            <Typography variant="caption" sx={{ textAlign: 'center', lineHeight: 1.2 }}>
              {item.label}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
}