import { useState } from 'react';
import {
  Avatar,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PetsIcon from '@mui/icons-material/Pets';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import { CHARACTER_TYPE_LABEL } from '@/types/character';
import type { Character } from '@/types/character';
import { getCharacterSummary } from '@/features/character/utils';
import CharacterFormDialog from '@/features/character/CharacterFormDialog';

const TYPE_ICON: Record<Character['type'], React.ReactNode> = {
  PERSON: <PersonIcon />,
  CAT: <PetsIcon />,
  CAR: <DirectionsCarIcon />,
  MOTORCYCLE: <TwoWheelerIcon />,
};

export default function CharacterPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreate = (character: Character) => {
    setCharacters((prev) => [character, ...prev]);
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">캐릭터 관리</Typography>
        <Button variant="contained" onClick={() => setDialogOpen(true)}>
          주민 등록
        </Button>
      </Stack>

      {characters.length === 0 ? (
        <Typography color="text.secondary">아직 등록된 주민이 없어요.</Typography>
      ) : (
        <List disablePadding>
          {characters.map((character, index) => (
            <Stack key={character.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>{TYPE_ICON[character.type]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <Typography>{character.name}</Typography>
                      <Chip size="small" label={CHARACTER_TYPE_LABEL[character.type]} />
                    </Stack>
                  }
                  secondary={`${character.personality} · ${getCharacterSummary(character)}`}
                />
              </ListItem>
              {index < characters.length - 1 && <Divider component="li" />}
            </Stack>
          ))}
        </List>
      )}

      <CharacterFormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSubmit={handleCreate} />
    </Stack>
  );
}