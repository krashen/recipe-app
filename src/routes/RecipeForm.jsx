import { useRef, useState, useEffect } from 'react'
import InputList from '../components/InputList.component'
import LoadingSpinner from '../components/LoadingSpinner.component'
import axios from 'axios'
import { get_recipes_url } from '../endpoints'
import useStore from '../store'
import { useNavigate, useParams, Link } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage.component'

const formatListToSend = (l) => {
    return l.map((t) => {
        return {
            name: t.text
        }
    })
}

const formatListToRender = (l) => {
    return l.map((t) => {
        return {
            id: t.name,
            text: t.name,
            className: ''
        }
    })
}

const RecipeForm = ({ edit }) => {

    const { id } = useParams()
    const [tags, setTags] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(1)
    const [link, setLink] = useState('')
    const [description, setDescription] = useState('')
    const [timeMinutes, setTimeMinutes] = useState(0)
    const [imageFile, setImageFile] = useState(null)
    const [image, setImage] = useState('')
    const imageInputRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [error, setError] = useState(false)

    const token = useStore((state) => state.token)
    const loggedIn = useStore((state) => state.loggedIn)
    const cancelUrl = edit ? `/recipe/${id}` : '/'

    const headers = {
        'Authorization': `Token ${token}`
    }
    const method = edit ? 'PUT' : 'POST'
    const request_url = `${get_recipes_url}${edit ? id + '/' : ''}`
    const header_multipart = {
        ...headers,
        'Content-Type': 'multipart/form-data',
    }

    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedIn) navigate('/')
        if (id && edit) {
            axios.get(`${get_recipes_url}${id}/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
                .then(r => {
                    const re = r.data

                    setTags(formatListToRender(re.tags))
                    setIngredients(formatListToRender(re.ingredients))
                    setTitle(re.title)
                    setPrice(parseFloat(re.price))
                    setLink(re.link)
                    setDescription(re.description)
                    setTimeMinutes(parseInt(re.time_minutes))
                    setImage(re.image)
                })
                .catch(e => {
                    console.log(e)
                });
        }
    }, [])

    const handleRemoveTag = (i) => { setTags(tags.filter((tag, index) => index !== i)) }
    const handleAddTag = (tag) => { setTags([...tags, tag]) }
    const handleRemoveIngredient = (i) => { setIngredients(ingredients.filter((ingredient, index) => index !== i)) }

    const handleAddIngredient = (ingredient) => {
        console.log(ingredients, ingredient)
        setIngredients([...ingredients, ingredient])
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]

        if (file) {
            setImage(URL.createObjectURL(file))
            setImageFile(file)
        }
    }

    const removeImage = (e) => {
        setImage('')
        setImageFile(null)

        if (imageInputRef.current) { imageInputRef.current.value = null }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = {
            title,
            time_minutes: timeMinutes,
            price,
            link,
            ingredients: formatListToSend(ingredients),
            description,
            tags: formatListToSend(tags)
        }

        try {
            const res_recipe = await axios(
                {
                    url: request_url,
                    method,
                    data: formData,
                    headers,
                }
            )

            if (imageFile) {
                try {
                    await axios(
                        {
                            url: `${get_recipes_url}${res_recipe.data.id}/`,
                            method: 'PATCH',
                            headers: header_multipart,
                            data: {
                                image: imageFile
                            }
                        }
                    )
                    navigate(`/recipe/${res_recipe.data.id}`)
                } catch (e) {
                    setLoading(false)
                    setError(true)
                    setErrorMessage('Image uploading failed')
                    console.log('Image uploading failed', e)
                }

            } else {
                navigate(`/recipe/${res_recipe.data.id}`)
            }

        } catch (e) {
            setLoading(false)
            setError(true)
            setErrorMessage('Recipe posting failed')
            console.log('Recipe posting failed', e)
        }

    }

    return (
        <div>
            {loading && <LoadingSpinner />}
            <form className='recipeForm' onSubmit={handleSubmit}>

                <label>Title</label>
                <input required value={title} onChange={(e) => setTitle(e.target.value)} type='text' />
                <label>Minutes</label>
                <input className='numberInput' required value={timeMinutes} onChange={(e) => setTimeMinutes(e.target.value)} min='0' type='number' />
                <label>Link</label>
                <input value={link} onChange={(e) => setLink(e.target.value)} type='text' />
                <label htmlFor="">Ingredients</label>
                <InputList
                    extraCSSClass='ingredients'
                    handleAdd={handleAddIngredient}
                    handleRemove={handleRemoveIngredient}
                    list={ingredients}
                    placeholder='Add ingredient and hit Enter'
                />
                <label htmlFor="">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <label htmlFor="">Image</label>
                {image && <div className='recipeImagePreview'><img alt='recipe image' src={image} /> {!edit && <button onClick={removeImage}>Delete</button>}</div>}

                <div className='pb-6'>
                    <input className='recipeImageInput' onChange={handleFileChange} ref={imageInputRef} type='file' />
                </div>

                <div className='pb-8 mb-8'>
                    <InputList
                        handleAdd={handleAddTag}
                        extraCSSClass='tags'
                        handleRemove={handleRemoveTag}
                        list={tags}
                        placeholder='Add tag and hit Enter'
                    />
                </div>


                {error && <ErrorMessage text={errorMessage} />}
                <div className='flex justify-between text-sm px-8'>
                    <Link className='p-1 px-4 mb-4 rounded-md global-drop-shadow bg-red-500 text-white' to={cancelUrl}>Cancel</Link>
                    <button disabled={loading} type='submit' className='p-1 px-4 mb-4 rounded-md global-drop-shadow bg-blue-400 text-white'>Save</button>
                </div>
            </form>

        </div>
    )
}

export default RecipeForm