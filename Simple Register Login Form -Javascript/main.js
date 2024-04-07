const register = document.querySelector(".register");
const login = document.querySelector(".login");
const btnregister = document.querySelector(".btn-register");
const btnlogin = document.querySelector(".btn-login");

btnregister.addEventListener("click", function () {
  register.classList.add("active");
  login.classList.add("hidden");
});

btnlogin.addEventListener("click", function () {
  register.classList.remove("active");
  login.classList.remove("hidden");
});

const Rusername = document.getElementById("Rusername");
const Rpassword = document.getElementById("Rpassword");
const Confirm = document.getElementById("confirm-password");
const submitRegister = document.getElementById("form-register");

submitRegister.addEventListener("submit", function (e) {
  const usernameValue = Rusername.value;
  const passwordValue = Rpassword.value;
  const isMatch = Confirm.value;
  const usernameRegex =
    /^(?=.*[!@#$%^&*()_0-9])(?=.*[!@#$%^&*()_a-zA-Z])[a-zA-Z0-9!@#$%^&*()_]+$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z]).+$/;

  e.preventDefault();

  let akunLS = GetLS();

  const usernameLS = akunLS.filter((akun) => {
    const match = usernameValue == akun.username;
    return match;
  });

  if (usernameValue.length == "") {
    alert("");
    return;
  }

  if (usernameValue.length <= 5 || usernameValue.length >= 20) {
    alert(
      "username harus lebih dari 5 karakter dan username harus kurang dari 20 karakter",
      Rusername,
      "crimson"
    );
    return;
  } else {
    alert("", Rusername, "grey");
  }
  if (!usernameRegex.test(usernameValue)) {
    alert(
      "username harus berisi setidaknya satu karakter Unik atau angka",
      Rusername,
      "crimson"
    );
    return;
  } else {
    alert("", Rusername, "grey");
  }

  if (usernameLS.length) {
    alert("Username sudah diguanakan", Rusername, "crimson");
    return;
  } else {
    alert("", Rusername, "grey");
  }

  if (passwordValue.length <= 5) {
    alert("password harus lebih dari 5 karakter", Rpassword, "crimson");
    return;
  } else {
    alert("", Rpassword, "grey");
  }

  if (!passwordRegex.test(passwordValue)) {
    alert("password harus berisi setidaknya satu angka", Rpassword, "crimson");
    return;
  } else {
    alert("", Rpassword, "grey");
  }

  if (!passwordRegex.test(passwordValue)) {
    alert("password harus berisi setidaknya satu angka", Rpassword, "crimson");
    return;
  } else {
    alert("", Rpassword, "grey");
  }

  if (passwordValue == usernameValue) {
    alert("password tidak boleh sama dengan username", Rpassword, "crimson");
    return;
  } else {
    alert("", Rpassword, "grey");
  }

  if (passwordValue !== isMatch) {
    alert("password tidak sama", Confirm, "crimson");
    return;
  } else {
    alert("", Confirm, "grey");
    addLS(usernameValue, passwordValue);
    swal("Succes", "Berhasil membuat akun", "success");
    resetForm();
    return;
  }
});

function addLS(username, password) {
  obj = { username, password };

  const akun = GetLS();

  akun.push(obj);

  localStorage.setItem("akun", JSON.stringify(akun));
}

function GetLS() {
  return localStorage.getItem("akun")
    ? JSON.parse(localStorage.getItem("akun"))
    : [];
}

const ShowAlert = document.querySelector(".alertRegister");
function alert(info, input, color) {
  ShowAlert.innerHTML = info;
  input.style.borderBottom = `3px solid ${color}`;
  return info;
}

function resetForm() {
  // Mendapatkan semua elemen input dalam form
  const inputs = document.querySelectorAll("input");

  // Loop melalui setiap input dan set nilai ke kosong
  inputs.forEach((input) => {
    input.value = "";
  });

  return false; // Mencegah form untuk submit secara default
}
