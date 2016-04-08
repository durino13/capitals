<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Stats;

use App\Http\Requests;

class StatsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return response()->json(Stats::limit(5)->orderBy('score', 'desc')->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

        try {
            $stats = new Stats();
            $stats->username = $request->userName;
            $stats->score = $request->score;
            $stats->correct_answers = $request->correctAnswers;
            $stats->incorrect_answers = $request->incorrectAnswers;

            if ($stats->save()) {
                echo json_encode(['result' => true]);
            }
        } catch (Exception $e) {
            echo json_encode(['result' => false]);
        }
        exit();
    }
}
