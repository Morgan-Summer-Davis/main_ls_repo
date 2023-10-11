let counting;

function startCounting() {
  let num = 1;
  counting = setInterval(() => {
    console.log(num);
    num++;
  }, 1000)
}

function stopCounting() {
  clearInterval(counting);
}