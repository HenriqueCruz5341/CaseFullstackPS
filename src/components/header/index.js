import { useContext, useState } from 'react';
import { Menu, MenuItem, Hidden, Button } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useHistory } from 'react-router';
import Logo from '../../assets/images/Logo.svg';
import { UserContext } from '../userProvider';
import { Navbar, NavbarItem, NavbarItems, NavbarUser } from './styles';

const Header = () => {
  const history = useHistory();
  const { user, signOut } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut();
    history.push('/login');
  };

  return (
    <Navbar>
      <div>
        <a href="https://elogroup.com.br/" target="_blank" rel="noreferrer">
          <img src={Logo} alt="logo" />
        </a>
      </div>
      <Hidden smUp>
        <Button aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
          <MenuOutlinedIcon style={{ color: 'white' }} />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {!user ? (
            <div>
              <MenuItem onClick={() => history.push('/login')}>Login</MenuItem>
              <MenuItem onClick={() => history.push('/register')}>
                Register
              </MenuItem>
            </div>
          ) : (
            <div>
              <MenuItem>Olá, {user}</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </div>
          )}
        </Menu>
      </Hidden>
      <Hidden smDown>
        <NavbarItems>
          {!user ? (
            <>
              <NavbarItem onClick={() => history.push('/login')}>
                Login
              </NavbarItem>
              <NavbarItem onClick={() => history.push('/register')}>
                Register
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarUser>Olá, {user}</NavbarUser>
              <NavbarItem onClick={handleLogout}>Logout</NavbarItem>
            </>
          )}
        </NavbarItems>
      </Hidden>
    </Navbar>
  );
};

export default Header;
