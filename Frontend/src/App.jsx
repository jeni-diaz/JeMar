import { useState } from 'react'

import Header from './Components/Header/header';
import Footer from './Components/Footer/footer';
import ActionButtons from './Components/ActionButtons/action-buttons';
import Box from './Components/Box/box';

import './App.css';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className='fondo'>
        <Header />
        <ActionButtons />
        <Footer /> 
      </div>  
    </>
  );
}

export default App
