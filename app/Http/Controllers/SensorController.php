<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sensor;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class SensorController extends Controller
{
    public function index()
    {
        $sensors = Sensor::latest()->take(10)->get();

        return Inertia::render('SensorData/All/Index', [
            'sensors' => $sensors
        ]);
    }
    public function fetchData()
    {
        $url = "https://api.thingspeak.com/channels/2628899/feeds.json?api_key=IWW4CR527F87685O&results=1";
        $response = Http::get($url);

        if ($response->successful()) {
            $data = $response->json()['feeds'];

            foreach ($data as $feed) {
                Sensor::updateOrCreate(
                    ['recorded_at' => $feed['created_at']],
                    [
                        'temperature' => isset($feed['field1']) ? floatval($feed['field1']) : null,
                        'humidity' => isset($feed['field2']) ? floatval($feed['field2']) : null,
                        'soil_moisture' => isset($feed['field3']) ? floatval($feed['field3']) : null,
                        'gas' => isset($feed['field4']) ? floatval($feed['field4']) : null,
                        'ldr' => isset($feed['field5']) ? floatval($feed['field5']) : null,
                        'recorded_at' => $feed['created_at'],
                    ]
                );
            }
            $latestData = Sensor::latest()->take(10)->get();

            return response()->json(['message' => 'Data saved successfully','sensors' => $latestData]);
        } else {
            return response()->json(['error' => 'Failed to fetch data from ThingSpeak'], 500);
        }
    }

    public function getLatestData()
    {
        $latestData = Sensor::latest()->first();

        if ($latestData) {
            return response()->json($latestData);
        } else {
            return response()->json(['message' => 'No data available'], 404);
        }
    }

}

