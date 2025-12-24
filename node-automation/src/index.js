require("dotenv").config();
const axios = require("axios");

const { searchCompetitors } = require("./services/googleSearch");
const { scrapeArticle } = require("./services/competitorScraper");
const { rewriteContent } = require("./services/rewriter");

const API = process.env.LARAVEL_API_BASE;

async function run() {
  const { data: articles } = await axios.get(`${API}/articles`);

  for (const article of articles) {
    console.log(`\nProcessing: ${article.title}`);

    try {
      const competitors = await searchCompetitors(article.title);

      if (!competitors.length) {
        console.log("No competitors found, skipping");
        continue;
      }

      const competitorText = await scrapeArticle(competitors[0]);

      if (!competitorText || competitorText.length < 100) {
        console.log("Competitor content too short, skipping");
        continue;
      }

      console.log("Rewriting content with OpenAI...");
      const rewritten = await rewriteContent(competitorText);

      console.log(`Rewritten content length: ${rewritten.length}`);

      const response = await axios.put(
        `${API}/articles/${article.id}`,
        { updated_content: rewritten },
        { timeout: 30000 }
      );

      console.log(`Updated article ID ${article.id}`);
    } catch (err) {
      console.error("ERROR processing article:");
      if (err.response) {
        console.error(err.response.data);
      } else {
        console.error(err.message);
      }
    }
  }
}

run();
