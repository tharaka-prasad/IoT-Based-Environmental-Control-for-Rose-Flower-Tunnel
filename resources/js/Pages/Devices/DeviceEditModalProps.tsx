import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

interface Device {
    id: number;
    device_type: string;
    status: string;
}

interface DeviceEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    device: Device;
}

const DeviceEditModal: React.FC<DeviceEditModalProps> = ({ isOpen, onClose, device }) => {
    const { data, setData, put, reset, errors } = useForm({
        device_type: '',
        status: '',
    });

    useEffect(() => {
        if (device) {
            setData({
                device_type: device.device_type,
                status: device.status,
            });
        }
    }, [device]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('devices.update', device.id), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-1/3">
                <h2 className="text-lg font-semibold">Edit Device</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Device Type</label>
                        <input
                            type="text"
                            value={data.device_type}
                            onChange={(e) => setData('device_type', e.target.value)}
                            className="mt-1 block w-full border rounded-md"
                        />
                        {errors.device_type && <p className="text-red-500">{errors.device_type}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            className="mt-1 block w-full border rounded-md"
                        >
                            <option value="off">Off</option>
                            <option value="on">On</option>
                        </select>
                        {errors.status && <p className="text-red-500">{errors.status}</p>}
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DeviceEditModal;
