import { make_cursor } from "../../shared/lib/custom_cursor.js";

make_cursor("cursor");

let images = document.getElementsByTagName("img");

for (let i = 0; i < images.length; i++) {
  console.log(i);
  
  let img = images[i];
  img.addEventListener("click", (e) => {
    img.classList.toggle("clicked");
    document.getElementById("overlay").classList.toggle("overlay_clicked");
  })
}

document.getElementById("back_button").addEventListener("click", (e) => {
  window.location.href = "../home/";
})