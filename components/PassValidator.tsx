import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import { PasswordValidation } from '@/lib/auth/passwordValidaton';

export function PasswordStrengthMeter({ validation }: { validation: PasswordValidation }) {
  const { hasMinLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar, hasNoSpaces } = validation;
  return (
    <Box sx={(theme) => ({ border: '1px solid', borderColor: theme.palette.divider, borderRadius: '5px', padding: '10px' })}>
      <Typography variant="subtitle1" sx={(theme) => ({ color: theme.palette.grey[400], mb: '10px' })}>
        Password requirements:
      </Typography>
      <Condition value={hasMinLength}>Minimum length 8</Condition>
      <Condition value={hasUpperCase}>Must have uppercase letter</Condition>
      <Condition value={hasLowerCase}>Must have lowercase letter</Condition>
      <Condition value={hasNumber}>Must have number</Condition>
      <Condition value={hasSpecialChar}>Must have special character</Condition>
      <Condition value={hasNoSpaces}>Must have no spaces</Condition>
    </Box>
  );
}

function Correct({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={(theme) => ({ color: theme.palette.success.main, display: 'flex', mb: '5px' })}>
      <CheckIcon sx={{ mr: '10px' }} />
      <Box data-cy="correct">{children}</Box>
    </Box>
  );
}

function Incorrect({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={(theme) => ({ color: theme.palette.warning.main, display: 'flex', mb: '5px' })}>
      <ClearIcon sx={{ mr: '10px' }} />
      <Box data-cy="incorrect">{children}</Box>
    </Box>
  );
}

function Condition({ value, children }: { value: boolean; children: React.ReactNode }) {
  const Wrapper = value ? Correct : Incorrect;
  return <Wrapper>{children}</Wrapper>;
}
