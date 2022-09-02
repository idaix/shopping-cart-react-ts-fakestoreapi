import './App.css'

import { Route, Routes } from 'react-router-dom'
// import from components
import Navbar from './components/Navbar'
import { About, Home, Store } from './pages'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
// import from pages

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <main className="px-1 py-3 bg-slate-100 dark:bg-slate-800 dark:text-white">
        <div className="container mx-auto">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/store' element={<Store />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </div>
      </main>
    </ShoppingCartProvider>
  )
}

export default App
