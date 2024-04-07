const register = document.querySelector(".register");
const login = document.querySelector(".login");
const btnregister = document.querySelector(".btn-register");
const btnlogin = document.querySelector(".btn-login");

btnregister.addEventListener("click", function () {
  regis();
});

function regis() {
  register.classList.add("active");
  login.classList.add("hidden");
  lupaPassword.classList.remove("active");
  Falerts.innerHTML = "";
  resetForm();
}

btnlogin.addEventListener("click", function () {
  log();
});

const loginRegis = document.querySelector(".btn-login-regis");

loginRegis.addEventListener("click", function () {
  log();
});

const regisForgot = document.querySelector(".btn-register-forgot");

regisForgot.addEventListener("click", function () {
  regis();
  resetForm();
});

function log() {
  register.classList.remove("active");
  login.classList.remove("hidden");
  lupaPassword.classList.remove("active");
  Falerts.innerHTML = "";
  resetForm();
}

const Rusername = document.getElementById("Rusername");
const Rpassword = document.getElementById("Rpassword");
const Confirm = document.getElementById("confirm-password");
const submitRegister = document.getElementById("form-register");

submitRegister.addEventListener("submit", function (e) {
  const usernameValue = Rusername.value.trim();
  const passwordValue = Rpassword.value.trim();
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

    swal({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success",
      button: true,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result) {
        resetForm();
        log();
      }
    });
    return;
  }
});

const formlogin = document.getElementById("login-form");
const username = document.getElementById("username");
const password = document.getElementById("password");

formlogin.addEventListener("submit", function (e) {
  e.preventDefault();
  const usernamevalue = username.value.trim();
  const passwordvalue = password.value.trim();

  e.preventDefault();

  const data = GetLS();

  username.onkeyup = () => {
    username.style.borderBottom = `3px solid grey`;
    formlogin.focus();
  };

  password.onkeyup = () => {
    password.style.borderBottom = `3px solid grey`;
  };

  data.filter((data) => {
    if (data.username == usernamevalue && data.password == passwordvalue) {
      window.location.href = "https://www.youtube.com";
      return;
    } else {
      const showAlerts = document.querySelector(".alert");
      showAlerts.innerHTML = "username atau password salah";
      setTimeout(() => {
        showAlerts.innerHTML = "";
      }, 2000);

      username.style.borderBottom = `3px solid crimson`;
      password.style.borderBottom = `3px solid crimson`;
    }
  });
});

const lupaPassword = document.querySelector(".forgot-password");
const forgot = document.querySelector(".forgot");

forgot.addEventListener("click", function () {
  lupaPassword.classList.add("active");
  login.classList.add("hidden");
  resetForm();
});

const fusername = document.getElementById("fusername");
const fpassword = document.getElementById("fpassword");
const forgotForm = document.getElementById("forgot-form");
const Falerts = document.querySelector(".Falerts");

forgotForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const usernameValue = fusername.value.trim();
  const passwordValue = fpassword.value.trim();
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z]).+$/;
  const data = GetLS();
  const newData = data.map((userData) => {
    if (userData.username === usernameValue) {
      if (passwordValue.length <= 5) {
        alertforgot(
          fpassword,
          "Password harus lebih dari 5 karakter",
          "crimson"
        );
        return;
      } else if (!passwordRegex.test(passwordValue)) {
        alertforgot(
          fpassword,
          "Password harus berisi setidaknya satu angka",
          "crimson"
        );
        return;
      } else if (passwordValue === usernameValue) {
        alertforgot(
          fpassword,
          "Password tidak boleh sama dengan username",
          "crimson"
        );
        return;
      } else {
        swal({
          title: "Good job!",
          text: "You clicked the button!",
          icon: "success",
          button: true,
        }).then((result) => {
          if (result) {
            resetForm();
            log();
          }
        });
        fpassword.style.borderBottom = `3px solid grey`;
        userData.password = passwordValue;
        return userData;
      }
    } else {
      alertforgot(fusername, "Username tidak ditemukan", "crimson");
      return;
    }
  });

  // Filter data untuk menghapus entri yang kosong

  localStorage.setItem("akun", JSON.stringify(data));
});

function alertforgot(input, message, color) {
  Falerts.innerHTML = message;
  input.style.borderBottom = `3px solid ${color}`;
}

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
