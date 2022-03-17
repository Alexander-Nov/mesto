const popupElement = document.querySelector(".edit-section");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = popupElement.querySelector(".edit-form__closebtn");
const saveButton = popupElement.querySelector(".edit-form__submitbtn");

const profileInfo = document.querySelector(".profile__info");
const currentName = profileInfo.querySelector(".profile__name");
const currentProf = profileInfo.querySelector(".profile__description");
const editSection = document.querySelector(".edit-form");

function openEditSection() {
  const nameToBeDisplayed = editSection.querySelector(".edit-form__input-name");
  const professionToBeDisplayed = editSection.querySelector(
    ".edit-form__input-prof"
  );
  nameToBeDisplayed.value = currentName.textContent;
  professionToBeDisplayed.value = currentProf.textContent;
  popupElement.classList.add("edit-section__opened");
}

function closeEditSection() {
  popupElement.classList.remove("edit-section__opened");
}

function saveChanges(evt) {
  evt.preventDefault();
  const newName = editSection.querySelector(".edit-form__input-name");
  const newProfession = editSection.querySelector(".edit-form__input-prof");
  currentName.textContent = newName.value;
  currentProf.textContent = newProfession.value;
  closeEditSection();
}

editButton.addEventListener('click', openEditSection);

closeButton.addEventListener('click', closeEditSection);

editSection.addEventListener('submit', saveChanges);
