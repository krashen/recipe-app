import { create } from 'zustand'

const token = localStorage.getItem('authToken')

const useStore = create((set) => ({
    loggedIn: !!token,
    token,
    setToken: (token) => set((state) => ({
        token,
        loggedIn: !!token
    })),
    recipes: [],
    updateRecipeList: (recipesList) => set((state) => ({
        recipes: recipesList
    }))
}))

export default useStore