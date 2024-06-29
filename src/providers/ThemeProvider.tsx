import React from 'react'
import { ThemeProvider as Theme, createTheme } from '@mui/material';
import { dark, light } from '../components/themes';
import { THEMES } from '../consts';

interface Props {
    children: React.ReactNode,
    theme: THEMES
}

const ThemeProvider = ({children, theme}: Props) => {
    let currentTheme

    switch (theme) {
        case THEMES.DARK:
            currentTheme = createTheme(dark)    
            break;
        case THEMES.LIGHT:
            currentTheme = createTheme(light)    
            break;
        default:
            currentTheme = createTheme(light)    
            break;
    }

    return (
        <Theme theme={currentTheme}>
            {children}
        </Theme>
    )
}

export default ThemeProvider