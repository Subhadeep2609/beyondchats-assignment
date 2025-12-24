<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        Article::create([
            'title' => 'AI in Healthcare: Future Trends',
            'original_content' => 'Initial placeholder content for healthcare AI article.',
            'source_url' => 'https://example.com/ai-healthcare'
        ]);

        Article::create([
            'title' => 'Benefits of AI Chatbots for Businesses',
            'original_content' => 'Initial placeholder content for chatbot business article.',
            'source_url' => 'https://example.com/ai-chatbots'
        ]);
    }
}
