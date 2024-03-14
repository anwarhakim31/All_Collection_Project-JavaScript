const btnadd = document.querySelector(".btn-add");
const keyword = document.querySelector(".input-keyword");
const taskcontainer = document.querySelector(".task-container");
const notif = document.querySelector(".notif");

btnadd.addEventListener("click", function (e) {
  e.preventDefault();
  let val = keyword.value;

  if (val === "") {
    displayAlert("Enter Your task!", "danger");
  } else if (val) {
    createTask(val);
    displayAlert("Your task has been added!", "succes");
  }

  keyword.value = "";
});

function createTask(val) {
  const li = document.createElement("li");

  li.innerHTML = `<input type="checkbox" class="check" />
                    <p class="text">${val}</p>
                    <div class="button">
                    <i class="bx bx-edit edit"></i>
                    <i class="bx bxs-trash trash"></i>
                    </div>`;

  taskcontainer.appendChild(li);
}

function displayAlert(message, style) {
  notif.innerHTML = message;
  notif.classList.add(style);
  notif.classList.remove("hidden");
  setTimeout(() => {
    notif.classList.add("hidden");
    notif.classList.remove(style);
    setTimeout(() => {
      notif.innerHTML = "";
    }, 450);
  }, 1000);
}
