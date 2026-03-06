export class terminal {
  constructor(container, all, invalid, boot, commands) {
    this.argv = []


    this.container = container;
    this.all = all;
    this.invalid = invalid;
    this.boot = boot;
    this.output = document.getElementById("terminal_output");
    this.input = document.getElementById("terminal_input");
    this.commands = commands;
    
    this.init();
  }

  init() {
    this.boot.call(this);
    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.argv = this.input.value.split(" ");
        this.all.call(this);

        if (this.commands[this.argv[0]]) {
          this.commands[this.argv[0]].call(this);
        } else {
          this.invalid.call(this);
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

