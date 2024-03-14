const btnadd = document.querySelector(".btn-add");
const inputkeyword = document.querySelector(".input-keyword");
const notif = document.querySelector(".notif");
const taskcontainer = document.querySelector(".task-container");

//add task while we put value in text and press BUTTON
btnadd.addEventListener("click", function () {
  const KValue = inputkeyword.value.trim(); //trim menghapus space di depan value dan balik ke depan input value // mengabaikan space di depan
  if (KValue === "") {
    showalert("Enter Your task!", "danger");
  }
  if (KValue.length > 80) {
    showalert("too many letters, enter less than 80 letters", "letter");
  } else if (KValue) {
    createTask(KValue);
    showalert("Your task has been added!", "succes");
  }
  inputkeyword.value = "";
});

function createTask(KValue) {
  const li = document.createElement("li");

  li.innerHTML = template(KValue);
  taskcontainer.appendChild(li);
  const text = li.children[1];

  text.addEventListener("click", function () {
    li.classList.toggle("licheck");
    const checkbox = this.previousElementSibling;
    checkbox.checked = checkbox.checked ? false : true;
  });
}

function deleteTask(e) {
  e.parentElement.parentElement.remove();
  showalert("one item was removed", "danger");
}

function check(e) {
  e.parentElement.classList.toggle("licheck");
}

function editTask(e) {
  const text = e.parentElement.previousElementSibling;
  inputkeyword.value = text.textContent;

  const btnCancel = document.querySelector(".btn-cancel");
  btnCancel.classList.toggle("active");
}

function template(KValue) {
  return `    
                    <input type="checkbox" name="status"  onclick="check(this)" />
                    <p class="text">${KValue}</p>
                    <div class="button">
                    <i class="bx bx-edit edit" onclick="editTask(this)"></i>
                    <i class="bx bxs-trash trash" onclick="deleteTask(this)"></i>
                    </div>
                    `;
}

function showalert(message, style) {
  notif.innerHTML = message;
  notif.classList.add(style);
  notif.classList.remove("hidden");

  setTimeout(() => {
    notif.classList.add("hidden");
    notif.style.color = "whitesmoke";
    notif.classList.remove(style);
  }, 1000);
}
