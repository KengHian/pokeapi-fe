import './App.css'
import TeamPanel from './components/TeamPanel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Stack } from '@mui/material';
import React from 'react';
import type { Pokemon } from 'pokenode-ts';
import AnalysisPanel from './components/AnalysisPanel';
import TopBar from './components/TopBar';

const baseTheme = createTheme({
  palette: {
    // mode: 'dark',
    mode: 'light', 
  },
});

const theme = createTheme(baseTheme, {
    typography: {
      fontSize: 12, 
    },
    components: {
        MuiCard: {
            defaultProps: {
                // variant: 'elevation',
                variant: 'outlined',
                // elevation: 12,
            },
            styleOverrides: {
                root: {
                    borderRadius: '20px',
                    borderWidth: '2px',
                },
            },
        },
        MuiCardHeader: {
            styleOverrides: {
              root: {
                padding: '16px', // Target the container
                // backgroundColor: baseTheme.palette.primary.main,
                // color: baseTheme.palette.primary.contrastText,
              },
              action: {
                padding: '8px',
              }
            },
          },
    },
  });


function App() {
  const [team, setTeam] = React.useState<(Pokemon | null)[]>(Array(6).fill(null));

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
          <TopBar/>
          <Stack p={2} spacing={2}>
            <TeamPanel team={team} setTeam={setTeam}></TeamPanel>
            <AnalysisPanel team={team}></AnalysisPanel>
          </Stack>
      </ThemeProvider>
  )
}

export default App
