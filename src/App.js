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

    <div id='main' className='p-3 pb-8 md:max-w-screen-md mx-auto'>
      <div className='container bg-white p-4 rounded-lg global-drop-shadow mb-6'>
        <Link to='/' className='block mx-auto '><img className='mx-auto w-1/3 md:w-40' alt='logo' src={`${process.env.PUBLIC_URL}/recipes_logo_short.png`} /></Link>
        {loggedIn && (
          <nav className='pb-2 flex justify-between'>
            <Link to='/' className='p-1 px-4 mb-4 rounded-md global-drop-shadow bg-blue-400 text-white'>Go back</Link>    
            <button className='underline text-xs font-bold text-zinc-400' onClick={logOut}>Logout</button>
          </nav>
        )}
        <main>
          <Routes>       
            <Route index element={loggedIn ? <RecipeList /> : <LogIn />} />
            <Route path='recipes/tag/:id' element={loggedIn ? <RecipeList tag /> : <LogIn />} />
            <Route path='recipes/ingredient/:id' element={loggedIn ? <RecipeList ingredient /> : <LogIn />} />
            <Route path='recipe/add' element={<RecipeForm />} />
            <Route path='recipe/:id' element={<Detail />} />            
            <Route path='recipe/:id/edit' element={<RecipeForm edit />} />             
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
        
      </div>
      <footer className='text-xs text-center font-bold text-stone-500 '>App by <a className='underline' alt='App by Pablo Ferreyra' href='https://github.com/krashen'>Pablo Ferreyra</a></footer> 
    </div>   
  )
}

export default App;
