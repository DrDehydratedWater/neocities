import { Terminal } from "./lib/terminal.js";
import { Draggable } from "./lib/draggable.js"

const themes = [
  "fleshy",
  "dark",
  "bright"
]

let terminal = new Terminal(
  document.getElementById("terminal"), {
  commands: {
    help: function() {
      this.println("--Insert help here--");
    },

    invalid: function() {
      this.output.innerHTML += this.argv[0] + "<br>";
      this.println("Invalid command try [help]");
    },

    boot: function() {
      this.println("WELCOME TO THE MACHINE USER");
    },

    poweroff: function() {
      overlay = document.getElementById("overlay")
      overlay.style.pointerEvents = "auto";
      overlay.style.opacity = 1;
    },

    list_themes: function() {
      for (let theme of themes) {
        this.println(theme);
      }
      return;
    },

    theme: function() {
      if (this.argv.length < 2) {
        this.println("No theme specified, themes are: ");
        this.commands["list_themes"].call(this);
        return;
      }

      let new_theme = this.argv[1];

      if (!themes.includes(new_theme)) {
        this.println("Theme does not exist, themes are:");
        this.commands["list_themes"].call(this)
        return;
      }

      for (let el of [this.container, this.output, this.input]) {
        let classes = [...el.classList];
        classes.pop();
        classes.push(el.id + "_" + new_theme);

        el.className = classes.join(" ");
      }
    },

    clear: function() {
      this.output.innerHTML = "";
    }
  }
})

let draggable = new Draggable(document.getElementById("terminal"))