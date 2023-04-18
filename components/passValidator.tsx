import { useEffect} from "react";
import { Box } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import passwordValidation from "@/lib/passValidation/passwordValidaton";

interface PassValidatorProps {
    password: string;
    passwordCorrect: (data: boolean) => void;
}

export default function PassValidator({ password, passwordCorrect }: PassValidatorProps) {
    const [ hasMinLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar, hasNoSpaces ] = passwordValidation(password);
    useEffect(() => {
        if (hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasNoSpaces) {
            passwordCorrect(true);
        } else {
            passwordCorrect(false);
        }
    }, [password])

    return (
        <Box sx={{border: '1px solid', borderColor: 'rgb(101, 101, 101)', borderRadius: '5px', padding: '10px'}}> 
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
        <Box sx={{ color: 'rgb(166, 221, 190)', display: 'flex', mb: '5px' }}>
            <CheckIcon sx={{ mr: '10px' }} /><Box>{children}</Box>
        </Box>
    )
}

function IncorrectProps({ children }: { children: React.ReactNode }) {
    return (
        <Box sx={{ color: 'rgb(255, 180, 195)', display: 'flex', mb: '5px' }}>
            <ClearIcon sx={{ mr: '10px' }} /><Box>{children}</Box>
        </Box>
    )
}

