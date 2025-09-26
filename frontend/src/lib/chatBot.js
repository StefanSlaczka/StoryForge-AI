export class ChatBot {
  constructor(fsm, initialMessage = "Hey user, want to go to the party?") {
    this.fsm = fsm;
    this.chatLog = []; // array to store conversation history
    this.initialMessage = initialMessage;
    this.isProcessing = false; // prevents muitiple simutoneus responses
  }

  // Starts a new conversation with the initial message
  initialize() {
    this.chatLog = [{ from: 'bot', text: this.initialMessage }];
    return this.chatLog;
  }

  async processUserInput(userInput) {
    if (this.isProcessing) return this.chatLog; // prevents spam clicking
    
    this.isProcessing = true;
    
    // Add user message immediately for responsive UI
    this.chatLog.push({ from: 'user', text: userInput });
    
    try {
      // using existing fms logic
      const recognized = this.fsm.analyzeInput(userInput);
      const botResponses = this.fsm.act("whatAreWeGoingToDo");
      
      // Add bot responses
      botResponses.forEach(text => {
        this.chatLog.push({ from: 'bot', text });
      });
      
    } catch (error) {
      this.chatLog.push({ 
        from: 'bot', 
        text: "Sorry, I encountered an error. Let's try that again." 
      });
    }
    
    this.isProcessing = false;
    return this.chatLog; // returns update conversation
  }

  getChatHistory() {
    return [...this.chatLog];
  }

  clearChat() {
    this.chatLog = [{ from: 'bot', text: this.initialMessage }];
    return this.chatLog;
  }
}