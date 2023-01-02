import { createTheme } from "@mui/material/styles";
import { Montserrat } from '@next/font/google'

export const montSerrat = Montserrat({
  weight: ['100','200','300','400','500','600','700'],
  subsets:['latin'],
  display:'swap',
  fallback:['Heveltica','Arial','sans-serif']
})

const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
  },
  typography: {
    fontFamily: montSerrat.style.fontFamily,
  },
});

export default theme;