export class PartyFSM {
  constructor() {
    this.currentState = 'initial'; // Tracks the conversation
    this.context = { // reminds the conversation details
      userMood: 'neutral',
      partyDetails: {},
      conversationHistory: []
    };
    this.states = this.initializeStates(); // all postible conversation states
  }

  initializeStates() {
    return {
      initial: {
        analyzeInput: (input) => this.analyzeSentiment(input),
        act: () => ["Hey! There's a party tonight. Are you interested?"]
      },
      interested: {
        analyzeInput: (input) => this.analyzeInterestLevel(input),
        act: () => ["Great! What time should we meet?", "What are you bringing?"]
      },
      // Add more states...
    };
  }

  analyzeInput(input) {
    const currentStateObj = this.states[this.currentState];
    return currentStateObj.analyzeInput(input);
  }

  act(action) {
    const currentStateObj = this.states[this.currentState];
    return currentStateObj.act(action);
  }

  transitionTo(newState) {
    this.currentState = newState;
  }

  // Analysis methods
  analyzeSentiment(input) {
    const positiveWords = ['yes', 'yeah', 'sure', 'ok', 'awesome', 'love to'];
    const negativeWords = ['no', 'nah', 'not', "can't", "won't"];
    
    const lowerInput = input.toLowerCase();
    if (positiveWords.some(word => lowerInput.includes(word))) {
      this.transitionTo('interested');
      return 'positive';
    } else if (negativeWords.some(word => lowerInput.includes(word))) {
      this.transitionTo('declined');
      return 'negative';
    }
    return 'neutral';
  }

  analyzeInterestLevel(input) {
    // More sophisticated analysis
    return 'high'; // or 'medium', 'low'
  }
}