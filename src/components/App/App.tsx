import { FC } from 'react'
import { Footer, Header, Main } from '../'
import { Layout } from '../../containers'

const App: FC = () => {
	return <Layout header={<Header />} main={<Main />} footer={<Footer />} />
}

export { App }
