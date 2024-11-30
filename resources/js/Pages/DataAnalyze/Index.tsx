import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
    }[];
}

const DataAnalyzeIndex: React.FC = () => {
    const [data, setData] = useState<ChartData>({
        labels: ['Temperature', 'Humidity', 'Soil Moisture', 'Gas', 'LDR'],
        datasets: [
            {
                label: 'Data',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    });
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [timePeriod, setTimePeriod] = useState<string>('daily');

    useEffect(() => {
        fetchData();
    }, [selectedDate, timePeriod]);

    const fetchData = async () => {
        try {
            let url = '';
            if (timePeriod === 'daily' && selectedDate) {
                const formattedDate = selectedDate.toISOString().split('T')[0];
                url = `/data-analyze/date/${formattedDate}`;
            } else {
                url = `/data-analyze/${timePeriod}`;
            }

            const response = await axios.get(url);
            const result = response.data;

            setData({
                labels: ['Temperature', 'Humidity', 'Soil Moisture', 'Gas', 'LDR'],
                datasets: [
                    {
                        label: `Data for ${timePeriod === 'daily' && selectedDate ? selectedDate.toDateString() : timePeriod}`,
                        data: [
                            result.temperature_avg ?? 0,
                            result.humidity_avg ?? 0,
                            result.soil_moisture_avg ?? 0,
                            result.gas_avg ?? 0,
                            result.ldr_avg ?? 0,
                        ],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    },
                ],
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Data Analysis</h2>}
        >
            <Head title="Data Analysis" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow sm:rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Select a date to analyze:</h3>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date: Date | null) => {
                                setSelectedDate(date);
                                setTimePeriod('daily');
                            }}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Select a date"
                            className="mb-4 p-2 border border-gray-300 rounded"
                        />

                        <div className="flex justify-between mb-4">
                            <button onClick={() => setTimePeriod('daily')} className="btn bg-blue-700 border px-4 py-1 rounded-xl text-gray-100 hover:bg-gray-900">Daily</button>
                            <button onClick={() => setTimePeriod('weekly')} className="btn bg-blue-700 border px-4 py-1 rounded-xl text-gray-100 hover:bg-gray-900">Weekly</button>
                            <button onClick={() => setTimePeriod('monthly')} className="btn bg-blue-700 border px-4 py-1 rounded-xl text-gray-100 hover:bg-gray-900">Monthly</button>
                        </div>

                        <Line data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default DataAnalyzeIndex;
