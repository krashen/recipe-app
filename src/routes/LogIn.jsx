import axios from 'axios'
import { useState } from 'react'
import { get_token_url, create_user_url } from '../endpoints'
import useStore from '../store'
import LoadingSpinner from '../components/LoadingSpinner.component'
import ErrorMessage from '../components/ErrorMessage.component'

const LogIn = () => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [newUser, setNewUser] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatNewPassword, setRepeatNewPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [error, setError] = useState(false)

    const setToken = useStore((state) => state.setToken)


    const axiosLogIn = (u, p) => {
        axios.post(get_token_url, { 'email': u, 'password': p })
            .then(r => {
                localStorage.setItem('authToken', r.data.token)
                setToken(r.data.token)
            }).catch((e) => {
                console.log(e)
                setError(true)
                setLoading(false)
                setErrorMessage('Error logging in')
            })
    }

    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true)
        axiosLogIn(user, password)
    }

    const handleNewUser = (e) => {
        e.preventDefault()
        if (newPassword !== repeatNewPassword) {
            setError(true)
            setErrorMessage('Passwords must match')
            return
        }
        setLoading(true)
        axios.post(create_user_url,
            {
                'email': newUser,
                'password': newPassword,
                'name': newUser
            })
            .then(r => { axiosLogIn(newUser, newPassword) })
            .catch((e) => {
                console.log(e)
                setLoading(false)
                setError(true)
                setErrorMessage('Error creating user')
            })
    }

    return (
        <div className='loginForm'>
            {loading && <LoadingSpinner />}

            <div className='md:flex'>
                <div className='pb-2 border-b-2 mb-6 border-orange-200 md:border-none md:w-1/2  md:pr-4'>
                    <h2 className='text-xl pb-4 text-fuchsia-900'>Login here</h2>
                    <form onSubmit={handleLogin}>
                        <label>Email</label>
                        <input
                            type='email'
                            onChange={(e) => setUser(e.target.value)}
                            name='user'
                            required
                        />
                        <label>Password</label>
                        <input
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                            name='password'
                            required
                        />
                        <button disabled={loading} className='p-1 px-4 mb-4 rounded-md global-drop-shadow bg-blue-400 text-white' type='submit'>Login</button>
                    </form>
                </div>
                {error && <ErrorMessage text={errorMessage} />}
                <div className='md:w-1/2 md:pl-4'>
                    <h2 className='text-xl pb-4 text-fuchsia-900'>Don't have an account?<br />Create one!</h2>
                    <form onSubmit={handleNewUser}>
                        <label htmlFor="">Email</label>
                        <input
                            type='email'
                            onChange={(e) => setNewUser(e.target.value)}
                            name='newUser'
                            required
                        />
                        <label htmlFor="">Create password</label>
                        <input
                            type='password'
                            onChange={(e) => setNewPassword(e.target.value)}
                            name='newPassword'
                            required
                            placeholder='Min length 5 characters'
                        />
                        <label>Repeat password</label>
                        <input
                            type='password'
                            onChange={(e) => setRepeatNewPassword(e.target.value)}
                            name='repeatNewPassword'
                            required
                        />
                        <button disabled={loading} className='p-1 px-4 mb-4 rounded-md global-drop-shadow bg-teal-500 text-white' type='submit'>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LogIn