const TagLabel = ({ tag }) => {
    return (
        <span className='rounded-md mx-1 bg-teal-500 inline-block text-white p-1 px-2 text-xs global-drop-shadow'>{tag.name}</span>
    )
}

export default TagLabel