let elem1 = document.querySelector('#elem1');
let elem4 = document.querySelector('#elem4');

elem1.addEventListener('click', event => alert(event.currentTarget.id), true);
elem4.addEventListener('click', event => alert(event.currentTarget.id));


// d1 pick DIV
// d2 pick MAIN
// d4 pick SECTION
// d3 DIV


// 2, since elem0 isn't a parent of the other elements