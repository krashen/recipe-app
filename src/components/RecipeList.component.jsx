import RecipeCard from './RecipeCard.component'
import useStore from '../store'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { get_recipes_url } from '../endpoints'
import { useLocation, Link, useParams } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner.component'
import ErrorMessage from './ErrorMessage.component'

const RecipeList = ({ tag, ingredient }) => {
    const { id } = useParams()
    const recipes = useStore((state) => state.recipes)
    const updateRecipeList = useStore((state) => state.updateRecipeList)
    const token = useStore((state) => state.token)
    const loggedIn = useStore((state) => state.loggedIn)
    const location = useLocation()
    const [filterText, setFilterText] = useState('')
    const [filtered, setFiltered] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    let request_url = `${get_recipes_url}`

    if (tag) {
        request_url = `${request_url}?tags=${id}`
    } else if (ingredient) {
        request_url = `${request_url}?ingredients=${id}`
    }

    useEffect(() => {
        if (loggedIn) {
            axios.get(request_url, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
                .then(r => {
                    //console.log(r.data)
                    updateRecipeList(r.data)
                    if (tag || ingredient) {
                        setFiltered(true)
                    } else {
                        setFiltered(false)
                    }
                    setLoading(false)
                    setError(false)
                })
                .catch(e => {
                    console.log(e)
                    setError(true)
                    setErrorMessage('Error loading recipes')
                });
        }
    }, [location, loggedIn])

    useEffect(() => {
        if (filtered) {
            setFilterText(recipes[0][tag ? 'tags' : 'ingredients'].find(f => f.id === parseInt(id))['name'])
        }
    }, [filtered])

    return (
        <div>
            {error && <ErrorMessage text={errorMessage} />}
            {loading && <LoadingSpinner />}
            {filtered && <div>
                <h4 className='text-sm pb-4'>Recipes with {tag ? 'tag' : ''}{ingredient ? 'ingredient' : ''}:
                    <span className='rounded-md mx-1 bg-teal-500 inline-block text-white p-1 px-2 text-xs global-drop-shadow'>{filterText}</span>
                    <Link onClick={(e) => { setLoading(true) }} className='text-xs underline' to='/'>Clear filter</Link>
                </h4>
            </div>
            }

            <div className='add-block text-center pb-3 md:flex md:justify-center'>
                <Link className='md:w-1/2 global-drop-shadow no-underline text-center font-bold p-2 rounded-md bg-orange-200 block text-fuchsia-900 text-sm' to='/recipe/add'>+ Add</Link>
            </div>
            <div className='md:flex md:flex-wrap'>
                {
                    recipes.map((recipe) => <Link className='' style={{ flex: '0 1 calc(50% - 10px)', margin: '5px' }} key={recipe.id} to={`/recipe/${recipe.id}/`}><RecipeCard key={recipe.id} recipe={recipe} /></Link>)
                }
            </div>
        </div>
    )
}

export default RecipeList