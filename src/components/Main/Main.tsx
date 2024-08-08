import { FC } from 'react'
import { RepositoryList } from '../RepositoryList/RepositoryList'
import { Sidebar } from '../Sidebar/Sidebar'
import styles from './Main.module.scss'

const Main: FC = () => {
  return (
    <main className={styles.main}>
      <RepositoryList />
      <Sidebar />
    </main>
  )
}

export { Main }
