import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import DOMPurify from 'dompurify'
import { get_recipes_url } from '../endpoints'
import useStore from '../store'
import TagLabel from '../components/TagLabel.component'
import LoadingSpinner from '../components/LoadingSpinner.component'
import ErrorMessage from '../components/ErrorMessage.component'
import ConfirmationModal from '../components/ConfirmationModal.component'

const Detail = () => {
    const { id } = useParams()
    const [recipe, setRecipe] = useState({})
    const token = useStore((state) => state.token)
    const loggedIn = useStore((state) => state.loggedIn)
    const navigate = useNavigate()
    const request_url = `${get_recipes_url}${id}/`
    const headers = { 'Authorization': `Token ${token}` }
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [recipeExists, setRecipeExists] = useState(false)
    const [prompt, setPrompt] = useState(false)

    useEffect(() => {
        if (!loggedIn) navigate('/')
        if (id) {
            axios.get(request_url, { headers })
                .then(r => {
                    setRecipe(r.data)
                    setLoading(false)
                    setError(false)
                    setRecipeExists(true)
                })
                .catch(e => {
                    console.log(e)
                    setLoading(false)
                    setError(true)
                    setErrorMessage('Error loading recipe')
                    setRecipeExists(false)
                });
        }
    }, [loggedIn])

    const deleteRecipe = () => {
        setPrompt(true)
    }

    const onConfirmDelete = () => {
        axios.delete(request_url, { headers })
            .then((r) => {
                navigate('/')
            })
            .catch((e) => {
                console.log('Error deleting', e)
                setLoading(false)
                setError(true)
                setErrorMessage('Error deleting recipe')
            })
    }

    const onCancelDelete = () => {
        setPrompt(false)
    }

    const ensureProtocol = (url) => {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return `http://${url}`
        }
        return url
    }

    const renderLineBreaks = (string) => {
        const convertedString = string.replace(/\n/g, '<br />')
        return DOMPurify.sanitize(convertedString, {
            ALLOWED_TAGS: ['br'],
        })
    }

    return (
        <div>
            {prompt && <ConfirmationModal message={'Delete this recipe?'} onConfirm={onConfirmDelete} onCancel={onCancelDelete} />}
            {loading && <LoadingSpinner />}
            <div className='mb-4'><Link className='p-1 px-4 rounded-md global-drop-shadow bg-fuchsia-900 text-white text-xs' to='/'>Back to list</Link></div>
            <h2 className='text-xl text-center mb-3 p-2 rounded-md global-drop-shadow bg-orange-100'>{recipe.title}</h2>
            {recipe.time_minutes && <span className='block text-center whitespace-nowrap text-fuchsia-900 text-sm'>{recipe.time_minutes} min</span>}
            {recipe.link && <h4 className='underline text-md text-sky-500 mb-2 text-right'><a href={ensureProtocol(recipe.link)} alt='external link'>{recipe.link}</a></h4>}
            {recipe.image && <div className='recipeCardImage h-28 bg-cover mb-4 rounded-md global-drop-shadow-in bg-center' style={{ backgroundImage: `url(${recipe.image})` }}></div>}

            {
                recipe.ingredients && (<div className='mb-4'><ul className='px-4'>{
                    recipe.ingredients.map((i) => {
                        return <li key={i.id}>- <Link className='hover:underline' to={`/recipes/ingredient/${i.id}`}>{i.name}</Link></li>
                    })
                }
                </ul></div>)
            }
            {recipe.description && (
                <div className='p-4 mb-4 rounded-md global-drop-shadow bg-orange-100' dangerouslySetInnerHTML={{ __html: renderLineBreaks(recipe.description) }}>
                </div>
            )}
            {
                recipe.tags && (<div className='mb-10'> {
                    recipe.tags.map((tag) => {
                        return <Link key={tag.id} to={`/recipes/tag/${tag.id}`}><TagLabel tag={tag} /></Link>
                    })
                }
                </div>)
            }
            {error && <ErrorMessage text={errorMessage} />}
            {recipeExists && (
                <div className='flex justify-between text-sm px-8'>
                    <Link className='p-1 px-4 mb-4 rounded-md global-drop-shadow bg-blue-400 text-white' to={`/recipe/${id}/edit`}>Edit</Link>
                    <button className='p-1 px-4 mb-4 rounded-md global-drop-shadow bg-red-500 text-white' onClick={deleteRecipe}>Delete</button>
                </div>
            )}

        </div >

    )
}

export default Detail