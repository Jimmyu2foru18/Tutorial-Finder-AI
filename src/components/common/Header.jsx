import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        {/* Logo and Title */}
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'primary.main',
            fontWeight: 'bold',
            fontFamily: 'Montserrat',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <SearchIcon sx={{ mr: 1 }} />
          Tutorial Finder AI
        </Typography>

        {/* Desktop Navigation */}
        {!isMobile ? (
          <Box>
            <Button color="inherit" component={RouterLink} to="/">
              Home
            </Button>
            <Button color="inherit" component={RouterLink} to="/search">
              Search
            </Button>
            <Button variant="outlined" color="primary" sx={{ ml: 2 }}>
              Sign In
            </Button>
          </Box>
        ) : (
          /* Mobile Navigation */
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem 
                onClick={handleMenuClose} 
                component={RouterLink} 
                to="/"
              >
                Home
              </MenuItem>
              <MenuItem 
                onClick={handleMenuClose} 
                component={RouterLink} 
                to="/search"
              >
                Search
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>Sign In</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;