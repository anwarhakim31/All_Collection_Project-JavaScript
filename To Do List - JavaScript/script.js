const btnadd = document.querySelector(".btn-add");
const inputkeyword = document.querySelector(".input-keyword");
const notif = document.querySelector(".notif");
const taskcontainer = document.querySelector(".task-container");

const btnCancel = document.querySelector(".btn-cancel");

//localstorage
let editflag = false;
let editelement; //undifined//untuk nilaimembuat variabel menjadi global
let editID; //undifined
let LSkey = "item";

document.addEventListener("DOMContentLoaded", function () {
  let items = getLS();

  items.forEach(({ KValue, id }) => {
    createTask(KValue, id);
  });
});

//add task while we put value in text and press BUTTON
btnadd.addEventListener("click", function () {
  let id = new Date().getTime().toString();

  const KValue = inputkeyword.value.trim(); //trim menghapus space di depan value dan balik ke depan input value // mengabaikan space di depan
  if (KValue === "") {
    setTimeout(() => {
      showalert("Enter Your task!", "danger");
    }, 500);
  }
  if (KValue.length > 80) {
    showalert("too many letters, enter less than 80 letters", "letter");
  } else if (KValue && !editflag) {
    createTask(KValue, id);
    showalert("Your task has been added!", "succes");

    addLS(KValue, id); //local storage
  } else if (KValue && editflag) {
    editelement.textContent = KValue;

    editLS(KValue, editID); //local storage
    showalert("Your task has been Edit!", "succes");
  }
  inputkeyword.value = "";
});

btnCancel.addEventListener("click", function () {
  editflag = false;
  editelement = undefined;
  const taskbutton = document.querySelectorAll(".button");
  taskbutton.forEach((button) => {
    button.classList.remove("d-none");
  });
  this.classList.remove("active");

  const inputcheck = document.querySelectorAll(".input-check");
  inputcheck.forEach((check) => check.classList.remove("d-none"));

  btnadd.textContent = "Add";

  const ul = document.querySelector("ul");
  const lis = ul.childNodes;
  lis.forEach((ul) => {
    ul.style.background = "white";
  });
});

function createTask(KValue, id) {
  const li = document.createElement("li");
  li.setAttribute("data-id", id);
  li.innerHTML = template(KValue);

  taskcontainer.appendChild(li);
  // const text = li.children[1];

  // text.addEventListener("click", function () {
  //   li.classList.toggle("licheck");

  //   const checkbox = this.previousElementSibling;
  //   checkbox.checked = checkbox.checked ? false : true;
  // });
}

function deleteTask(e) {
  setTimeout(() => {
    e.parentElement.parentElement.remove(); //li

    const id = e.parentElement.parentElement.dataset.id;

    deleteLS(id);
    showalert("one item was removed", "danger");
  }, 300);
}

function check(e) {
  e.parentElement.classList.toggle("licheck");
}

function editTask(e) {
  editflag = true;
  const text = e.parentElement.previousElementSibling; //text
  const li = text.parentElement; //li

  editID = li.dataset.id;

  inputkeyword.value = text.textContent;

  editelement = text;

  const btnCancel = document.querySelector(".btn-cancel");
  btnCancel.classList.add("active");

  const taskbutton = document.querySelectorAll(".button");
  taskbutton.forEach((button) => {
    button.classList.add("d-none");
  });

  const inputcheck = document.querySelectorAll(".input-check");
  inputcheck.forEach((check) => check.classList.add("d-none"));

  btnadd.textContent = "Edit";

  const ul = document.querySelector("ul");
  const lis = ul.childNodes;
  lis.forEach((ul) => {
    ul.style.background = "#414141bd";
  });

  li.style.background = "white";
}

function template(KValue) {
  return `    
                    <input class="input-check" type="checkbox" name="status"  onclick="check(this)" />
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

/////////////////===========Local Storage=================//////////////////////

function addLS(KValue, id) {
  obj = { id, KValue };

  let items = getLS();

  items.push(obj);

  localStorage.setItem(LSkey, JSON.stringify(items));
}

function getLS() {
  return localStorage.getItem(LSkey)
    ? JSON.parse(localStorage.getItem(LSkey))
    : [];
}

function deleteLS(id) {
  let items = getLS();

  // items = items.filter((item) => item.id !== id);

  items.forEach((item, index) => {
    if (id === item.id) {
      console.log(item.id);
      console.log(id);
      items.splice(index, 1);
    }
  });

  localStorage.setItem(LSkey, JSON.stringify(items));

  if (items.length == 0) {
    localStorage.removeItem(LSkey);
  }
}

function editLS(KValue, editID) {
  let items = getLS();

  // items = items.filter((item) => item.id !== id);
  items = items.map((item) => {
    if (item.id === editID) {
      item.KValue = KValue;
      return item;
    }
    localStorage.setItem(LSkey, JSON.stringify(items));
  });

  // items.forEach((item, index) => {
  //   if (id === item.id) {
  //     console.log(item.id);
  //     console.log(id);
  //     items.splice(index, 1);
  //   }
  // });

  localStorage.setItem(LSkey, JSON.stringify(items));
}
