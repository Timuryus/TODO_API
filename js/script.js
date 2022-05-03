const $container = document.querySelector(".row2");
const $submit = document.querySelector(".btn");
const $allInputs = document.querySelectorAll(".content div input");
const $signOut = document.querySelector(".signOut");

const BASE_URL = "https://nuranov29.pythonanywhere.com";
const token = localStorage.getItem("authToken");
const userId = localStorage.getItem("userId");

const request = {
  get: (url, token) => {
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${token}`,
      },
    }).then((res) => res.json());
  },
};
$submit.addEventListener("click", (e) => {
  e.preventDefault();
  $submit.disabled = true;

  if (isValidate()) {
    createTodo(getValue());
    document.getElementById("inp").value = "";
    document.getElementById("inp2").value = "";
    document.getElementById("inp3").value = "";
  } else {
    $submit.disabled = false;
  }
});

function isValidate() {
  $allInputs.forEach((item) => {
    if (item.value.length === 0) {
      item.classList.add("active");
      item.setAttribute("placeholder", "Fill the Area!");
    }
  });

  return [...$allInputs].every((item) => item.value);
}

window.addEventListener("DOMContentLoaded", () => {
  const auth = localStorage.getItem("authToken");

  if (!auth) {
    window.open("./auth.html", "_self");
  }

  getTodo();
});

function getTodo() {
  request.get(`${BASE_URL}/api/todo/ `, token).then((res) => {
    const Todo = res;
    const result = Todo.map((todo) => cardTemplate(todo))
      .reverse()
      .join("");

    $container.innerHTML = result;
  });
}
function cardTemplate({ id, title, description, date }) {
  return `
    <div class = "boxCard">
        <div class = "cards">
            <div class ="card-header">
                <h3>${title}</h3>
            </div>
            <div class ="card-body">
                <i>${description}</i>
                <p>${date}</p>
            </div>
            <div class ="card-footer">
                <button onclick="editTodo('${id}')" class ="btn btn-primary">Edit</button>
                <button onclick="deleteTodo('${id}')" class ="btn btn-success">Complete</button>
                <button onclick="deleteTodo('${id}')" class ="btn btn-danger">Delete</button>
            </div> 
        </div>
    </div>
    `;
}

function getValue() {
  return [...$allInputs].reduce((object, input) => {
    return {
      ...object,
      [input.name]: input.value,
      user: userId,
    };
  }, {});
}

function createTodo() {
  $submit.disabled = true;

  fetch(`${BASE_URL}/api/todo/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(getValue()),
  })
    .then(() => {
      getTodo();
    })
    .finally(() => ($submit.disabled = false));
}

window.addEventListener("load   ", () => {
  const auth = localStorage.getItem("authToken");

  if (auth) {
    window.open("./index.html", "_self");
  }
});

function deleteTodo(id) {
  fetch(`${BASE_URL}/api/todo/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({}),
  }).then(getTodo);
}

function editTodo(id) {
  fetch(`${BASE_URL}/api/todo/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      title: prompt("title"),
      description: prompt("Desc"),
      user: userId,
    }),
  })
    .then((res) => res.json())
    .then(getTodo);
}

window.addEventListener("load", () => {
  const auth = localStorage.getItem("authToken");

  if (auth === "undefined") {
    localStorage.clear();
  }
});

$signOut.addEventListener("click", (e) => {
  e.preventDefault();

  $signOut.disabled = true;

  fetch(`${BASE_URL}/auth/token/logout/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then(() => {
      localStorage.removeItem("authToken");
      window.open("./register.html", "_self");
    })
    .finally(() => {
      $signOut.disable = false;
    });
});
