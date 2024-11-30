<?php

namespace App\Http\Controllers;

use App\Models\Device;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class DeviceController extends Controller
{

    public function index()
    {
        $devices = Device::all();
        return Inertia::render('Devices/Index', ['devices' => $devices]);
    }



    public function store(Request $request)
{
    $validated = $request->validate([
        'device_type' => 'required|string|max:255',
        'status' => 'required|in:on,off',
    ]);

    Device::create($validated);

    return redirect()->route('devices.index')->with('success', 'Device added successfully.');
}

public function update(Request $request, Device $device)
{
    $validated = $request->validate([
        'device_type' => 'required|string|max:255',
        'status' => 'required|in:on,off',
    ]);

    $device->update($validated);

    return redirect()->route('devices.index')->with('success', 'Device updated successfully.');
}

    public function destroy(Device $device)
    {
        $device->delete();
        return redirect()->route('devices.index')->with('success', 'Device removed successfully.');
    }


    public function toggleDevice(Request $request, Device $device)
{
    $status = $request->input('status');  // 'on' or 'off'

    // Convert 'on' to 1 and 'off' to 0
    $commandValue = $status === 'on' ? 1 : 0;

    // Send the command to ThingSpeak (Field 6 for control)
    $apiUrl = "https://api.thingspeak.com/update?api_key=KBJ5WGE90N27DO2G&field6=" . $commandValue;

    $response = Http::get($apiUrl);

    if ($response->successful()) {
        // Optionally, update the device status in your database
        $device->update(['status' => $status]);

        return response()->json(['message' => 'Device status updated successfully.']);
    } else {
        return response()->json(['error' => 'Failed to update device status.'], 500);
    }
}



}
