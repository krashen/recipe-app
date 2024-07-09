const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm">
                <p className="text-lg font-semibold mb-4">{message}</p>
                <div className="flex justify-center">
                    <button onClick={onConfirm} className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
                        Yes
                    </button>
                    <button onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal