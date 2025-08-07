// fsm.js (inside /frontend/fsm/)
export const fsm = {
  state: "start",
  changeState(newState) {
    this.state = newState;
  },
  handleInput(input) {
    const normalizedInput = input.trim().toLowerCase();

    if (this.state === "start") {
      if (["yes", "y"].includes(normalizedInput)) {
        this.changeState("yes");
        return "Awesome! Let's go!";
      } else if (["no", "n"].includes(normalizedInput)) {
        this.changeState("no");
        return "That's a bummer. See you later. Text me if you change your mind.";
      } else {
        return "Sorry, I didn't understand that.";
      }
    }

    return "Conversation ended.";
  }
};
