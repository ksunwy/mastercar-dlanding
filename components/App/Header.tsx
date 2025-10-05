import Image from "next/image"
import Link from "next/link"
import styles from "@/styles/app/header.module.scss"


const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__image}>
        <Image src={"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%20103%2064'%3e%3cpath%20fill='%23FF5F00'%20d='M65.333%206.756H37.522v50.311h27.81V6.756Z'/%3e%3cpath%20fill='%23EB001B'%20d='M39.289%2032c0-10.222%204.767-19.289%2012.096-25.156C45.998%202.578%2039.2%200%2031.785%200%2014.214%200%200%2014.311%200%2032s14.215%2032%2031.784%2032c7.416%200%2014.215-2.578%2019.6-6.844C44.056%2051.289%2039.29%2042.133%2039.29%2032Z'/%3e%3cpath%20fill='%23F79E1B'%20d='M102.857%2032c0%2017.689-14.215%2032-31.784%2032-7.416%200-14.215-2.578-19.6-6.844C58.889%2051.289%2063.568%2042.222%2063.568%2032S58.801%2012.711%2051.473%206.844C56.858%202.578%2063.657%200%2071.073%200c17.57%200%2031.784%2014.311%2031.784%2032Z'/%3e%3c/svg%3e"} alt="Mastercard" fill />
      </div>

      <ul className={styles.header__list}>
        <li>
          <Link href={"#"} className={styles.header__link}>
            <span className={styles.header__link__text}>Home</span>
            <span className={styles.header__link__hover}>Home</span>
          </Link>
        </li>
        <li>
          <Link href={"#"} className={`${styles.header__link} ${styles.header__link__goal}`}>
            <span className={styles.header__link__text}>Goals</span>
            <span className={styles.header__link__hover}>Goals</span>
          </Link>
        </li>
      </ul>
      <button className={styles.header__button}>
        <svg className={styles.header__button__circle} width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="21.5" cy="21.5" r="21" stroke="#D57561" />
        </svg>
        <img className={styles.header__button__menu} src="/icons/menu.svg" alt="=" width={14} height={6} />
      </button>
    </header>
  )
}

export default Header
