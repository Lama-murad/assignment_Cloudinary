import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import Image from './images/images'
import Tags from './tags/tags';


function App() {
  const imageUrl = "https://picsum.photos/v2/list?limit=100";
  
  const [image, setImg] = useState([]);

  return (
    <div className="App">
      <header className="App-header">

        <Tags />

        <Image />
   
      </header>
    </div>
  );
}

export default App;
