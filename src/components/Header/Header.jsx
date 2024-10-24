import styles from "./Header.module.css";

import TitleLogo from "../../assets/Title.svg";

function Logo() {
  return (
    <a href="/" className={styles.logo}>
      <img src={TitleLogo} alt="Title" />
    </a>
  );
}

function Menu() {
  let menuItems = [
    { name: "Home", link: "/", active: false },
    { name: "Catalog", link: "/catalog", active: false },
  ];
  // Set active to true for the current page
  let currentPath = window.location.pathname;
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
