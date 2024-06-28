import RecipeCard from './RecipeCard.component'
import useStore from '../store'

const RecipeList = () => {
    const recipes = useStore((state) => state.recipes)

    return (
        <div>
            {
                recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
            }
        </div>
    )
}

export default RecipeList