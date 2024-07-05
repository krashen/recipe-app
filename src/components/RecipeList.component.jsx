import RecipeCard from './RecipeCard.component'
import useStore from '../store'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { get_recipes_url } from '../endpoints'
import { useLocation, Link, useParams } from 'react-router-dom'

const RecipeList = ({ tag, ingredient }) => {
    const { id } = useParams()
    const recipes = useStore((state) => state.recipes)
    const updateRecipeList = useStore((state) => state.updateRecipeList)
    const token = useStore((state) => state.token)
    const loggedIn = useStore((state) => state.loggedIn)
    const location = useLocation()
    const [filterText, setFilterText] = useState('')
    const [filtered, setFiltered] = useState(false)
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
                    //console.log(r)
                    updateRecipeList(r.data)
                    if (tag || ingredient) {
                        setFiltered(true)
                    } else {
                        setFiltered(false)
                    }
                })
                .catch(e => {
                    console.log(e)
                });
        }
    }, [location])

    useEffect(() => {
        if (filtered) {
            setFilterText(recipes[0][tag ? 'tags' : 'ingredients'].find(f => f.id === parseInt(id))['name'])
        }
    }, [filtered])

    return (
        <div>
            {filtered && <div>
                <h4>Recipes with {tag ? 'tag' : 'ingredient'}: {filterText}</h4>
                <Link to='/'>Clear filter</Link>
            </div>
            }

            <Link to='/recipe/add'>+Add</Link>
            {
                recipes.map((recipe) => <Link key={recipe.id} to={`/recipe/${recipe.id}/`}><RecipeCard key={recipe.id} recipe={recipe} /></Link>)
            }
        </div>
    )
}

export default RecipeList