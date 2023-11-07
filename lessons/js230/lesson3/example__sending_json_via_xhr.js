/*
POST /books HTTP/1.1
Host: lsjs230-book-catalog.herokuapp.com
Content-Length: ??
Content-Type: application/json; charset=utf-8
Accept: asterisk/asterisk

{
  title: 'Eloquent JavaScript',
  author: 'Marjin Haverbeke'
}
*/


let newItem = JSON.stringify({
  name: "Morgan's Item",
  sku: 957,
  price: 9001,
});

let request = new XMLHttpRequest();
request.open('POST', 'https://ls-230-web-store-demo.herokuapp.com/v1/products');
request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
request.setRequestHeader('Authorization', 'AUTH_TOKEN');
request.send(newItem);