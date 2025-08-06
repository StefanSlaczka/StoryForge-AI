const willYouSayYes = {
  state: "NO",
  changeState(newState) {
    this.state = newState;
  },
  transitions: {
    NO: {
      whatAreWeGoingToDo: function () {
        console.log("Hey Stef, want to go to the party?");
        console.log("That's a bummer. See you later. Text me if you change your mind.");
      }
    },
    YES: {
      whatAreWeGoingToDo: function () {
        console.log("Great! We're going to have so much fun!");
      }
    }
  },
  act(actionName, ...args) {
    const current = this.transitions[this.state];
    if (current && typeof current[actionName] === "function") {
      current[actionName](...args);
    } else {
      console.log(`Action "${actionName}" is not valid in state "${this.state}".`);
    }
  }
};

// Analyze input text and set proper state
function analyzeInput(inputText) {
  const cleanedInput = inputText.trim().toUpperCase();

  if (["YES", "SURE", "OK", "YEAH", "YEP"].includes(cleanedInput)) {
    willYouSayYes.changeState("YES");
  } else if (["NO", "NAH", "NOPE"].includes(cleanedInput)) {
    willYouSayYes.changeState("NO");
  } else {
    console.log("Sorry, I didn't understand that.");
  }
}

// Test

analyzeInput("yes");
willYouSayYes.act("whatAreWeGoingToDo");

console.log("\n");

analyzeInput("sure");
willYouSayYes.act("whatAreWeGoingToDo");

console.log("\n");

analyzeInput("ok");
willYouSayYes.act("whatAreWeGoingToDo");

console.log("\n");

analyzeInput("no");
willYouSayYes.act("whatAreWeGoingToDo");

console.log("\n");

analyzeInput("huh?");
willYouSayYes.act("whatAreWeGoingToDo");
