let popupElement = document.querySelector('.edit-section');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = popupElement.querySelector('.edit-form__closebtn');
let saveButton = popupElement.querySelector('.edit-form__submitbtn');

let profileInfo = document.querySelector('.profile__info');
let currentName = profileInfo.querySelector('.profile__name');
let currentProf = profileInfo.querySelector('.profile__description');
let editSection = document.querySelector('.edit-form');

function openEditSection() {
    let nameToBeDisplayed = editSection.querySelector('.edit-form__input-name');
    let professionToBeDisplayed = editSection.querySelector('.edit-form__input-prof');
    nameToBeDisplayed.value = currentName.textContent;
    professionToBeDisplayed.value = currentProf.textContent;
    // console.log(nameToBeDisplayed.value);
    // console.log(currentName.textContent);
    // debugger;
    popupElement.classList.add('edit-section__opened');
}

function closeEditSection() {
    popupElement.classList.remove('edit-section__opened');
}

function saveChanges() {
    let newName = editSection.querySelector('.edit-form__input-name');
    let newProfession = editSection.querySelector('.edit-form__input-prof');
    // console.log(currentName.textContent);
    // console.log(newName.value);
    currentName.textContent = newName.value;
    currentProf.textContent = newProfession.value;
    // console.log(currentName.textContent);
    // console.log(currentProf.textContent);
}

editButton.addEventListener("click", openEditSection);

closeButton.addEventListener("click", closeEditSection);

// saveButton.addEventListener("click", saveChanges);

editSection.onsubmit = function(evt) {
    // console.log('запустилась функция onsubmit');
    evt.preventDefault();
    saveChanges();
    closeEditSection();
  };