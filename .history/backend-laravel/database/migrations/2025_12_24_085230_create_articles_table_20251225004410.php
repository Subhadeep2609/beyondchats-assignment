<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('original_content');
            $table->text('updated_content')->nullable();
            $table->string('source_url')->unique();
            $table->timestamps();
        });

        // ✅ Seed initial articles (idempotent)
        DB::table('articles')->insertOrIgnore([
            [
                'title' => 'AI in 2025',
                'original_content' => 'Artificial Intelligence is transforming industries worldwide.',
                'updated_content' => 'AI in 2025 is shaping healthcare, finance, and education at scale.',
                'source_url' => 'https://example.com/ai-2025',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Future of Remote Work',
                'original_content' => 'Remote work gained popularity after the pandemic.',
                'updated_content' => 'Hybrid and remote work models dominate modern workplaces.',
                'source_url' => 'https://example.com/remote-work',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
