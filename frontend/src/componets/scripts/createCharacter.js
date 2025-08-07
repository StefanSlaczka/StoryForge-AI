/*
    Creating a Character {
        name,
        age,
        gender,
        eyes,
        hair,
        ethnicity,
        race,
        personality_traits,  // e.g., ["funny", "shy", "curious"]
        archetype,           // e.g., "mentor", "villain", "lover", "best friend"
        favorite_things,     // e.g., ["coffee", "cats", "rainy days"]
        speaking_style,      // e.g., "formal", "casual", "slang-heavy"
    }
*/


/*
    Creating an Environment {
        location,           // e.g., "space station", "cozy café", "medieval castle"
        current_event,      // e.g., "a storm is coming", "you just met"
        background_story,   // optional: why the character is here
        mood,               // e.g., "tense", "romantic", "mysterious"
    }
*/

export class AICharacter {
  constructor({
    name = "",
    eyes = "",
    hair = "",
    ethnicity = "",
    race = "",
    personality = "",
    typeOfPerson = "",
    favoriteThings = [],
    environment = {}
  } = {}) {
    this.name = name;
    this.eyes = eyes;
    this.hair = hair;
    this.ethnicity = ethnicity;
    this.race = race;
    this.personality = personality;
    this.typeOfPerson = typeOfPerson;
    this.favoriteThings = favoriteThings;
    this.environment = {
      setting: environment.setting || "",
      event: environment.event || ""
    };
  }

  setEnvironment(setting, event) {
    this.environment.setting = setting;
    this.environment.event = event;
  }

  describe() {
    return `${this.name} is a ${this.personality} ${this.typeOfPerson} with ${this.hair} hair and ${this.eyes} eyes. 
They are currently in ${this.environment.setting} where ${this.environment.event}.`;
  }
}

