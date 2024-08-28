let updateTime = () => {
  let dateShow = new Date();
  let hours = dateShow.getHours();
  let minutes = dateShow.getMinutes();
  let seconds = dateShow.getSeconds();
  let middleOneH1 = document.getElementById("middleOneH1");
  middleOneH1.innerHTML = `${hours} hrs : ${minutes} min : ${seconds} sec `;
};
setInterval(updateTime, 1000);
