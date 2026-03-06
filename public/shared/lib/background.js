export class ASCII_background {
  constructor(container, tps, expression) {
    this.container = container;

    this.interval = 1 / tps * 1000;
    this.expression = expression;
    this.timer;
  }

  start() {
    this.timer = setInterval(() => {
      this.expression();
    }, this.interval);
  }

  stop() {
    clearInterval(this.timer);
  }
}