const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

api = "coming soon"

messageOne.textContent = "";
messageTwo.textContent = ""; 
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "Looking up weather in " + search.value;
  messageTwo.textContent = "";
  fetch(api + location).then(
    (response) => {
      response.json().then((weather) => {
        if (weather.error) {
          messageOne.textContent = "Error";
          messageTwo.textContent = weather.error;
          console.log(weather.error);
        } else {
          messageOne.textContent = weather.Location;
          messageTwo.textContent = weather.forecast;
          console.log(weather.Location);
          console.log(weather.forecast);
        }
      });
    }
  );
});
