const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let fsm = {
  initial: "",
  states: {}
};

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
  const fileName = await ask("What do you want to name your FSM file (without .js)? ");
  fsm.initial = await ask("What is the initial state? ");

  let addMoreStates = true;

  while (addMoreStates) {
    const state = await ask("Enter a state name: ");
    fsm.states[state] = {};

    let addMoreActions = true;
    while (addMoreActions) {
      const action = await ask(`  Action name in state "${state}": `);
      const condition = await ask(`    Condition input (leave blank for none): `);
      const nextState = await ask(`    Next state after this action: `);
      const output = await ask(`    Output message for this action: `);

      fsm.states[state][action] = {
        condition: condition || null,
        next: nextState,
        output: output
      };

      const moreActions = await ask("    Add another action to this state? (yes/no): ");
      addMoreActions = moreActions.toLowerCase() === "yes";
    }

    const moreStates = await ask("Add another state? (yes/no): ");
    addMoreStates = moreStates.toLowerCase() === "yes";
  }

  rl.close();
  generateFSMFile(fsm, fileName);
}

function generateFSMFile(data, fileName) {
  let code = `const readline = require('readline');\n\n`;
  code += `const rl = readline.createInterface({ input: process.stdin, output: process.stdout });\n\n`;
  code += `const fsm = {\n`;
  code += `  state: "${data.initial}",\n`;
  code += `  changeState(newState) { this.state = newState; },\n`;
  code += `  transitions: {\n`;

  for (const [state, actions] of Object.entries(data.states)) {
    code += `    ${JSON.stringify(state)}: {\n`;
    for (const [action, { condition, next, output }] of Object.entries(actions)) {
      code += `      ${JSON.stringify(action)}: function(input) {\n`;
      if (condition) {
        code += `        if (input === "${condition}") {\n`;
        code += `          fsm.changeState("${next}");\n`;
        code += `          console.log("${output}");\n`;
        code += `        } else {\n`;
        code += `          console.log("Action failed.");\n`;
        code += `        }\n`;
      } else {
        code += `        fsm.changeState("${next}");\n`;
        code += `        console.log("${output}");\n`;
      }
      code += `      },\n`;
    }
    code += `    },\n`;
  }

  code += `  },\n\n`;
  code += `  act(actionName, input) {\n`;
  code += `    const current = this.transitions[this.state];\n`;
  code += `    if (current && typeof current[actionName] === "function") {\n`;
  code += `      current[actionName](input);\n`;
  code += `    } else {\n`;
  code += `      console.log(\`Action "\${actionName}" is not valid in state "\${this.state}".\`);\n`;
  code += `    }\n`;
  code += `  }\n`;
  code += `};\n\n`;

  code += `console.log("Starting FSM in state:", fsm.state);\n`;
  code += `function prompt() {\n`;
  code += `  rl.question("> ", (line) => {\n`;
  code += `    const [action, input] = line.trim().split(" ");\n`;
  code += `    fsm.act(action, input);\n`;
  code += `    prompt();\n`;
  code += `  });\n`;
  code += `}\n`;
  code += `prompt();\n`;

  fs.writeFileSync(`${fileName}.js`, code);
  console.log(`FSM written to \${fileName}.js. Run it with: node \${fileName}.js`);
}

main();
