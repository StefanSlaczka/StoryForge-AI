// How others will view you fsm

const howOthersViewYou = {
  state: "NOOB",
  changeState(newState) {
    this.state = newState;
  },
  transitions: {
    NOOB: {
      training: function (training, weapon) {
        console.log("You are a", howOthersViewYou.state);
        if (!weapon) {
          console.log("You are", training);
        } else {
          console.log("You are", training, "with", weapon);
          howOthersViewYou.changeState("WEAK");
        }
      }
    },
    WEAK: {
      missionWithGroup: function (mission) {
        console.log("You are a", howOthersViewYou.state);
        if (mission !== "COMPLETE") {
          console.log("You are still a", howOthersViewYou.state);
        } else {
          howOthersViewYou.changeState("AVG");
          console.log("You have become stronger. You are now", howOthersViewYou.state);
        }
      }
    },
    AVG: {
      mission: function (mission) {
        console.log("You are a", howOthersViewYou.state);
        if (mission !== "COMPLETE") {
          console.log("You are still a", howOthersViewYou.state);
        } else {
          howOthersViewYou.changeState("STRONG");
          console.log("You have become stronger. You are now", howOthersViewYou.state);
        }
      }
    },
    STRONG: {
      toughMission: function (mission) {
        console.log("You are a", howOthersViewYou.state);
        if (mission !== "COMPLETE") {
          console.log("You are still a", howOthersViewYou.state);
        } else {
          howOthersViewYou.changeState("POWERFUL");
          console.log("You have become stronger. You are now", howOthersViewYou.state);
        }
      }
    },
    POWERFUL: {
      challengeTheStrongest: function (result) {
        console.log("You are a", howOthersViewYou.state);
        if (result !== "WIN") {
          console.log("You are still a", howOthersViewYou.state);
        } else {
          howOthersViewYou.changeState("GODLY");
          console.log("You have become stronger. You are now", howOthersViewYou.state);
        }
      }
    },
    GODLY: {
      becomeKing: function () {
        console.log("You are a", howOthersViewYou.state);
        console.log("You have taken over and become the king.");
      },
      findPeace: function () {
        console.log("You are a", howOthersViewYou.state);
        console.log("You decided to live in peace and harmony.");
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

howOthersViewYou.act("training", "trainee", "stick"); // Changes to WEAK
howOthersViewYou.act("missionWithGroup", "COMPLETE"); // Changes to AVG
howOthersViewYou.act("mission", "COMPLETE"); // Changes to STRONG
howOthersViewYou.act("toughMission", "COMPLETE"); // Changes to POWERFUL
howOthersViewYou.act("challengeTheStrongest", "WIN"); // Changes to GODLY
howOthersViewYou.act("becomeKing");
