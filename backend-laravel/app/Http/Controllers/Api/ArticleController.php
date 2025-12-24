<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index()
    {
        return Article::all();
    }

    public function update(Request $request, Article $article)
    {
        $request->validate([
            'updated_content' => 'required|string',
        ]);

        $article->update([
            'updated_content' => $request->updated_content,
        ]);

        return response()->json($article);
    }
}
