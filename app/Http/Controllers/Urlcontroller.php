<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Url;
use Illuminate\Support\Str;

class Urlcontroller extends Controller
{

    public function store(Request $request)
    {
        $request->validate([
            'original_url' => 'required|url'
        ]);

        $shortened_url = $this->generateUniqueIdentifier();

        $url = Url::create([
            'original_url' => $request->original_url,
            'shortened_url' => $shortened_url
        ]);

        return response()->json(['shortened_url' => url($shortened_url)], 200);
    }

    public function show($shortened_url)
    {
        $url = Url::where('shortened_url', $shortened_url)->firstOrFail();
        return redirect($url->original_url);
    }

    private function generateUniqueIdentifier()
    {
        do {
            $shortened_url = Str::random(6);
        } while (Url::where('shortened_url', $shortened_url)->exists());
        return $shortened_url;
    }
}
