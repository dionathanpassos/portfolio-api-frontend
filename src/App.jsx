import { Toaster } from 'react-hot-toast'
import './App.css'

import AppRoutes from './Routes/AppRoutes'


function App() {
  

  return (
    <>
    <AppRoutes/>
    <Toaster
    position='top-center'
    toastOptions={{
      style: {
        background: '#333',
        color: '#fff',
        
      }}
    }
    />
    </>
  )
}

export default App
