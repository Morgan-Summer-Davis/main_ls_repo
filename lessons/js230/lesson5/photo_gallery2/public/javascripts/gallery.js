let url = 'http://ec2-3-236-71-159.compute-1.amazonaws.com:8080'

function nodeFromString(string) {
  let template = document.createElement('template');
  template.innerHTML = string.trim();
  return template.content;
}

// function formDataToURI(formData) {
//   return Array.from(formData.entries())
//               .map(entry => encodeURIComponent(entry[0]) + '=' + encodeURIComponent(entry[1]))
//               .join('&');
// }

document.addEventListener('DOMContentLoaded', () => {
  let photos;
  fetch(url + '/photos', { method: 'GET' })
  .then(response => response.json())
  .then(json => {
    photos = json;
    let photosHTML = photoTemplate({ photos });

    document.getElementById('slides').appendChild(nodeFromString(photosHTML));
  }).then(photos => displayCurrentPhotoInfo());

  let currentPhotoIndex = 0;
  let photoInfoElem     = document.querySelector('section > header');
  let commentListElem   = document.querySelector('#comments ul');
  let slideshow         = document.getElementById('slideshow');
  let newCommentForm    = document.querySelector('form');

  let photoInfoTemplate = Handlebars.compile(document.getElementById('photo_information').innerHTML);
  let photoTemplate     = Handlebars.compile(document.getElementById('photos').innerHTML);
  let commentsTemplate  = Handlebars.compile(document.getElementById('photo_comments').innerHTML);
  let commentTemplate   = Handlebars.compile(document.getElementById('photo_comment').innerHTML);
  Handlebars.registerPartial('comment', document.getElementById('photo_comment').innerHTML);

  function displayCurrentPhotoInfo() {
    let photo = photos[currentPhotoIndex];

    while (photoInfoElem.children.length > 0) photoInfoElem.removeChild(photoInfoElem.lastChild);
    while (commentListElem.children.length > 0) commentListElem.removeChild(commentListElem.lastChild);

    let infoHTML = photoInfoTemplate(photo);
    photoInfoElem.appendChild(nodeFromString(infoHTML));

    fetch(url + '/comments?photo_id=' + photo.id, { method: 'GET' })
    .then(response => response.json())
    .then(json => {
      let commentsHTML = commentsTemplate({ comments: json });

      commentListElem.appendChild(nodeFromString(commentsHTML));
    })

    document.querySelector('.actions').addEventListener('click', event => {
      if (!event.target.classList.contains('button')) return;

      event.preventDefault();
      fetch(event.target.href, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: 'photo_id=' + photo.id,
      })
      .then(response => response.json())
      .then(json => {
        event.target.textContent = event.target.textContent.replace(/\d+/g, json.total);
      });
    });
  }

  slideshow.addEventListener('click', event => {
    if (event.target.tagName !== 'A') return;

    event.preventDefault();
    let currentPhoto = document.querySelector(`[data-id="${photos[currentPhotoIndex].id}"]`);
    currentPhoto.classList.remove('fadein');
    currentPhoto.classList.add('fadeout');

    currentPhotoIndex += event.target.classList.contains('next') ? 1 : -1;
    if      (currentPhotoIndex < 0)              currentPhotoIndex = photos.length - 1;
    else if (currentPhotoIndex >= photos.length) currentPhotoIndex = 0;
    currentPhoto = document.querySelector(`[data-id="${photos[currentPhotoIndex].id}"]`);

    currentPhoto.classList.remove('fadeout');
    currentPhoto.classList.add('fadein');
    displayCurrentPhotoInfo();
  });

  newCommentForm.addEventListener('submit', event => {
    event.preventDefault();

    fetch(event.currentTarget.action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: new URLSearchParams(new FormData(event.currentTarget)).toString(),
    })
    .then(response => response.json())
    .then(json => commentListElem.appendChild(nodeFromString(commentTemplate(json))));
  });

  event.currentTarget.reset();
});