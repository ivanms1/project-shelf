import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Popper from '../Popper';
import PopupModal from '../PopupModal';

import { useAppContext } from '../../Context/AppContext';

import useCurrentUser from '../useCurrentUser';

import { ReactComponent as GitMerge } from '../../assets/git-merge.svg';
import { ReactComponent as Bookmark } from '../../assets/bookmark.svg';
import { ReactComponent as Settings } from '../../assets/settings.svg';
import { ReactComponent as Home } from '../../assets/home.svg';
import { ReactComponent as User } from '../../assets/user.svg';

import {
  Container,
  Nav,
  StyledLink,
  DropdownContainer,
  DropdownItem,
  Icon,
  DropDownText,
  MenuButton,
  VerticalLine,
} from './style';

const popperOptions = {
  placement: 'bottom',
  modifiers: [
    {
      name: 'offset',
      enabled: true,
      options: {
        offset: [-100, 30],
      },
    },
  ],
};

function Header() {
  const history = useHistory();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { isAuthenticated, handleLogout } = useAppContext();

  const { currentUser, loading, error } = useCurrentUser();

  const tabs = {
    auth: [
      {
        title: 'My Projects',
        to: `/my-projects`,
        exact: true,
      },
      {
        id: 'submit',
        title: 'New Project',
        to: `/submit`,
        exact: true,
      },
    ],
    authAndDropdown: [
      {
        title: 'Favorites',
        onClick: () => history.push(`/favorites`),
        leftIcon: <Bookmark />,
      },
      {
        title: 'ADMIN',
        onClick: () => history.push('/admin/not-approved'),
        leftIcon: <GitMerge />,
      },
      {
        title: 'Log Out',
        onClick: () => setModalIsOpen(true),
        leftIcon: <Settings />,
      },
    ],
    notAuth: [
      {
        title: 'Register',
        to: `/register`,
        exact: true,
      },
      {
        title: 'Login',
        to: `/login`,
        exact: true,
      },
    ],
  };

  if (!isAuthenticated) {
    return null;
  } else {
    if (loading === false && !error) {
      if (currentUser?.role !== 'ADMIN') {
        const tabfilter = tabs.auth.filter((tab) => tab.title !== 'ADMIN');
        const tabfilter1 = tabs.authAndDropdown.filter(
          (tab) => tab.title !== 'ADMIN'
        );
        tabs.authAndDropdown = tabfilter1;
        tabs.auth = tabfilter;
      }
      tabs.authAndDropdown.unshift({
        title: 'Profile',
        onClick: () => history.push('/home'),
        leftIcon: <Home />,
      });
    }
  }

  return (
    <Container>
      <Nav>
        <div>
          <li>
            <StyledLink className='logo' to='/'>
              ProjectShelf
              <small>
                <sub>beta</sub>
              </small>
            </StyledLink>
          </li>
        </div>

        {isAuthenticated ? (
          <ul>
            {tabs.auth.map((tab) => (
              <li key={tab.title} className={`nav ${tab?.id}`}>
                <StyledLink
                  activeClassName='current'
                  exact={tab.exact}
                  to={tab.to}
                >
                  <p className={tab?.id}>{tab.title}</p>
                </StyledLink>
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {tabs.notAuth.map((tab) => (
              <li key={tab.title}>
                <StyledLink
                  activeClassName='current'
                  exact={tab.exact}
                  to={tab.to}
                >
                  {tab.title}
                </StyledLink>
              </li>
            ))}
          </ul>
        )}
      </Nav>

      <VerticalLine />

      {isAuthenticated && (
        <Popper
          reference={(ref, handleClick) => (
            <MenuButton ref={ref} onClick={handleClick}>
              <Icon>
                <User />
              </Icon>
            </MenuButton>
          )}
          options={popperOptions}
        >
          <DropdownContainer>
            {tabs.authAndDropdown.map((menu) => (
              <DropdownItem key={menu.title} onClick={menu.onClick}>
                <Icon>{menu.leftIcon}</Icon>

                <DropDownText>{menu.title}</DropDownText>
              </DropdownItem>
            ))}
          </DropdownContainer>
        </Popper>
      )}

      <PopupModal
        type='logout'
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        shouldCloseOnOverlayClick={false}
        onClick={() => {
          handleLogout();
          setModalIsOpen(false);
        }}
      />
    </Container>
  );
}

export default Header;
