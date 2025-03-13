const newFile = document.querySelector(`.new-file`);
const uploadModal = document.querySelector(`.newFile-modal`);
const closeBtn = document.querySelector(`.close-modal`);
const fileBtn = document.querySelector(`.browse-btn`);
const actionBtns = document.querySelectorAll(`.file-actions`);
const folderModal = document.querySelector(`.newFolder-modal`);
const folderBtn = document.querySelector(`.new-folder`);

newFile.addEventListener(`click`, () => {
  fileBtn.value = ``;
  uploadModal.showModal();
});

closeBtn.addEventListener(`click`, () => {
  fileBtn.value = ``;
  uploadModal.close();
});

folderBtn.addEventListener(`click`, () => {
  folderModal.showModal();
});

actionBtns.forEach((btn) => {
  btn.addEventListener(`click`, (e) => {
    const btn = e.target.nextElementSibling;
    btn.classList.toggle(`action-hide`);
  });
});
