import { draggable } from "./draggable.js"

export class image_viewer {
  constructor() {
    this.images = [];
  }

  view(img) {
    this.images.push(img);

    if (!img) {
      return;
    }

    const img_el = document.createElement("img");
    img_el.src = "gallery/" + img + ".png";
    img_el.id = img;
    img_el.style.width = "500px";
    img_el.style.backgroundColor = "black";
    img_el.style.position = "absolute";
    img_el.style.zIndex = "1";
    document.getElementById("body").appendChild(img_el);
    let d = new draggable(img_el);
  }

  close(img) {
    if (!img) {
      return;
    }

    if (!this.images.includes(img)) {
      return;
    }

    var it = this.images.indexOf(img);

    if (it !== -1) {
      this.images.splice(it, 1);
    }

    document.getElementById(img).remove();
  }
}