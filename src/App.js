import './App.css'

import useStore from './store'
import { Route, Routes, Link } from 'react-router-dom'
import RecipeList from './components/RecipeList.component'
import LogIn from './routes/LogIn'
import Detail from './routes/Detail'
import NotFound from './routes/NotFound'
import RecipeForm from './routes/RecipeForm'

function App() {
  const loggedIn = useStore((state) => state.loggedIn)
  const setToken = useStore((state) => state.setToken)
 

  const logOut = () => {
      localStorage.setItem('authToken', '')
      setToken('')
  }
  
  return (

    <div>
      <div>
          <h2><Link to='/'>This is laout loco</Link></h2>
          {loggedIn && <a onClick={logOut}>Log out</a>}
      </div>
      <Routes>       
        <Route index element={loggedIn ? <RecipeList /> : <LogIn />} />
        <Route path='recipes/tag/:id' element={loggedIn ? <RecipeList tag /> : <LogIn />} />
        <Route path='recipes/ingredient/:id' element={loggedIn ? <RecipeList ingredient /> : <LogIn />} />
        <Route path='recipe/add' element={<RecipeForm />} />
        <Route path='recipe/:id' element={<Detail />} />            
        <Route path='recipe/:id/edit' element={<RecipeForm edit />} />             
        <Route path='*' element={<NotFound />} />
      </Routes> 
    </div>   
  )
}

export default App;
