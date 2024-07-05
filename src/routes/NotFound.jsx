import { useEffect } from 'react'
import useStore from '../store'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const loggedIn = useStore((state) => state.loggedIn)
    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedIn) navigate('/')
    })
    return (
        <h2>No se de que hablás papu</h2>
    )
}

export default NotFound