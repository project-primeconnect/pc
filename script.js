
if (!localStorage.getItem('cart')) {
  localStorage.setItem('cart', JSON.stringify([]));
}
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  document.querySelector('.cart-count').textContent = cart.length;
}
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
});

function addToCart(name, price) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const numericPrice = typeof price === 'string' ? 
                      parseFloat(price.replace(/[^0-9.]/g, '')) : 
                      Number(price);
  cart.push({ 
      name, 
      price: numericPrice 
  });
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${name} added to cart!`);
}


if (!localStorage.getItem('cart')) {
  localStorage.setItem('cart', JSON.stringify([]));
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  document.querySelector('.cart-count').textContent = cart.length;
}

document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
});

function addToCart(name, price) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  const numericPrice = typeof price === 'string' ? 
                      parseFloat(price.replace(/[^0-9.]/g, '')) : 
                      Number(price);
  
  cart.push({ 
      name, 
      price: numericPrice 
  });
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${name} added to cart!`);
}
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
  
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  
  if (!searchInput || !searchButton) return;

  function debounce(func, wait = 300, immediate = false) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  
  function normalizeString(str) {
    return str.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  
  function filterContent() {
    const searchTerm = normalizeString(searchInput.value);
    let hasResults = false;
    

    const cardSelectors = [
      '.service', '.repair-card', '.card', 
      '.profile', '.service-card'
    ].join(',');
    
    const containerSelectors = [
      '.service-list', '.repair-list', 
      '.catering', '.tutors', '.services'
    ].join(',');
    
    document.querySelectorAll(containerSelectors).forEach(container => {
      container.style.display = '';
      container.querySelectorAll(cardSelectors).forEach(card => {
        card.style.display = '';
      });
      
      const existingNoResults = container.querySelector('.no-results-message');
      if (existingNoResults) existingNoResults.remove();
    });
    if (searchTerm.trim() === '') {
      return;
    }
    const allCards = document.querySelectorAll(cardSelectors);
    if (allCards.length === 0) return;
    
    allCards.forEach(card => {
      const titleEl = card.querySelector('h3, h4, .profile-info > p:first-child');
      const descEl = card.querySelector('p, .description, .card-content p, .service-info p');
      
      const title = titleEl ? normalizeString(titleEl.textContent) : '';
      const description = descEl ? normalizeString(descEl.textContent) : '';
      
      const searchWords = searchTerm.split(/\s+/).filter(word => word.length > 0);
      const matches = searchWords.length === 0 || 
                     searchWords.every(word => title.includes(word) || description.includes(word));
      
      if (matches) {
        hasResults = true;
      } else {
        card.style.display = 'none';
      }
    });
    document.querySelectorAll(containerSelectors).forEach(container => {
      const visibleCards = container.querySelectorAll(`${cardSelectors}:not([style*="display: none"])`);
      
      if (visibleCards.length === 0) {
        if (!container.querySelector('.no-results-message')) {
          const noResultsElement = document.createElement('div');
          noResultsElement.className = 'no-results-message';
          noResultsElement.innerHTML = `
            <p>No services found matching "<strong>${searchInput.value}</strong>"</p>
            <p class="suggestions">Try different keywords or check our other categories</p>
          `;
          container.appendChild(noResultsElement);
        }
      }
    });
  }
  const style = document.createElement('style');
  style.textContent = `
    .no-results-message {
      text-align: center;
      padding: 20px;
      width: 100%;
      color: #666;
    }
    .no-results-message p {
      margin: 5px 0;
    }
    .no-results-message p:first-child {
      font-size: 1.1rem;
      color: #333;
      font-weight: 500;
    }
    .no-results-message .suggestions {
      font-size: 0.9rem;
      color: #888;
    }
  `;
  document.head.appendChild(style);

  searchInput.addEventListener('input', debounce(filterContent, 300));
  searchButton.addEventListener('click', filterContent);
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') filterContent();
  });
});
