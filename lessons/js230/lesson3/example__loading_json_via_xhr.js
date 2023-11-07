let request = new XMLHttpRequest();
request.open('GET', 'hts://api.github.com/repos/rails/rails')
request.responseType = 'json';

request.addEventListener('load', event => {
  console.log(request.status);
  console.log(request.response.open_issues);
});

request.addEventListener('error', event => {
  console.log('The request could not be completed!');
});

request.send();