import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { IndexPage } from './pages'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<IndexPage />} />
    </Routes>
  </BrowserRouter>
)

export default App
