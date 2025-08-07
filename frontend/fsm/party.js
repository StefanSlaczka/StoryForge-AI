// party.js
export const fsm = {
  state: "NO",

  transitions: {
    NO: {
      whatAreWeGoingToDo() {
        return [
          "That's a bummer. See you later. Text me if you change your mind."
        ];
      }
    },
    YES: {
      whatAreWeGoingToDo() {
        return [
          "Great! We're going to have so much fun!"
        ];
      }
    }
  },

  changeState(newState) {
    this.state = newState;
  },

  act(actionName) {
    const current = this.transitions[this.state];
    if (current && typeof current[actionName] === "function") {
      return current[actionName](); // returns an array of bot lines
    } else {
      return [`Action "${actionName}" is not valid in state "${this.state}".`];
    }
  },

  analyzeInput(inputText) {
    const words = inputText.trim().toUpperCase().split(/\s+/);
    const yesWords = ["YES", "SURE", "OK", "YEAH", "YEP"];
    const noWords = ["NO", "NAH", "NOPE"];

    if (words.some(word => yesWords.includes(word))) {
      this.changeState("YES");
      return true;
    } else if (words.some(word => noWords.includes(word))) {
      this.changeState("NO");
      return true;
    }
    return false;
  }
};
