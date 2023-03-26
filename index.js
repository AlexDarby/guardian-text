const apiEndpoint = 'https://nameless-paper-65d7.alexjdarby.workers.dev/';

async function fetchArticles() {
  const response = await fetch(apiEndpoint);
  const data = await response.json();
  return data.response.results;
}

async function renderArticles() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const articles = data.response.results;
    
    const articlesHtml = articles.map(article => {
      const { webTitle, webUrl, sectionName } = article;
      const imageSrc = article.fields?.thumbnail ?? 'https://via.placeholder.com/150';
  
      return articleElements(webTitle, webUrl, sectionName, imageSrc);
    }).join('');
  
    const container = document.querySelector('#articles-container');
    container.innerHTML = articlesHtml;
  }
  

(async function() {
  const articles = await fetchArticles();
  renderArticles(articles);
})();
