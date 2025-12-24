<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;
use App\Models\Article;

class ScrapeBeyondChatsBlogs extends Command
{
    protected $signature = 'scrape:beyondchats';
    protected $description = 'Scrape 5 oldest BeyondChats blog articles';

    public function handle()
    {
        $baseUrl = 'https://beyondchats.com';
        $blogsUrl = $baseUrl . '/blogs/';

        $html = Http::get($blogsUrl)->body();
        $crawler = new Crawler($html);

        $lastPageUrl = $crawler
            ->filter('a.page-numbers')
            ->last()
            ->attr('href');

        $lastPageHtml = Http::get($lastPageUrl)->body();
        $lastPageCrawler = new Crawler($lastPageHtml);

        $links = $lastPageCrawler
            ->filter('h2.entry-title a')
            ->slice(0, 5)
            ->each(fn ($node) => $node->attr('href'));

        foreach ($links as $link) {
            if (Article::where('source_url', $link)->exists()) {
                continue;
            }

            $articleHtml = Http::get($link)->body();
            $articleCrawler = new Crawler($articleHtml);

            if ($articleCrawler->filter('h1')->count() === 0) {
                continue;
            }

            $title = trim($articleCrawler->filter('h1')->text());

            $content = '';

            if ($articleCrawler->filter('div.entry-content')->count() > 0) {
                $content = $articleCrawler->filter('div.entry-content')->text();
            } elseif ($articleCrawler->filter('article')->count() > 0) {
                $content = $articleCrawler->filter('article')->text();
            } elseif ($articleCrawler->filter('main')->count() > 0) {
                $content = $articleCrawler->filter('main')->text();
            }

            if (trim($content) === '') {
                $this->warn("Skipped (empty content): {$link}");
                continue;
            }

            Article::create([
                'title' => $title,
                'original_content' => trim($content),
                'source_url' => $link,
            ]);

            $this->info("Saved: {$title}");
        }

        return Command::SUCCESS;
    }
}
