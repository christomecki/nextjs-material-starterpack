import styled from "@emotion/styled"
import { Button } from "@mui/material"
import React from "react";

type Props = {
    children: React.ReactNode;
    startIcon?: React.ReactNode;
    onClick: (label: string) => void;
    label: string;
}

const StyledButton = styled(Button)({
    justifyContent: 'left',
})

export default function CustomButton({ children, startIcon, label, onClick }: Props) {
    return (
        <StyledButton
            startIcon={startIcon}
            onClick={() => onClick(label)}
        >
            {children}
        </StyledButton>
    )
}
