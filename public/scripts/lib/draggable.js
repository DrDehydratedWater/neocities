export class draggable {
  constructor(element) {
    this.element = element;

    this.init();
  }

  init() {
    let is_dragging = false;
    let offset_x, offset_y;

    this.element.addEventListener("mousedown", (e) => {
      is_dragging = true;
      this.element.className = "dragging " + this.element.className;
      offset_x = e.clientX - this.element.offsetLeft;
      offset_y = e.clientY - this.element.offsetTop;
      this.element.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
      if (is_dragging) {
        this.element.style.left = e.clientX - offset_x + "px";
        this.element.style.top = e.clientY - offset_y + "px";
      }
    });

    document.addEventListener("mouseup", () => {
      is_dragging = false;
      this.element.classList.remove("dragging");
      this.element.style.cursor = "grab";
    });
  }
}