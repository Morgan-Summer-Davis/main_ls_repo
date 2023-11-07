let url = 'http://ec2-3-233-232-70.compute-1.amazonaws.com:8080';

function reset() {
  let resetReq = new XMLHttpRequest();
  resetReq.open('GET', url + '/api/reset');
  resetReq.send();
}

function jsonFromFormData(formData) {
  return Array.from(formData).reduce((json, entry) => {
    json[entry[0]] = entry[1];
    return json;
  }, {});
}

document.addEventListener('DOMContentLoaded', () => {
  let bookingsHeader = document.createElement('h1');
  let bookingsList   = document.createElement('ul');

  bookingsHeader.textContent = 'Bookings';

  document.body.appendChild(bookingsHeader);
  document.body.appendChild(bookingsList);

  let bookingReq = new XMLHttpRequest();
  bookingReq.open('GET', url + '/api/bookings');
  bookingReq.send();

  let bookings;
  bookingReq.addEventListener('load', () => {
    bookings = JSON.parse(bookingReq.response);

    bookings.forEach(booking => {
      let li = document.createElement('li');
      li.textContent = booking;
      bookingsList.appendChild(li);
    });
  });

  bookingsList.addEventListener('click', event => {
    let dateElem = event.target;

    if (dateElem.children.length > 0) {
      while (dateElem.children.length > 0) dateElem.removeChild(dateElem.lastChild);
      return;
    }

    let date = dateElem.textContent;

    let dateReq = new XMLHttpRequest();
    dateReq.open('GET', url + `/api/bookings/${date}`);
    dateReq.send();

    dateReq.addEventListener('load', event => {
      let data      = JSON.parse(dateReq.response);
      let detailsUl = document.createElement('ul');
      dateElem.appendChild(detailsUl);

      data.forEach(entry => {
        let details = document.createElement('li');
        detailsUl.appendChild(details);
        details.textContent = `${entry[0]} | ${entry[1]} | ${entry[2]}`;
      });
    });
  });
});
