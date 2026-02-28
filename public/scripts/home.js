import { Terminal } from "./lib/terminal.js";
import { Draggable } from "./lib/draggable.js"
import { ASCIIBackground } from "./lib/background.js";

const themes = [
  "light"
]

function list_themes() {
  for (let theme of themes) {
    this.println(theme);
  }
  return;
}

let terminal = new Terminal(
  document.getElementById("terminal"), 
  function all() {
    if (this.output.innerHTML == "") {
      this.println("<i>[" + this.argv[0] + "]</i>");
      return;
    }
    this.println("-------------------------------------<br><i>[" + this.argv[0] + "]</i>")
  },
  function invalid() {
    this.println("^^^ is not a valid command")
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

      theme: function() {
        if (this.argv.length < 2) {
          this.println("No theme specified, themes are: ");
          list_themes.call(this);
          return;
        }

        let new_theme = this.argv[1];

        if (!themes.includes(new_theme)) {
          this.println("Theme does not exist, themes are:");
          list_themes.call(this)
          return;
        }

        for (let el of [this.container, this.output, this.input, document.body]) {
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
      },

      about: function() {
        this.println(
          `
          I am happy to have you on my site, I am kind of a jack of all trades.
          E. g. I am incompetent.
          <br>Hobbies are:
          <br>- Low level programming (asm, cpp, rust)
          <br>- Drawing (pixel art too!)
          <br>- Music (mostly midi sequencing)
          <br>- Video games (i gotta turn off my brain sometimes, okay?)
          `
        )
      }
    }
  }
)


// Make background draggable
let draggable = new Draggable(document.getElementById("terminal"))


// Fibonacci sequence in the background
let f1 = BigInt("0");
let f2 = BigInt("1");

let buffer = "";

let bg = new ASCIIBackground(document.getElementById("background"), 10000, function() {
  if (buffer == "") {
    let f3 = f1 + f2;
    f1 = f2;
    f2 = f3;
    buffer += f2.toString().split("").reverse().join("") + ' ';
  }
  
  
  let el = this.container;
  let newText = el.textContent;
  if (newText.length >= 15500) {
    el.textContent = "";
    return;
  }

  newText += buffer[buffer.length - 1];
  buffer = buffer.slice(0, -1);

  el.textContent = newText;
});

bg.start();