<?php

use App\Http\Controllers\AnalyseController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SensorController;
use App\Http\Controllers\TemperController;
use App\Http\Controllers\ThingSpeakController;
use App\Models\sensor;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/sensors/fetch', [SensorController::class, 'fetchThingSpeakData']);
    Route::resource('sensor-data', SensorController::class);
    Route::get('/fetch-thingspeak-data', [SensorController::class, 'fetchData']);
    Route::get('/sensor-data/analyze', [SensorController::class, 'analyzeData']);
    Route::get('/sensor/latest', [SensorController::class, 'getLatestData']);





    Route::get('/data-analyze', [AnalyseController::class, 'index'])->name('data-analyze.index');
    Route::get('/data-analyze/daily', [AnalyseController::class, 'getDailyData']);
    Route::get('/data-analyze/weekly', [AnalyseController::class, 'getWeeklyData']);
    Route::get('/data-analyze/monthly', [AnalyseController::class, 'getMonthlyData']);
    Route::get('/data-analyze/date/{date}', [AnalyseController::class, 'getDataByDate']);





    Route::put('/devices/{device}/toggle', [DeviceController::class, 'toggleDevice']);
    Route::resource('devices', DeviceController::class);



    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
