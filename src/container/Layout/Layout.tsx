import { FC, ReactElement } from 'react'
import styles from './Layout.module.scss'

interface ILayoutProps {
  header: ReactElement
  main: ReactElement
  footer: ReactElement
}

const Layout: FC<ILayoutProps> = (props) => {
  const { header, main, footer } = props

  return (
    <div className={styles.wrapper}>
      <>{header}</>
      <>{main}</>
      <>{footer}</>
    </div>
  )
}

export { Layout }
