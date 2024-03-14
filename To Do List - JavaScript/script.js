const btnadd = document.querySelector(".btn-add");
const inputkeyword = document.querySelector(".input-keyword");
const notif = document.querySelector(".notif");
const taskcontainer = document.querySelector(".task-container");

btnadd.addEventListener("click", function () {
  const KValue = inputkeyword.value;
  if (KValue === "") {
    showalert("Enter Your task!", "danger");
  }
  if (KValue.length > 80) {
    showalert("too many letters, enter less than 80 letters", "letter");
  } else if (KValue) {
    createTask(KValue);
    showalert("Your task has been added!", "succes");
  }

  KValue.innerHTML = "";
});

function createTask(KValue) {
  const li = document.createElement("li");

  li.innerHTML = template(KValue);

  taskcontainer.appendChild(li);
}

function template(KValue) {
  return `    
                    <input type="checkbox" class="check" />
                    <p class="text">${KValue}</p>
                    <div class="button">
                    <i class="bx bx-edit edit"></i>
                    <i class="bx bxs-trash trash"></i>
                    </div>
                    `;
}

function showalert(message, style) {
  notif.innerHTML = message;
  notif.classList.add(style);
  notif.classList.remove("hidden");

  setTimeout(() => {
    notif.classList.remove(style);
    notif.classList.add("hidden");
  }, 1000);
}
