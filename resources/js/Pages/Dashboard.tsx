import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface DashboardProps {
    auth: {
        user: {
            name: string;
        };
    };
}

interface SensorData {
    temperature: number;
    humidity: number;
    soil_moisture: number;
    gas: number;
    ldr: number;
    recorded_at: string;
}

interface DailyData {
    temperature_avg: number;
    humidity_avg: number;
    soil_moisture_avg: number;
    gas_avg: number;
    ldr_avg: number;
}

const Dashboard: React.FC<DashboardProps> = ({ auth }) => {
    const [sensorData, setSensorData] = useState<SensorData[]>([]);
    const [dailyData, setDailyData] = useState<DailyData | null>(null);

    useEffect(() => {
        const fetchSensorData = async () => {
            try {
                const response = await axios.get('fetch-thingspeak-data');
                setSensorData(response.data.sensors);
            } catch (error) {
                console.error("Error fetching latest sensor data:", error);
            }
        };

        const fetchDailyData = async () => {
            try {
                const response = await axios.get('/data-analyze/daily');
                setDailyData(response.data);
            } catch (error) {
                console.error("Error fetching daily data:", error);
            }
        };

        fetchSensorData();
        fetchDailyData();
        const interval = setInterval(fetchSensorData, 20000);

        return () => clearInterval(interval);
    }, []);

    const latestData = sensorData.length > 0 ? sensorData[0] : null;

    const chartData = {
        labels: ["Temperature", "Humidity", "Soil Moisture", "Gas", "Light Intensity"],
        datasets: [
            {
                label: "Daily Average",
                data: dailyData
                    ? [
                        dailyData.temperature_avg,
                        dailyData.humidity_avg,
                        dailyData.soil_moisture_avg,
                        dailyData.gas_avg,
                        dailyData.ldr_avg,
                      ]
                    : [0, 0, 0, 0, 0],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                tension: 0.3,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Daily Environmental Data Averages",
            },
        },
    };

    // Logic for actuator status messages
    const getPumpStatus = (soilMoisture: number) => {
        return soilMoisture > 71 ? "Pump is on (soil moisture low)" : soilMoisture < 70 ? "Pump is off (soil moisture high)" : "Pump status unchanged";
    };

    const getLEDStatus = (ldr: number) => {
        return ldr > 70 ? "LED is on (low light detected)" : "LED is off (sufficient light)";
    };

    const getFanStatus = (temperature: number) => {
        return temperature > 25 ? "Fan is on (high temperature)" : "Fan is off (normal temperature)";
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Rose Flower Tunnel Dashboard</h2>}
        >
            <Head title="Rose Flower Tunnel Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white shadow sm:rounded-lg p-6">
                        <h3 className="text-2xl font-bold text-gray-700">Welcome, {auth.user.name}!</h3>
                        <p className="text-gray-500 mt-2">Here's the monitoring and analysis dashboard for your IoT-based Rose Flower Tunnel.</p>
                    </div>

                    <div className="bg-green-100 p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold text-green-800">Project Overview</h3>
                        <p className="text-green-700 mt-1">
                            This IoT-based project helps monitor and optimize the growing conditions within the Rose Flower Tunnel. Sensors continuously track key environmental factors like temperature, humidity, soil moisture, and light intensity, ensuring ideal conditions for rose growth.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                        <div className="bg-white p-4 shadow rounded-lg">
                            <h4 className="font-bold text-gray-900">Temperature</h4>
                            <p className="text-green-500">
                                Current: {latestData ? `${latestData.temperature}°C` : "Loading..."}
                            </p>
                            <p className="text-md text-red-600">
                                {latestData ? getFanStatus(latestData.temperature) : "Loading..."}
                            </p>
                        </div>
                        <div className="bg-white p-4 shadow rounded-lg">
                            <h4 className="font-bold text-gray-900">Humidity</h4>
                            <p className="text-green-500">
                                Current: {latestData ? `${latestData.humidity}%` : "Loading..."}
                            </p>
                        </div>
                        <div className="bg-white p-4 shadow rounded-lg">
                            <h4 className="font-bold text-gray-900">Soil Moisture</h4>
                            <p className="text-green-500">
                                Current: {latestData ? `${latestData.soil_moisture}%` : "Loading..."}
                            </p>
                            <p className="text-md  text-red-600">
                                {latestData ? getPumpStatus(latestData.soil_moisture) : "Loading..."}
                            </p>
                        </div>
                        <div className="bg-white p-4 shadow rounded-lg">
                            <h4 className="font-bold text-gray-900">Light Intensity</h4>
                            <p className="text-green-500">
                                Current: {latestData ? `${latestData.ldr}%` : "Loading..."}
                            </p>
                            <p className="text-md text-red-600">
                                {latestData ? getLEDStatus(latestData.ldr) : "Loading..."}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white shadow sm:rounded-lg p-6 mt-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Daily Environmental Data Analysis</h3>
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
