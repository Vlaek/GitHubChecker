import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './shared/styles/global.scss'
import { Provider } from 'react-redux'
import store from './store/store'
import { App } from './components'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
