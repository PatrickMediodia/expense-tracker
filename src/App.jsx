import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import Home from './components/Home';
import "./fonts/Roboto-Medium.ttf"

function App() {
  return (
    <div >
      <Navbar />
      <Home />
      <Footer />
    </div>

  );
}

export default App
