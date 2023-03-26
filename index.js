addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const apiKey = API_KEY; // Retrieve API key from environment variable
  const apiEndpoint = `https://content.guardianapis.com/search?api-key=${apiKey}`;
  const response = await fetch(apiEndpoint);
  const data = await response.json();

  const articles = data.response.results.map(result => {
    return `<h2><a href="${result.webUrl}">${result.webTitle}</a></h2>
            <p>Published: ${result.webPublicationDate}</p>
            <p>Section: ${result.sectionName}</p>
            <p>${result.fields.bodyText}</p>`;
  });

  const html = `<!DOCTYPE html>
              <html>
              <head>
              <title>The Guardian Articles</title>
              </head>
              <body>
              ${articles.join('')}
              </body>
              </html>`;

  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  });
}