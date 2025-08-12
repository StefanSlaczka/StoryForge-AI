// Import SQLite library
const sqlite3 = require('sqlite3').verbose();

// Create or open the database file
const db = new sqlite3.Database('./characters.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Create the table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS characters (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER,
            gender TEXT,
            eyes TEXT,
            hair TEXT,
            ethnicity TEXT,
            race TEXT,
            personality_traits TEXT,
            archetype TEXT,
            favorite_things TEXT,
            speaking_style TEXT,
            location TEXT,
            current_event TEXT,
            background_story TEXT
        )
    `, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Table "characters" created or already exists.');
        }
    });
});

// Close the database connection
db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
    } else {
        console.log('Database connection closed.');
    }
});