const button = document.querySelector(".button");
const icon1 = document.querySelector("#icon1");
const icon2 = document.querySelector("#icon2");

button.addEventListener("click", () => {
    icon1.classList.toggle("hidden");
    icon2.classList.toggle("hidden");
})