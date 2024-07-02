import axios from 'axios'
import { useState } from 'react'
import { get_token_url, create_user_url } from '../endpoints'
import useStore from '../store'

const LogIn = () => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [newUser, setNewUser] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatNewPassword, setRepeatNewPassword] = useState('')
    const setToken = useStore((state) => state.setToken)

    const axiosLogIn = (u, p) => {
        axios.post(get_token_url, { 'email': u, 'password': p })
            .then(r => {
                localStorage.setItem('authToken', r.data.token)
                setToken(r.data.token)
            }).catch(e => console.log(e))
    }

    const handleLogin = (e) => {
        e.preventDefault()
        axiosLogIn(user, password)
    }

    const handleNewUser = (e) => {
        e.preventDefault()
        axios.post(create_user_url,
            {
                'email': newUser,
                'password': newPassword,
                'name': newUser
            })
            .then(r => { axiosLogIn(newUser, newPassword) })
            .catch(e => console.log(e))
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input
                    type='email'
                    onChange={(e) => setUser(e.target.value)}
                    name='user'

                />
                <input
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    name='password'

                />
                <button type='submit'>Login</button>
            </form>
            <form onSubmit={handleNewUser}>
                <input
                    type='email'
                    onChange={(e) => setNewUser(e.target.value)}
                    name='newUser'

                />
                <input
                    type='password'
                    onChange={(e) => setNewPassword(e.target.value)}
                    name='newPassword'

                />
                <input
                    type='password'
                    onChange={(e) => setRepeatNewPassword(e.target.value)}
                    name='repeatNewPassword'

                />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LogIn