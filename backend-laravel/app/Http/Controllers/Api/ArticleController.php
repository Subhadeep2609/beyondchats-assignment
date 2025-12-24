<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index()
{
    return response()->json(
        \App\Models\Article::select(
            'id',
            'title',
            'original_content',
            'updated_content',
            'source_url',
            'created_at',
            'updated_at'
        )->get()
    );
}


    public function update(Request $request, Article $article)
    {
        $data = $request->validate([
            'updated_content' => 'required|string'
        ]);

        $article->update([
            'updated_content' => $data['updated_content']
        ]);

        return response()->json($article);
    }

}
