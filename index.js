const apiEndpoint = 'https://nameless-paper-65d7.alexjdarby.workers.dev/';

async function fetchArticles() {
  const response = await fetch(apiEndpoint);
  const data = await response.json();
  return data.response.results;
}

function renderArticles(articles) {
  const articleElements = articles.map(article => {
    return `<h2><a href="${article.webUrl}">${article.webTitle}</a></h2>
            <p>Published: ${article.webPublicationDate}</p>
            <p>Section: ${article.sectionName}</p>
            <p>${article.fields.bodyText}</p>`;
  });
  const html = `<!DOCTYPE html>
              <html>
              <head>
              <title>The Guardian Articles</title>
              </head>
              <body>
              ${articleElements.join('')}
              </body>
              </html>`;
  document.body.innerHTML = html;
}

(async function() {
  const articles = await fetchArticles();
  renderArticles(articles);
})();
