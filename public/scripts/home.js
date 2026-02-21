import { Terminal } from "./lib/terminal.js";
import { Draggable } from "./lib/draggable.js"

let terminal = new Terminal(
  document.querySelector(".terminal"), {
  commands: {
    help: function () {
      this.println("--Insert help here--");
    },

    invalid: function () {
      this.println("Invalid command try [help]");
    },

    boot: function () {
      this.println("WELCOME TO THE MACHINE USER");
    },

    poweroff: function () {
      document.getElementById("overlay").style.pointerEvents = "auto";
      document.getElementById("overlay").style.opacity = 1;
    },

    clear: function () {
      this.output.innerHTML = "";
    }
  }
})

let draggable = new Draggable(document.querySelector(".terminal"))