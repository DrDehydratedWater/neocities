export class Terminal {
  constructor(container, options) {
    this.argv = []


    this.container = container;
    this.output = document.getElementById("terminal_output");
    this.input = document.getElementById("terminal_input");

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
        e.preventDefault();
        this.argv = this.input.value.split(" ");
        
        if (this.commands[this.argv[0]]) {
          this.commands[this.argv[0]].call(this);
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

