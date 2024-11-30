import React, { useState } from 'react';
import axios from 'axios';

interface Device {
    id: number;
    device_type: string;
    status: string;  
}

interface DeviceControlProps {
    device: Device;
}

const DeviceControl: React.FC<DeviceControlProps> = ({ device }) => {
    const [deviceStatus, setDeviceStatus] = useState(device.status);

    const toggleDevice = async () => {
        const newStatus = deviceStatus === 'on' ? 'off' : 'on';

        try {
            await axios.put(`/devices/${device.id}/toggle`, { status: newStatus });
            setDeviceStatus(newStatus);
        } catch (error) {
            console.error('Error toggling device:', error);
        }
    };

    return (
        <div>
            <h2>{device.device_type}</h2>
            <p>Status: {deviceStatus}</p>
            <button onClick={toggleDevice}>
                {deviceStatus === 'on' ? 'Turn Off' : 'Turn On'}
            </button>
        </div>
    );
};

export default DeviceControl;
