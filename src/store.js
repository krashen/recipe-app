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
    })),
    removeRecipe: (idToRemove) => set((state) => ({
        recipes: state.recipes.filter(recipe => recipe.id !== idToRemove)
    }))
}))

export default useStore