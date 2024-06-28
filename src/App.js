import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import useStore from './store'
import { Router, Route, Routes } from 'react-router-dom'

import RecipeList from './components/RecipeList.component'
import LogIn from './routes/LogIn'
import { get_recipes_url } from './endpoints'

function App() {

  const updateRecipeList = useStore((state) => state.updateRecipeList)
  const token = useStore((state) => state.token)
  const setToken = useStore((state) => state.setToken)


  useEffect(()=> {  
    if (token) {
      axios.get(get_recipes_url, { 
        headers: {
          'Authorization': `Token ${token}`
        } 
      })
      .then(r => {
        updateRecipeList(r.data) 
      })
      .catch(e => {
        console.log(e)
      });
    }
  },[token])

  const logOut = () => {
      localStorage.setItem('authToken', '')
      setToken('') 
  }
  return (
    <main>
      <a onClick={logOut}>Log out</a>
      {token ? <RecipeList /> : <LogIn /> }
    </main>    
  )
}

export default App;
