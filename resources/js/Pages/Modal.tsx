import React from 'react';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    title?: string;
    content?: string;
}

const CustomModal: React.FC<ModalProps> = ({ show, onClose, title, content }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg z-10 max-w-md mx-auto">
                {title && <h3 className="text-xl font-bold mb-4 text-gray-900 ">{title}</h3>}
                {content && <p className="text-gray-800 dark:text-gray-300">{content}</p>}
                <button
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default CustomModal;
