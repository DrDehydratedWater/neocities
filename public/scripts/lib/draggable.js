export class Draggable {
  constructor(element) {
    this.element = element;

    this.init();
  }

  init() {
    let isDragging = false;
    let offsetX, offsetY;

    this.element.addEventListener("mousedown", (e) => {
      isDragging = true;
      this.element.className = "dragging " + this.element.className;
      offsetX = e.clientX - this.element.offsetLeft;
      offsetY = e.clientY - this.element.offsetTop;
      this.element.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        this.element.style.left = e.clientX - offsetX + "px";
        this.element.style.top = e.clientY - offsetY + "px";
      }
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      this.element.classList.remove("dragging");
      this.element.style.cursor = "grab";
    });
  }
}