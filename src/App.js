import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import useStore from './store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import RecipeList from './components/RecipeList.component'
import LogIn from './routes/LogIn'
import { get_recipes_url } from './endpoints'

import Detail from './routes/Detail'
import NotFound from './routes/NotFound'
import RecipeForm from './routes/RecipeForm'

function App() {

  const updateRecipeList = useStore((state) => state.updateRecipeList)
  const token = useStore((state) => state.token)
  const loggedIn = useStore((state) => state.loggedIn)
  const setToken = useStore((state) => state.setToken)


  useEffect(()=> {  
    if (loggedIn) {
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
  },[loggedIn])

  const logOut = () => {
      localStorage.setItem('authToken', '')
      setToken('')
  }
  
  return (

    <BrowserRouter>
      <div>
          <h2>This is laout loco</h2>
          {loggedIn && <a onClick={logOut}>Log out</a>}
  
      </div>
      <Routes>       
        <Route index element={loggedIn ? <RecipeList /> : <LogIn />} />
        <Route path='recipe/add' element={<RecipeForm />} />
        <Route path='recipe/:id' element={<Detail />} />      
              
        <Route path='*' element={<NotFound />} />
      </Routes> 
    </BrowserRouter>   
  )
}

export default App;
