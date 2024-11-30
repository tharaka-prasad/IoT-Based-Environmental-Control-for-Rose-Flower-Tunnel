import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState } from 'react';
import CustomModal from './Modal';

export default function Welcome({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-900 text-black/50 dark:bg-black dark:text-white/50">
            <img
                    id="background"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    src="assest/images/background.png"
                    alt="background"
                />
                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                        </header>
                        <div className="flex lg:justify-center lg:col-start-2">
                        </div>
                        <main className="mt-6">
                            <nav className="flex lg:justify-center lg:col-start-2">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 bg-blue-600 text-white ring-1 ring-transparent transition hover:bg-blue-700 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:bg-blue-500 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="py-20 mb-60 px-12 text-center text-md text-black dark:text-white/70 max-w-[500px] mx-auto">
                                        <div className="py-4 px-6 mb-6 text-md">
                                            <Link
                                                href={route('login')}
                                                className="rounded-md border px-8 py-4 bg-blue-900 text-white transition duration-200 hover:bg-gray-900"
                                            >
                                                Log in
                                            </Link>
                                        </div>
                                        <div>
                                            <Link
                                                href={route('register')}
                                                className="rounded-md border px-6   py-4 bg-blue-900 text-white transition duration-200 hover:bg-gray-900"
                                            >
                                                Register
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </nav>
                        </main>

                        <footer
                            className="py-4 px-6 text-center text-md border border-gray-900 bg-white text-black dark:text-white/70 max-w-[400px] mx-auto cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={openModal}
                        >
                            <p>IoT-based Arduino-powered Rose Flower Tunnel</p>
                            <p>Created by Tharaka Prasad</p>
                            <p>Horizon Campus</p>
                        </footer>

                        <CustomModal
                            show={isModalOpen}
                            onClose={closeModal}
                            title="About the Project"
                            content="This project leverages IoT technology to monitor and control environmental factors within a rose flower tunnel. Sensors collect real-time data on temperature, humidity, soil moisture, and light intensity, helping to optimize conditions for rose growth. Created by Tharaka Prasad, Horizon Campus."
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
