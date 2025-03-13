const newFile = document.querySelector(`.new-file`);
const uploadModal = document.querySelector(`.newFile-modal`);
const actionModal = document.querySelector(`.action-buttons-container`);
const closeBtn = document.querySelector(`.close-modal`);
const fileBtn = document.querySelector(`.browse-btn`);
const actionBtn = document.querySelector(`.file-actions`);

newFile.addEventListener(`click`, () => {
  fileBtn.value = ``;
  uploadModal.showModal();
});

closeBtn.addEventListener(`click`, () => {
  fileBtn.value = ``;
  uploadModal.close();
});

actionBtn.addEventListener(`click`, () => {
  actionModal.classList.toggle(`action-hide`);
});
