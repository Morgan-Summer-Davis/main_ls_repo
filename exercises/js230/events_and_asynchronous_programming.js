// Randomizer
function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

function randomizer(...callbacks) {
  let second = 0;
  let timer = setInterval(() => console.log(++second), 1000);
  let times = [];

  callbacks.forEach(() => times.push((Math.floor(Math.random() * 2 * callbacks.length) + 1) * 1000));

  callbacks.forEach((cb, index) => {
    console.log(times[index]);
    setTimeout(() => {
      cb();

      if (times[index] === Math.max(...times)) clearInterval(timer);
    }, times[index]);
  });
}

randomizer(callback1, callback2, callback3);


// Reverse Engineer
document.querySelector('html').addEventListener('click', event => {
  if (!document.querySelector('#container').contains(event.target)) {
    document.querySelector('#container').style = 'display: none';
  }
});

document.querySelector('#container').addEventListener('click', event => {
  event.stopPropagation();
});


// Bold Element + Custom
function makeBold(node, callback) {
  node.style.fontWeight = 'bold';
  if (typeof callback === 'function') callback(node);
}

function makeBold(node) {
  node.style.fontWeight = 'bold';
  let bolded = new CustomEvent('bolded');

  node.dispatchEvent(bolded);
}


// Buggy Code
// Line 3 of the Javascript should use preventDefault, not stopPropagation


// Context Menus
document.querySelector('main').addEventListener('contextmenu', event => {
  alert('main');
});

document.querySelector('#sub').addEventListener('contextmenu', event => {
  event.stopPropagation();
  alert('sub');
});


// Selection Filters
const CLASSIFICATIONS = {
    'Vertebrate': ['Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
    'Warm-blooded': ['Bear', 'Whale', 'Ostrich'],
    'Cold-blooded': ['Salmon', 'Turtle'],
    'Mammal': ['Bear', 'Whale'],
    'Bird': ['Ostrich'],
  }

document.addEventListener('DOMContentLoaded', () => {
  let classDrop = document.getElementById('animal-classifications')
  let animalDrop = document.getElementById('animals');

  classDrop.addEventListener('change', event => {
    Array.from(animalDrop.children).forEach(animal => {
      animal.removeAttribute('hidden');

      if (!CLASSIFICATIONS[classDrop.value].includes(animal.value)) {
        animal.setAttribute('hidden', 'hidden');
      }
    });

    if (Array.from(animalDrop.children).find(animal => animal.selected).hidden) {
        Array.from(animalDrop.children).find(animal => !animal.hidden)
                                       .setAttribute('selected', 'selected');
    }
  });

  animalDrop.addEventListener('change', event => {
    Array.from(classDrop.children).forEach(classification => {
      classification.removeAttribute('hidden');

      console.log(classification.value);

      if (!CLASSIFICATIONS[classification.value] ||
          !CLASSIFICATIONS[classification.value].includes(animalDrop.value)) {
        classification.setAttribute('hidden', 'hidden');
      }
    });
  });
});


// Article Highlighter
document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', event => {
    let highlighted = document.querySelector('.highlight');
    if (highlighted) highlighted.classList.remove('highlight');

    if (event.target.tagName === 'A') {
      document.getElementById(event.target.href.replace(/.*#/, '')).classList.add('highlight');
    } else if (event.target.parentElement.tagName === 'ARTICLE') {
      event.target.parentElement.classList.add('highlight');
    } else {
      document.querySelector('main').classList.add('highlight');
    }
  });
});


// Delegate Event Function
function delegateEvent(parentElement, selector, eventType, callback) {
  if (!parentElement) return undefined;

  parentElement.addEventListener(eventType, event => {
    console.log(event.target.tagName);
    if (event.target.tagName === eventType.toUpperCase()) {
      callback({target: event.target, currentTarget: parentElement});
    }
  })

  return true;
}


// Events Tracker
function track(callback) {
  return event => {
    if (!tracker.list().includes(event)) tracker.add(event);

    callback(event);
  }
}

let tracker = function() {
  let events = [];
  let nodes  = [];

  return {
    list: () => events.slice(),
    elements: () => nodes.slice(),

    clear() {
      events = [];
      nodes = [];
      return 0;
    },

    add(event) {
      events.push(event);
      nodes.push(event.target);
    }
  };
}();