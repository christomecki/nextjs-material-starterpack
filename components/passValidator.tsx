import { Box } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from "react";

interface PassValidatorProps {
    password: string;
    passwordCorrect: (data: boolean) => void;
}

export default function PassValidator({ password, passwordCorrect }: PassValidatorProps) {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const hasNoSpaces = !/\s/.test(password);
    
    useEffect(() => {
        if (hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasNoSpaces) {
            passwordCorrect(true);
        } else {
            passwordCorrect(false);
        }
    }, [password])

    return (
        <Box>
            {hasMinLength
                ? <CorrectProps>Minimum length 8</CorrectProps>
                : <IncorrectProps>Minimum length 8</IncorrectProps>
            }
            {hasUpperCase
                ? <CorrectProps>Must have uppercase letter</CorrectProps>
                : <IncorrectProps>Must have uppercase letter</IncorrectProps>
            }
            {hasLowerCase
                ? <CorrectProps>Must have lowercase letter</CorrectProps>
                : <IncorrectProps>Must have lowercase letter</IncorrectProps>
            }
            {hasNumber
                ? <CorrectProps>Must have number</CorrectProps>
                : <IncorrectProps>Must have number</IncorrectProps>
            }
            {hasSpecialChar
                ? <CorrectProps>Must have special character</CorrectProps>
                : <IncorrectProps>Must have special character</IncorrectProps>
            }
            {hasNoSpaces
                ? <CorrectProps>Must have no spaces</CorrectProps>
                : <IncorrectProps>Must have no spaces</IncorrectProps>
            }
        </Box>
    )
}

function CorrectProps({ children }: { children: React.ReactNode }) {
    return (
        <Box sx={{ color: 'green', display: 'flex' }}>
            <CheckCircleIcon sx={{ pr: '5px' }} /><Box>{children}</Box>
        </Box>
    )
}

function IncorrectProps({ children }: { children: React.ReactNode }) {
    return (
        <Box sx={{ color: 'red', display: 'flex' }}>
            <CancelIcon sx={{ pr: '5px' }} /><Box>{children}</Box>
        </Box>
    )
}

