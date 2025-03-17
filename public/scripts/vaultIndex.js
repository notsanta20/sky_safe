const newFile = document.querySelector(`.new-file`);
const uploadModal = document.querySelector(`.newFile-modal`);
const closeBtn = document.querySelector(`.close-modal`);
const closeFolderBtn = document.querySelector(`.close-newFolder-modal`);
const fileBtn = document.querySelector(`.browse-btn`);
const actionBtns = document.querySelectorAll(`.file-actions`);
const folderModal = document.querySelector(`.newFolder-modal`);
const folderBtn = document.querySelector(`.new-folder`);
const folderInput = document.querySelector(`.folder-input`);
const shareBtn = document.querySelector(`.share-btn`);
const shareModal = document.querySelector(`.share-modal`);
const closeShareBtn = document.querySelector(`.close-share-modal`);
const getLinkBtn = document.querySelector(`.get-link`);

newFile.addEventListener(`click`, () => {
  fileBtn.value = ``;
  uploadModal.showModal();
});

closeBtn.addEventListener(`click`, () => {
  fileBtn.value = ``;
  uploadModal.close();
});

folderBtn.addEventListener(`click`, () => {
  folderInput.value = "";
  folderModal.showModal();
});

closeFolderBtn.addEventListener(`click`, () => {
  folderInput.value = "";
  folderModal.close();
});

actionBtns.forEach((btn) => {
  btn.addEventListener(`click`, (e) => {
    const btn = e.target.nextElementSibling;
    btn.classList.toggle(`action-hide`);
  });
});

async function copyClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error(`Failed to copy`, err);
  }
}

shareBtn.addEventListener(`click`, (e) => {
  e.preventDefault();
  shareModal.showModal();
  // const id = shareBtn.dataset.id;
  // const link = `/share/${id}`;
  // navigator.clipboard.writeText(link);
});

closeShareBtn.addEventListener(`click`, () => {
  shareModal.close();
});

getLinkBtn.addEventListener(`click`, (e) => {
  e.preventDefault();
});
