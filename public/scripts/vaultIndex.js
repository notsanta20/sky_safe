const newFile = document.querySelector(`.new-file`);
const modal = document.querySelector(`.newFile-modal`);
const closeBtn = document.querySelector(`.close-modal`);
const fileBtn = document.querySelector(`.browse-btn`);

newFile.addEventListener(`click`, () => {
  modal.showModal();
});

closeBtn.addEventListener(`click`, () => {
  fileBtn.value = ``;
  modal.close();
});
