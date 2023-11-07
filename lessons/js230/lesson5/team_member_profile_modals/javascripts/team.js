document.addEventListener('DOMContentLoaded', () => {
  let overlay;

  document.getElementById('team').addEventListener('click', event => {
    let parent = event.target.parentElement;
    if (parent.tagName !== 'A') return;

    if (overlay) overlay.click();

    event.preventDefault();
    overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.classList.add('fadeIn');

    let modalTemplate = Handlebars.compile(document.getElementById('modalTemplate').innerHTML);

    // This--at least the bio--would likel be stored elsewhere
    let img = parent.querySelector('img');
    let teamMember = {
      imgSrc: img.src,
      imgAlt: img.alt,
      name: img.alt,
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniadolor',
    }

    let modal = document.createElement('div');
    modal.innerHTML = modalTemplate(teamMember);
    modal.id = 'modal';
    modal.classList.add('fadeIn');

    document.body.appendChild(overlay);
    overlay.appendChild(modal);

    document.getElementById('closeModal').addEventListener('click', () => overlay.click());

    function removeOverlay() {
      document.body.removeChild(overlay);
      overlay = undefined;
    }

    overlay.addEventListener('click', event => {
      if (event.target === overlay) {
        overlay.classList.remove('fadeIn');
        modal.classList.remove('fadeIn');

        overlay.classList.add('fadeOut');
        modal.classList.add('fadeOut');

        setTimeout(removeOverlay , 400);
      }
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;

    if (overlay) overlay.click();
  });
});