import { useRef, useState, useEffect } from 'react'
import InputList from '../components/InputList.component'
import axios from 'axios'
import { get_recipes_url } from '../endpoints'
import useStore from '../store'
import { useNavigate, useParams } from 'react-router-dom'

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
            ...t,
            title: t.name,
            id: t.name,
            text: t.name
        }
    })
}

const RecipeForm = ({ edit }) => {

    const { id } = useParams()

    const [tags, setTags] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [link, setLink] = useState('')
    const [description, setDescription] = useState('')
    const [timeMinutes, setTimeMinutes] = useState(0)
    const [imageFile, setImageFile] = useState(null)
    const [image, setImage] = useState('')

    const [requestSuccess, setRequestSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const imageInputRef = useRef(null)

    const token = useStore((state) => state.token)
    const loggedIn = useStore((state) => state.loggedIn)

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

        if (imageInputRef.current) {
            imageInputRef.current.value = null
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

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
                    const res_image = await axios(
                        {
                            url: `${get_recipes_url}${res_recipe.data.id}/`,
                            method: 'PATCH',
                            headers: header_multipart,
                            data: {
                                image: imageFile
                            }
                        }
                    )
                    navigate('/')
                } catch (e) {
                    console.log('Image uploading failed', e)
                }

            } else {
                navigate('/')
            }

        } catch (e) {
            console.log('Recipe posting failed', e)
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input required value={title} onChange={(e) => setTitle(e.target.value)} type='text' />
                <label>Minutes</label>
                <input required value={timeMinutes} onChange={(e) => setTimeMinutes(e.target.value)} min='0' type='number' />
                <label>Price</label>
                <input required value={price} onChange={(e) => setPrice(e.target.value)} min='0' step='0.01' type='number' />
                <label>Link</label>
                <input value={link} onChange={(e) => setLink(e.target.value)} type='text' />
                <label htmlFor="">Ingredients</label>
                <InputList
                    extraCSSClass='ingredients'
                    handleAdd={handleAddIngredient}
                    handleRemove={handleRemoveIngredient}
                    list={ingredients}
                    placeholder='Add ingredient'
                />
                <label htmlFor="">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <label htmlFor="">Image</label>
                <input onChange={handleFileChange} ref={imageInputRef} type='file' />
                {image && <div><img src={image} /> <button onClick={removeImage}>X</button></div>}

                <InputList
                    handleAdd={handleAddTag}
                    handleRemove={handleRemoveTag}
                    list={tags}
                    placeholder='Add tag'
                />
                <button>Pushiy</button>
            </form>

        </div>
    )
}

export default RecipeForm