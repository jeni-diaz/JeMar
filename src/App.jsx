import { useState } from 'react'
import './App.css'

import Header from './Components/Header/header';
import Footer from './Components/Footer/footer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      
      <Footer />

    </>
  )
}

export default App
