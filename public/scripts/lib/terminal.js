export class Terminal {
  constructor(container, options) {
    this.container = container;
    this.output = container.querySelector(".terminal-output");
    this.input = container.querySelector(".terminal-input");

    this.commands = options.commands || {};
    this.onUnknownCommand =
      options.onUnknownCommand ||
      ((cmd) => this.print(`Not a valid command: ${cmd}`));
    
    this.init();
  }

  init() {
    this.commands["boot"].call(this);
    this.input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      this.output.innerHTML += this.input.value + "<br>";
      if (this.commands[this.input.value]) {
        this.commands[this.input.value].call(this);
      } else {
        this.commands["invalid"].call(this);
      }
      
      this.output.scrollTop = this.output.scrollHeight;
      this.input.value = "";
    }
    });
  }
  
  print(s) {
    this.output.innerHTML += s;
  }
  
  println(s) {
    this.output.innerHTML += s + "<br>";
  }
}

