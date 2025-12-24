const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeArticle(url) {
  const { data } = await axios.get(url, {
    headers: { "User-Agent": "Mozilla/5.0" }
  });

  const $ = cheerio.load(data);
  const content = [];

  $("p").each((_, el) => {
    const text = $(el).text().trim();
    if (text.length > 60) content.push(text);
  });

  return content.join("\n");
}

module.exports = { scrapeArticle };
