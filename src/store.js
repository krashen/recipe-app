import { create } from 'zustand'

const useStore = create((set) => ({
    loggedIn: false,
    logIn: () => set((state) => ({
        loggedIn: true
    })),
    logOut: () => set((state) => ({
        loggedIn: false
    })),
    token: '',
    setToken: (token) => set((state) => ({
        token
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