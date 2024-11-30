<?php

namespace App\Http\Controllers;

use App\Models\sensor;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnalyseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('DataAnalyze/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function getDailyData()
    {
        $today = Carbon::today();
        $data = Sensor::whereDate('created_at', $today)
            ->selectRaw('
                AVG(temperature) as temperature_avg,
                AVG(humidity) as humidity_avg,
                AVG(soil_moisture) as soil_moisture_avg,
                AVG(gas) as gas_avg,
                AVG(ldr) as ldr_avg
            ')
            ->first();

        return response()->json($data);
    }

    public function getWeeklyData()
    {
        $weekStart = Carbon::now()->subDays(7);
        $data = sensor::whereBetween('created_at', [$weekStart, Carbon::now()])
            ->selectRaw('
                AVG(temperature) as temperature_avg,
                AVG(humidity) as humidity_avg,
                AVG(soil_moisture) as soil_moisture_avg,
                AVG(gas) as gas_avg,
                AVG(ldr) as ldr_avg
            ')
            ->first();

        return response()->json($data);
    }

    public function getMonthlyData()
    {
        $monthStart = Carbon::now()->subMonth();
        $data = Sensor::whereBetween('created_at', [$monthStart, Carbon::now()])
            ->selectRaw('
                AVG(temperature) as temperature_avg,
                AVG(humidity) as humidity_avg,
                AVG(soil_moisture) as soil_moisture_avg,
                AVG(gas) as gas_avg,
                AVG(ldr) as ldr_avg
            ')
            ->first();

        return response()->json($data);
    }


public function getDataByDate($date)
{
    $dateStart = Carbon::parse($date)->startOfDay();
    $dateEnd = Carbon::parse($date)->endOfDay();

    $data = Sensor::whereBetween('created_at', [$dateStart, $dateEnd])
        ->selectRaw('
            AVG(temperature) as temperature_avg,
            AVG(humidity) as humidity_avg,
            AVG(soil_moisture) as soil_moisture_avg,
            AVG(gas) as gas_avg,
            AVG(ldr) as ldr_avg
        ')
        ->first();

    return response()->json($data);
}

}
