import { ThemeOptions } from "@mui/material";

export const light: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
          main: '#6a708c',
        },
        secondary: {
          main: '#ffff00',
          contrastText: '#fff'
        },
        background:{
            paper: '#fff'
        }
      },
};