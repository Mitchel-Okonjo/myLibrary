const openPopUpButton = document.querySelector(".add-book");
const closePopUpButton = document.querySelector(".cancel");
const overlay = document.querySelector(".overlay");
const popup = document.querySelector(".popup");

//Listen for click event to open popup
openPopUpButton.addEventListener("click", () => {
  openPopUp();
});

//Listen for click event to close popup via cancel button
closePopUpButton.addEventListener("click", () => {
  closePopUp();
});

//Listen for click event to close popup via overlay
overlay.addEventListener("click", () => {
  closePopUp();
});

function openPopUp() {
  if (popup === null) return;
  popup.classList.add("active");
  overlay.classList.add("active");
}

function closePopUp() {
  if (popup === null) return;
  popup.classList.remove("active");
  overlay.classList.remove("active");
}
