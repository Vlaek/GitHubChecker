import { FC } from 'react'
import { Footer, Header, RepositoryList } from '../'
import { Layout } from '../../container'

const App: FC = () => {
  return <Layout header={<Header />} main={<RepositoryList />} footer={<Footer />} />
}

export { App }
