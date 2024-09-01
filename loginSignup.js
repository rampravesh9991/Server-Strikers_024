let closeLoginBox = document.getElementById("closeBox");
let hideBox = document.querySelector("#loginBox");
let clickLogin = document.querySelector("#loginBtn");

closeLoginBox.addEventListener("click", ()=>{
    hideBox.style.display = "none";
})

clickLogin.addEventListener("click", ()=>{
    hideBox.style.display = "block";
})
