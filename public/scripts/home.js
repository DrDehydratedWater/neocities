import { Terminal } from "./lib/terminal.js";
import { Draggable } from "./lib/draggable.js"

const themes = [
  "fleshy",
  "dark",
]

let terminal = new Terminal(
  document.getElementById("terminal"), 
  function all() {
    this.println("");
  },
  function invalid() {
    this.println("[" + this.argv[0] + "] is not a valid command")
  },
  function boot() {
    this.println("WELCOME TO THE MACHINE USER");
  },
  {
    commands: {
      help: function() {
        this.print(
          `
          Heya maggot, this is an interactive shell.
          <br>Commands are listed with []
          <br><br>Some useful commands are:
          <br>[help]  : You are here!
          <br>[list]  : Gives a list of commands
          <br>[theme] : Takes one argument which is the theme you want.
          <br>If ran without any arguments it lists them for you<br>
          `
        );
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
      },

      list: function() {
        this.println("Here is a list of the current commands:");
        for (let command of Object.keys(this.commands)) {
          this.println("[" + command + "]");
        }
      },

      grow: function() {
        if (!this.argv[1]) {
          this.println("Please specify how much the terminal should grow in pixels");
          return;
        }
        this.container.style.width = (parseInt(window.getComputedStyle(this.container).width, 10) + parseInt(this.argv[1])) + 'px';
        this.container.style.fontSize = (parseInt(window.getComputedStyle(this.container).fontSize, 10) + parseInt(this.argv[1])) + 'px';
      },
      
      shrink: function() {
        if (!this.argv[1]) {
          this.println("Please specify how much the terminal should shrink in pixels");
          return;
        }
        this.container.style.width = (parseInt(window.getComputedStyle(this.container).width, 10) - parseInt(this.argv[1])) + 'px';
        this.container.style.fontSize = (parseInt(window.getComputedStyle(this.container).fontSize, 10) - parseInt(this.argv[1])) + 'px';
      }
    }
  }
)

let draggable = new Draggable(document.getElementById("terminal"))