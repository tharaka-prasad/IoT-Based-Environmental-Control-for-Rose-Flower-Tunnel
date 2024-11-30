import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import SensorDataViewModal from '@/Pages/SensorData/All/SensorDataViewModal';
import { useEffect, useState } from 'react';

interface Sensor {
    id: number;
    temperature: number;
    humidity: number;
    soil_moisture: number;
    gas: number;
    ldr: number;
    recorded_at: string;
}

interface SensorDataProps extends PageProps {
    sensors: Sensor[];
}

const SensorDataIndex: React.FC<SensorDataProps> = ({ auth, sensors = [] }) => {
    const [thingSpeakData, setThingSpeakData] = useState<Sensor[]>(sensors);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);

    const openViewModal = (sensor: Sensor) => {
        setSelectedSensor(sensor);
        setIsViewModalOpen(true);
    };
    const closeViewModal = () => setIsViewModalOpen(false);
    const openEditModal = (sensor: Sensor) => {
        setSelectedSensor(sensor);
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => setIsEditModalOpen(false);

    useEffect(() => {
        fetchThingSpeakData();
        const interval = setInterval(fetchThingSpeakData, 20000);
        return () => clearInterval(interval);
    }, []);

    const fetchThingSpeakData = async () => {
        try {
            const response = await axios.get('/fetch-thingspeak-data');

            if (response.data.sensors) {
                setThingSpeakData(response.data.sensors);
                console.log('Fetched data:', response.data.sensors);
            } else {
                console.warn("No data available");
            }
        } catch (error) {
            console.error('Error fetching ThingSpeak data:', error);
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Sensor Data</h2>}
        >
            <Head title="Sensor Data" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium">Sensor Data List</h3>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="px-4 py-2 text-left">ID</th>
                                            <th className="px-4 py-2 text-left">Temperature (°C)</th>
                                            <th className="px-4 py-2 text-left">Timestamp</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {thingSpeakData.length > 0 ? (
                                            thingSpeakData.map((feed: Sensor, index: number) => (
                                                <tr key={index} className="border-t">
                                                    <td className="px-4 py-2">{index + 1}</td>
                                                    <td className="px-4 py-2">{feed.temperature}</td>

                                                    <td className="px-4 py-2">{new Date(feed.recorded_at).toLocaleString()}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={7} className="py-2 px-4 text-center">No data available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
};

export default SensorDataIndex;
