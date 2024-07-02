import { useState } from 'react'
import InputList from '../components/InputList.component'

const RecipeForm = ({ recipe }) => {

    const [tags, setTags] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [link, setLink] = useState('')
    const [description, setDescription] = useState('')
    const [timeMinutes, setTimeMinutes] = useState(0)
    const [image, setImage] = useState(null)



    const handleRemoveTag = (i) => {
        setTags(tags.filter((tag, index) => index !== i))
    }

    const handleAddTag = (tag) => {
        setTags([...tags, tag])
    }

    const handleRemoveIngredient = (i) => {
        setIngredients(ingredients.filter((ingredient, index) => index !== i))
    }

    const handleAddIngredient = (ingredient) => {
        setIngredients([...ingredients, ingredient])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(tags, ingredients)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input type='text' />
            <label>Minutes</label>
            <input min='0' type='number' />
            <label>Price</label>
            <input min='0' step='0.01' type='number' />
            <label>Link</label>
            <input type='text' />
            <label htmlFor="">Ingredients</label>
            <InputList
                extraCSSClass='ingredients'
                handleAdd={handleAddIngredient}
                handleRemove={handleRemoveIngredient}
                list={ingredients}
                placeholder='Add ingredient'
            />
            <label htmlFor="">Description</label>
            <textarea></textarea>
            <label htmlFor="">Image</label>
            <input type='file' />
            <InputList
                handleAdd={handleAddTag}
                handleRemove={handleRemoveTag}
                list={tags}
                placeholder='Add tag'
            />
            <button>Pushiy</button>
        </form>
    )
}

export default RecipeForm