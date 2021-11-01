import { styled } from '@mui/system';

export const Navbar = styled('nav')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  background-color: #272727;
  -webkit-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  margin-bottom: 40px;
`;

export const NavbarItems = styled('ul')`
  display: flex;
  align-items: center;
  list-style-type: none;
`;

export const NavbarUser = styled('li')`
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 1rem;
`;

export const NavbarItem = styled(NavbarUser)`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
