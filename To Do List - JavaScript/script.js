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
let stat = 0;

document.addEventListener("DOMContentLoaded", function () {
  let items = getLS();

  items.forEach(({ KValue, id, stat }) => {
    createTask(KValue, id);
    // li = createTask();
    // console.log(li);
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
  editID = undefined;

  const editIcons = document.querySelectorAll(".edit");
  const deleteIcons = document.querySelectorAll(".trash");
  const inputcheck = document.querySelectorAll(".input-check");

  // Tampilkan kembali semua tombol edit dan tombol hapus
  editIcons.forEach((icon) => {
    icon.classList.remove("d-none");
  });

  deleteIcons.forEach((icon) => {
    icon.classList.remove("d-none");
  });

  inputcheck.forEach((icon) => {
    icon.classList.remove("d-none");
  });
  btnadd.textContent = "Add";
});

function createTask(KValue, id) {
  const li = document.createElement("li");
  li.setAttribute("data-id", id);

  // Get stat value from Local Storage
  const items = getLS();
  const foundItem = items.find((item) => item.id === id);
  const statValue = foundItem ? foundItem.stat : 0;

  // Set the class name based on the stat value
  li.className = statValue === 1 ? "input-check licheck" : "input-check";
  const isChecked = statValue === 1 ? "checked" : "";
  li.innerHTML = template(KValue, isChecked);

  taskcontainer.appendChild(li);
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
  const li = e.parentElement;
  li.classList.toggle("licheck");
  const getID = li.dataset.id;
  const text = e.nextElementSibling.textContent;

  const btncheck = e.checked;

  //menjadikan status menjadi 1 dan 0
  checkLS(btncheck, getID, text);
  //    const btncheck = document.querySelectorAll(".input-check");

  //    btncheck.forEach();
}

function editTask(e) {
  editflag = true;
  const text = e.parentElement.previousElementSibling; //text
  const li = text.parentElement; //li

  editID = li.dataset.id;

  console.log(editID);
  inputkeyword.value = text.textContent;

  editelement = text;

  const btnCancel = document.querySelector(".btn-cancel");
  btnCancel.classList.add("active");

  const editIcons = document.querySelectorAll(".edit");
  const deleteIcons = document.querySelectorAll(".trash");
  const inputcheck = document.querySelectorAll(".task-container input");
  // Sembunyikan semua tombol edit dan tombol hapus
  editIcons.forEach((icon) => {
    icon.classList.add("d-none");
  });

  deleteIcons.forEach((icon) => {
    icon.classList.add("d-none");
  });
  inputcheck.forEach((icon) => {
    icon.classList.add("d-none");
  });

  btnadd.textContent = "Edit";
}

function template(KValue, isChecked) {
  return `    
                    <input  type="checkbox" ${isChecked} name="status"  onclick="check(this)"  class="input-check"/>
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
  obj = { id, KValue, stat };

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
}

function checkLS(btncheck, getID, text) {
  let items = getLS();

  items.forEach((item, index) => {
    if (btncheck == true && item.id == getID) {
      items.splice(index, 1, {
        id: getID,
        KValue: text,
        stat: 1,
      });
    } else if (btncheck == false && item.id == getID) {
      items.splice(index, 1, {
        id: getID,
        KValue: text,
        stat: 0,
      });
    }
  });

  localStorage.setItem(LSkey, JSON.stringify(items));
}
