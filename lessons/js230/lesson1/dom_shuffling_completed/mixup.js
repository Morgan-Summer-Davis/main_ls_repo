let bodyHeader = document.querySelectorAll('header')[1];
document.body.insertAdjacentElement('afterbegin', bodyHeader);
bodyHeader.insertAdjacentElement('afterbegin', document.body.querySelector('h1'));

let images = document.querySelectorAll('img');
let figures = document.querySelectorAll('figure');
let article = document.querySelector('article');
article.insertAdjacentElement('beforeend', figures[0]);
article.insertAdjacentElement('beforeend', figures[1]);
figures[0].insertAdjacentElement('afterbegin', images[1]);
figures[1].insertAdjacentElement('afterbegin', images[0]);
