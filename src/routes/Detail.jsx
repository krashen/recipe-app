import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { get_recipes_url } from '../endpoints'
import useStore from '../store'



const Detail = () => {
    const { id } = useParams()
    const [recipe, setRecipe] = useState({})
    const token = useStore((state) => state.token)
    const loggedIn = useStore((state) => state.loggedIn)
    const navigate = useNavigate()
    const request_url = `${get_recipes_url}${id}/`
    const headers = { 'Authorization': `Token ${token}` }

    useEffect(() => {
        if (!loggedIn) navigate('/')
        if (id) {
            axios.get(request_url, { headers })
                .then(r => {
                    setRecipe(r.data)
                })
                .catch(e => {
                    console.log(e)
                });
        }
    }, [])

    const handleDelete = () => {
        if (window.confirm('Delete this recipe?')) {
            axios.delete(request_url, { headers })
                .then((r) => {
                    navigate('/')
                })
                .catch(e => console.log('Error deleting', e))
        }
    }

    return (
        <div>
            <h2>{recipe.title}</h2>
            <h4>Time: {recipe.time_minutes}</h4>
            <h4>Price: {recipe.price}</h4>
            <h4>Link: {recipe.link}</h4>
            {recipe.tags && (<div> Tags: {
                recipe.tags.map((t) => {
                    return <p key={t.id}><Link to={`/recipes/tag/${t.id}`}>{t.name}</Link></p>
                })
            }
            </div>)
            }
            {recipe.ingredients && (<div> Ingredients: {
                recipe.ingredients.map((i) => {
                    return <p key={i.id}><Link to={`/recipes/ingredient/${i.id}`}>{i.name}</Link></p>
                })
            }
            </div>)
            }

            <div>Desription: {recipe.description}</div>
            <img alt='banca vieji' src={recipe.image} />
            <Link to={`/recipe/${id}/edit`}>Editalo crack</Link>
            <button onClick={handleDelete}>Delete</button>
        </div>

    )
}

export default Detail