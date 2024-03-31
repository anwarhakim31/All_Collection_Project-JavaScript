const body = document.querySelector("body");

// document.addEventListener("DOMContentLoaded", function () {
//   body.innerHTML = ` `;
// });

const tahunsekarang = new Date().getFullYear();
const year = document.querySelector(".year");
const inputValue = document.querySelector("input");

const umur = document.querySelector(".umur");

year.innerHTML = tahunsekarang;

const hitung = document.getElementById("hitung");
const reset = document.getElementById("reset");
hitung.addEventListener("click", function (e) {
  e.preventDefault();

  const tahunlahir = inputValue.value;

  let hasil = tahunsekarang - tahunlahir;

  umur.innerHTML = hasil;
});

reset.addEventListener("click", function (e) {
  e.preventDefault();
  inputValue.value = "";

  umur.innerHTML = "0";
});

const btnDetail = document.querySelector(".btnDetail");
const btnTahun = document.querySelector(".btnTahuns");
const detail = document.querySelector(".detail");
const tahun = document.querySelector(".tahun");

btnDetail.addEventListener("click", function () {
  detail.classList.add("show");
  tahun.classList.add("hidden");
});
btnTahun.addEventListener("click", function () {
  detail.classList.remove("show");
  tahun.classList.remove("hidden");
});

//////////////////////detail
const day = document.querySelector(".day");
const month = document.querySelector(".month");
const years = document.querySelector(".years");
let harisekarang = new Date().getDate();
let bulansekarang = new Date().getMonth();

harisekarang = format(harisekarang);
bulansekarang = format(bulansekarang + 1);

day.innerHTML = harisekarang;

month.innerHTML = bulansekarang;
years.innerHTML = tahunsekarang;

function format(number) {
  return number < 10 ? "0" + number : number;
}

const hitungD = document.getElementById("hitungD");

hitungD.addEventListener("click", function (e) {
  e.preventDefault();
  let birthdate = new Date(document.querySelector(".inputDetail").value);
  let now = new Date();
  let ageinMs = now.getTime() - birthdate.getTime();
  console.log(ageinMs);

  let ageIns = ageinMs / 1000;
  let ageinMins = ageIns / 60;
  let ageinHours = ageinMins / 60;
  let ageinday = ageinHours / 24;
  let ageinmonth = ageinday / 30.4375;
  let ageinYears = ageinmonth / 12;

  document.querySelector(".hasilT").innerHTML = Math.floor(ageinYears);
  document.querySelector(".hasilB").innerHTML = Math.floor(ageinmonth % 12);
  document.querySelector(".hasilH").innerHTML = Math.floor(ageinday % 30.3475);
});
