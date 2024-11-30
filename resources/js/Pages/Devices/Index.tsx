import React from 'react';
import DeviceControl from './DeviceControl';

const ParentComponent: React.FC = () => {
    const devices = [
        { id: 1, device_type: 'Pump', status: 'on' },
        { id: 2, device_type: 'Fan', status: 'off' },
        // More devices
    ];

    return (
        <div>
            {devices.map(device => (
                <DeviceControl key={device.id} device={device} />
            ))}
        </div>
    );
};

export default ParentComponent;
