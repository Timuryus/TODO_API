const $email = document.querySelector(".email");
const $password = document.querySelector(".password");
const $userName = document.querySelector(".username");
const $submit = document.querySelector(".submit");
const Base = "http://nuranov29.pythonanywhere.com/api";

$submit.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    $email.value.length === 0 ||
    $password.value.length === 0 ||
    $userName.value.length === 0
  ) {
    setTimeout(() => window.location.reload(), 1000);
    if ($email.value.length === 0) {
      $email.classList.add("active");
      $email.setAttribute("placeholder", "Fill the Area!");
    }
    if ($password.value.length === 0) {
      $password.classList.add("active");
      $password.setAttribute("placeholder", "Fill the Area!");
    }
    if ($userName.value.length === 0) {
      $userName.classList.add("active");
      $userName.setAttribute("placeholder", "Fill the Area!");
    }
  } else {
    getLogin();
    window.open("./auth.html", "_self");
  }
});

function getLogin() {
  fetch(`${Base}/user`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username: $userName.value,
      email: $email.value,
      password: $password.value,
    }),
  })
    .then((res) => res.json())
    .then((r) => {
      localStorage.setItem("userId", r.id), window.open("./auth.html", "_self");
    });
}

window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("userId");

  if (token) {
    window.open("./auth.html", "_self");
  }
});
