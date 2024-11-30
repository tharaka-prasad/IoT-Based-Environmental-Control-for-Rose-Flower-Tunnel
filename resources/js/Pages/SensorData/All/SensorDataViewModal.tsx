import React from 'react';

interface Sensor {
    id: number;
    sensor_type: string;
    value: number;
    created_at: string;
}

interface SensorDataViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    sensor: Sensor | null;
}

const SensorDataViewModal: React.FC<SensorDataViewModalProps> = ({ isOpen, onClose, sensor }) => {
    if (!isOpen || !sensor) return null;

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full p-6">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">View Sensor Data</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Sensor Type</label>
                        <p className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">{sensor.sensor_type}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Value</label>
                        <p className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">{sensor.value}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Created At</label>
                        <p className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">{sensor.created_at}</p>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-md"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SensorDataViewModal;
