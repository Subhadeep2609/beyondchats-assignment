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

      let rewritten;

      try {
        console.log("Rewriting content with OpenAI...");
        rewritten = await rewriteContent(competitorText);
      } catch (err) {
        console.warn("OpenAI failed, using fallback content");
        rewritten = competitorText.slice(0, 1000);
      }

      console.log(`Rewritten content length: ${rewritten.length}`);

      const response = await axios.put(
        `${API}/articles/${article.id}`,
        { updated_content: rewritten },
        { timeout: 30000 }
      );

      console.log(`Updated article ID ${article.id}`);
    } catch (err) {
      if (err.response?.status === 429) {
        console.log("⚠️ OpenAI quota exceeded. Skipping rewrite.");
        continue;
      }

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
