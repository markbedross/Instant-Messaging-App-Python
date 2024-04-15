import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function HomePage(props) {
  const nav = useNavigate()
  useEffect(()=>nav("/inbox"), [])
  return (
    <div>
      
    </div>
  );
}

export default HomePage;