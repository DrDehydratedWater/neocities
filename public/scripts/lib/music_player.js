export class music_player {
  constructor() {
    this.queue = [];
  }

  play() {
    if (this.queue.length < 1) {
      return;
    }
    this.queue[0].play();
  }

  pause() {
    if (this.queue.length < 1) {
      return;
    }
    this.queue[0].pause();
  }

  add(new_audio) {
    this.queue.push(new Audio(new_audio));
    this.queue.at(-1).addEventListener("ended", () => {
      this.queue.splice(0, 1);
      this.play();
    })
  }

  clear() {
    this.queue = [];
  }
}