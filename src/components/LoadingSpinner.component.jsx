const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center min-h-screen z-50">
            <div className="w-16 h-16">
                <svg className="w-full h-full animate-spin text-orange-300" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="4" />
                    <circle cx="25" cy="5" r="4" fill="currentColor" />
                </svg>
            </div>
        </div>
    )
}

export default LoadingSpinner