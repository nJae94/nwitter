import React, { useState } from 'react';
import AppRouter from 'components/Router';
import fbase from 'fbase';



function App() {

  const authService = fbase.auth();
  
  console.log(authService.currentUser);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
    <AppRouter isLogged={isLoggedIn}/>

  <footer>&copy; {new Date().getFullYear()}Nwitter</footer>
    </>
      
    
  );
}

export default App;
