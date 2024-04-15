import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Auth/AuthContext';


function HomePage() {
  const nav = useNavigate()
  const {user} = useContext(AuthContext)
  useEffect(()=>nav(user? "/inbox" : '/login'), [])
  return (
    <div>
      
    </div>
  );
}

export default HomePage;