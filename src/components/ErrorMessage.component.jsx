const ErrorMessage = ({ text }) => {
    return (
        <div className='rounded text-red-500 p-2 mb-4 border-2 border-red-500 md:border-none'>{text}</div>
    )
}

export default ErrorMessage