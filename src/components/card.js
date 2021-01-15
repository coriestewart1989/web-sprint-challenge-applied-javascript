import axios from 'axios'
const Card = (obj) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
const divCard = document.createElement('div');
const divHeadline = document.createElement('div');
const divAuthor = document.createElement('div');
const divImg = document.createElement('div');
const imgAuthor = document.createElement('img');
const span = document.createElement('span');

divCard.classList.add('card');
divHeadline.classList.add('headline');
divAuthor.classList.add('author');
divImg.classList.add('img-container');

imgAuthor.src = obj.authorPhoto;
span.textContent = obj.authorName;
divHeadline.textContent = obj.headline;

divImg.appendChild(span);
divImg.appendChild(imgAuthor);
divAuthor.appendChild(divImg);
divCard.appendChild(divHeadline);
divCard.appendChild(divAuthor);

divCard.addEventListener('click',() => {
  console.log(obj.headline)
})

return divCard
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
const entry = document.querySelector(selector)
axios
.get('https://lambda-times-api.herokuapp.com/articles')
.then(response => {
  console.log(response.data.articles);
  for (let key in response.data.articles) {
    //console.log(key);
    for (let i = 0; i < response.data.articles[key].length; i++) {
      const newCard = Card(response.data.articles[key][i]);
    // console.log(newCard)
      entry.appendChild(newCard);
        
    }
  }
})
}

export { Card, cardAppender }