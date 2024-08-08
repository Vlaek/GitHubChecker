import { FC } from 'react'
import styles from './Header.module.scss'
import { SearchBar } from '../SearchBar/SearchBar'

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <SearchBar />
    </header>
  )
}

export { Header }
