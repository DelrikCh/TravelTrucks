import styles from "./Header.module.css";

import TitleLogo from "../../assets/svg/Title.svg";

import { useLocation } from "react-router-dom";

function Logo() {
  return (
    <a href="/" className={styles.logo}>
      <img src={TitleLogo} alt="Title" />
    </a>
  );
}

function Menu() {
  const location = useLocation();
  const currentPath = location.pathname;
  let menuItems = [
    { name: "Home", link: "/", active: false },
    { name: "Catalog", link: "/catalog", active: false },
  ];
  // Set active to true for the current page
  menuItems = menuItems.map((item) => {
    if (item.link === currentPath) {
      item.active = true;
    }
    return item;
  });

  return (
    <nav className={styles.menuNav}>
      <ul className={styles.menu}>
        {menuItems.map((item) => (
          <li key={item.name}>
            {/* classes both styles.menuItem and menuItemActive */}
            <a
              href={item.link}
              className={`${item.active ? styles.menuItemActive : ""} ${
                styles.menuItem
              }`}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <Menu />
    </header>
  );
}

export default Header;
