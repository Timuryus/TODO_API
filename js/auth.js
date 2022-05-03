const BASE = "https://nuranov29.pythonanywhere.com";
const $password = document.querySelector(".password");
const $userName = document.querySelector(".username");
const $submit = document.querySelector(".submit");
const userId = localStorage.getItem("userId");

$submit.addEventListener("click", (e) => {
  e.preventDefault();

  if ($password.value.length === 0 || $userName.value.length === 0) {
    setTimeout(() => window.location.reload(), 1000);
    if ($password.value.length === 0) {
      $password.classList.add("active");
      $password.setAttribute("placeholder", "Fill the Area!");
    }
    if ($userName.value.length === 0) {
      $userName.classList.add("active");
      $userName.setAttribute("placeholder", "Fill the Area!");
    }
  } else {
    getAuth();
    $submit.disabled = true;
  }
});

function getAuth() {
  fetch(`${BASE}/auth/token/login/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      password: $password.value,
      username: $userName.value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      localStorage.setItem("authToken", res.auth_token);
      window.open("./index.html");
    })
    .finally(() => ($submit.disabled = false));
}

window.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("userId");

  if (!user) {
    window.open("./register.html", "_self");
  }
});

window.addEventListener("load", () => {
  const auth = localStorage.getItem("authToken");

  if (auth) {
    window.open("./index.html", "_self");
  }
  if (auth === "undefined") {
    localStorage.clear();
  }
});
