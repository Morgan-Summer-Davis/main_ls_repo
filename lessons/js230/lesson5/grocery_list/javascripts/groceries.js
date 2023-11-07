document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);

    let entry = document.createElement('li');
    entry.textContent = `${data.get('quantity') || 1} ${data.get('name')}`;

    document.getElementById('grocery-list').appendChild(entry);
    event.currentTarget.reset();
  });
});