const apiEndpoint = 'https://nameless-paper-65d7.alexjdarby.workers.dev/';

async function fetchArticles() {
  const response = await fetch(apiEndpoint);
  const data = await response.json();
  return data.response.results;
}

function renderArticles(articles) {
    const articlesElement = document.getElementById('articles');
    articlesElement.innerHTML = '';
  
    articles.forEach(article => {
      const articleElement = articleTemplate.content.cloneNode(true);
  
      articleElement.querySelector('.headline').textContent = article.webTitle;
  
      const section = article.sectionName ? article.sectionName : 'News';
      articleElement.querySelector('.section').textContent = section;
  
      const date = new Date(article.webPublicationDate);
      const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
      articleElement.querySelector('.date').textContent = date.toLocaleDateString('en-US', dateOptions);
  
      if (article.fields && article.fields.thumbnail) {
        articleElement.querySelector('.thumbnail').src = article.fields.thumbnail;
      }
  
      if (article.fields && article.fields.trailText) {
        articleElement.querySelector('.trail').textContent = article.fields.trailText;
      }
  
      articleElement.querySelector('.read-more').href = article.webUrl;
  
      articlesElement.appendChild(articleElement);
    });
  }
  

(async function() {
  const articles = await fetchArticles();
  renderArticles(articles);
})();
