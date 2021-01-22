const buttonNew = document.querySelector(".new");
const modalOverlay = document.querySelector('.modal-overlay');
const close = document.querySelector('#close');

buttonNew.onclick = () => { modalOverlay.classList.add('active') }

close.onclick = () => { modalOverlay.classList.remove('active') }