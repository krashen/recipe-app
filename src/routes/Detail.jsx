import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { get_recipes_url } from '../endpoints'
import useStore from '../store'



const Detail = () => {
    const { id } = useParams()
    const [recipe, setRecipe] = useState({})
    const token = useStore((state) => state.token)
    const loggedIn = useStore((state) => state.loggedIn)
    const navigate = useNavigate()


    useEffect(() => {
        if (!loggedIn) navigate('/')
        if (id) {
            axios.get(`${get_recipes_url}${id}/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
                .then(r => {
                    setRecipe(r.data)
                })
                .catch(e => {
                    console.log(e)
                });
        }
    })

    return (
        <div>
            <h2>{recipe.title}</h2>
            <h4>Time: {recipe.time_minutes}</h4>
            <h4>Price: {recipe.price}</h4>
            <h4>Link: {recipe.link}</h4>
            <div>Tags: gfg fg fgf gf</div>
            <div>Ingredients: dfs ds fs fsdf</div>
            <div>Desription: {recipe.description}</div>
            <img alt='banca vieji' src={recipe.image} />

        </div>

    )
}

export default Detail