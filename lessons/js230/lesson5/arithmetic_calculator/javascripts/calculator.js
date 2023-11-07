document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    let result;

    switch (data.get('operator')) {
      case '+':
        result = parseInt(data.get('first-number'), 10) +
                 parseInt(data.get('second-number'), 10);
        break;
      case '-':
        result = parseInt(data.get('first-number'), 10) -
                 parseInt(data.get('second-number'), 10);
        break;
      case '*':
        result = parseInt(data.get('first-number'), 10) *
                 parseInt(data.get('second-number'), 10);
        break;
      case '/':
        result = parseInt(data.get('first-number'), 10) /
                 parseInt(data.get('second-number'), 10);
        break;
    }

    document.getElementById('result').textContent = result;
  });
});