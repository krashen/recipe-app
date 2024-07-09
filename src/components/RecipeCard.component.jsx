import TagLabel from './TagLabel.component'

const RecipeCard = ({ recipe }) => {
    const tags = recipe.tags

    return (
        <div className='recipeCard global-drop-shadow p-2 rounded-md bg-orange-200 mb-4 '>
            <h2 className='text-xl mb-3'>{recipe.title} <span className='whitespace-nowrap text-fuchsia-900 text-sm'>- {recipe.time_minutes} min</span></h2>
            <div className='recipeCardDetails'>
                {recipe.image && <div className='rounded-md recipeCardImage h-36 bg-cover mb-2' style={{ backgroundImage: `url(${recipe.image})` }}></div>}
                {tags && tags.length > 0 ? (<div className='recipeCardTags'>
                    {tags.map((tag, i) => <TagLabel tag={tag} key={i} />)}
                </div>
                ) : (
                    <p></p>
                )
                }
            </div>
        </div>

    )
}

export default RecipeCard