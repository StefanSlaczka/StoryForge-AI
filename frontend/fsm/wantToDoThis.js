// Will you say yes to it

const willYouSayYes = {
    state: "NO",
    changeState(newState) {
    this.state = newState;
  },
  transitions: {
    NO: {
        whatAreWeGoingToDo: function(topic) {
            console.log("Hay Stef want to go to the party?");
            if (willYouSayYes.state == "YES"){
                console.log("Great we are going to have some much fun!");
            } else {
                console.log("Thats a bummer. I see you later. Text me if you change your mind.");
            }
        }
    },
    YES: {
        whatAreWeGoingToDo: function(topic){
            console.log("Hay Stef, you already said yes! Let's get to that party!");
        }
    }
  },
  act(actionName, ...args){
    const current = this.transitions[this.state];
    if (current && typeof current[actionName] === "function"){
        current[actionName](...args);
    } else {
        console.log(`Action "${actionName}" is not valid in state "${this.state}".`);
    }
  }
}

// test it

willYouSayYes.act("whatAreWeGoingToDo"); // Should say "That's a bummer..."

console.log("\n")

willYouSayYes.changeState("YES");
willYouSayYes.act("whatAreWeGoingToDo"); // Now says yes message