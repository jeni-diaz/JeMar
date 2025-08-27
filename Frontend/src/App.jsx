import { useState } from 'react'

import Header from './Components/Header/header';
import Footer from './Components/Footer/footer';
import ActionButtons from './Components/ActionButtons/action-buttons';

import './App.css'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <ActionButtons />
      <Footer />   
    </>
  )
}

export default App
