import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function TopBar() {

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" elevation={0} color="primary">
        <Toolbar>
          <Typography
            align="center"
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { sm: 'block' }, }}
          >
            Pokémon Team Builder
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    </>
  );
};

export default TopBar;