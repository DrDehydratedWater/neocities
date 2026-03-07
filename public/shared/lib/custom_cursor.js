export function make_cursor(id) {
  let element = document.getElementById(id);
  document.addEventListener("mousemove", (e) => {
    element.style.left = e.pageX + "px";
    element.style.top = e.pageY + "px";
  });
}