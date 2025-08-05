const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const fsm = {
  state: "sober",
  changeState(newState) { this.state = newState; },
  transitions: {
    "sober": {
      "drink": function(input) {
        if (input === "you are drinking beer") {
          fsm.changeState("drunk");
          console.log("you are drunk");
        } else {
          console.log("Action failed.");
        }
      },
    },
    "drunk": {
      "drink": function(input) {
        if (input === "you have past out") {
          fsm.changeState("");
          console.log("");
        } else {
          console.log("Action failed.");
        }
      },
    },
  },

  act(actionName, input) {
    const current = this.transitions[this.state];
    if (current && typeof current[actionName] === "function") {
      current[actionName](input);
    } else {
      console.log(`Action "${actionName}" is not valid in state "${this.state}".`);
    }
  }
};

console.log("Starting FSM in state:", fsm.state);
function prompt() {
  rl.question("> ", (line) => {
    const [action, input] = line.trim().split(" ");
    fsm.act(action, input);
    prompt();
  });
}
prompt();
