const newFile = document.querySelector(`.new-file`);
const uploadModal = document.querySelector(`.newFile-modal`);
const closeBtn = document.querySelector(`.close-modal`);
const closeFolderBtn = document.querySelector(`.close-newFolder-modal`);
const fileBtn = document.querySelector(`.browse-btn`);
const actionBtns = document.querySelectorAll(`.file-actions`);
const folderModal = document.querySelector(`.newFolder-modal`);
const folderBtn = document.querySelector(`.new-folder`);
const folderInput = document.querySelector(`.folder-input`);
const shareBtn = document.querySelectorAll(`.share-btn`);
const shareModal = document.querySelector(`.share-modal`);
const getLinkBtn = document.querySelector(`.get-link`);
const duration = document.querySelector(`#duration`);
const closeShareBtn = document.querySelector(`.close-share-modal`);
const copyBtn = document.querySelector(`.copy-btn`);
let id, link;

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

shareBtn.forEach((btn) => {
  btn.addEventListener(`click`, (e) => {
    e.preventDefault();
    shareModal.showModal();
    id = btn.dataset.id;
  });
});

getLinkBtn.addEventListener(`click`, async (e) => {
  e.preventDefault();
  const expiry = duration.value;
  const url = `/createLink/${id}&${expiry}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    } else {
      getLinkBtn.style.display = `none`;
      duration.disabled = true;
      copyBtn.style.display = `block`;
      link = await response.json();
    }
  } catch (error) {
    console.error(error.message);
  }
});

copyBtn.addEventListener(`click`, () => {
  navigator.clipboard.writeText(link.link);
  shareModal.close();
});

closeShareBtn.addEventListener(`click`, () => {
  shareModal.close();
});
