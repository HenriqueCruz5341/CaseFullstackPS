import { useContext } from 'react';
import { useHistory } from 'react-router';
import Logo from '../../assets/images/Logo.svg';
import { UserContext } from '../userProvider';
import { Navbar, NavbarItem, NavbarItems, NavbarUser } from './styles';

const Header = () => {
  const history = useHistory();
  const { user, signOut } = useContext(UserContext);

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
    </Navbar>
  );
};

export default Header;
