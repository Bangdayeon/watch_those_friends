import { Button, Stack, Typography } from '@mui/material';

export default function CharactersPage() {
  return (
    <Stack spacing={3}>
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
      >

        <Button variant="contained">
          주민 등록
        </Button>
      </Stack>
    </Stack>
  );
}