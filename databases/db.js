const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./databases/users.db');

// db.serialize(() => {
//     db.run(`
//         CREATE TABLE IF NOT EXISTS users
//         (
//             id       INTEGER PRIMARY KEY AUTOINCREMENT,
//             email    TEXT NOT NULL UNIQUE,
//             username TEXT NOT NULL UNIQUE,
//             image    TEXT,
//             wins     INT DEFAULT 0,
//             losses   INT DEFAULT 0
//         );
//     `);
//     db.run(`
//         CREATE TABLE IF NOT EXISTS results
//         (
//             id        INTEGER PRIMARY KEY AUTOINCREMENT,
//             game      TEXT NOT NULL,
//             wins      INT DEFAULT 0,
//             losses    INT DEFAULT 0,
//             ties      INT DEFAULT 0,
//             user_id   INTEGER NOT NULL,
//             FOREIGN KEY (user_id) REFERENCES users (id)
//         );
//     `);
// });

db.on('error', (err) => {
    console.error('SQLite error:', err.message);
});

// Function for SELECT queries
async function getFromTable(query, value){
    return new Promise((resolve, reject) => {
        db.get(query, value, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

// Function for INSERT queries
export async function insertIntoTable(query, value) {
    return new Promise((resolve, reject) => {
        db.run(query, value, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

// get a user from users table
export async function selectUserByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    return await getFromTable(query, email);
}

// add a user to users table
export async function addUser(values) {
    const query = 'INSERT INTO users (email, username, image) VALUES (?, ?, ?)';
    return await insertIntoTable(query, [values.email, values.username, values.image]);
}

// get results of a game for a user from results table
export async function selectResultsByGame(values) {
    const query = 'SELECT * FROM results WHERE user_id = ? AND game = ?';
    return await getFromTable(query, [values.user_id, values.game]);
}

// update a user's game results
export async function updateResult(values) {
    const query = 'UPDATE results SET wins = ?, losses = ?, ties = ? WHERE user_id = ? AND game = ?';
    return await insertIntoTable(query, [values.wins, values.losses, values.ties, values.user_id, values.game]);
}

// insert default values (0) for a user-game into results table
export async function insertResult(values) {
    const query = 'INSERT INTO results (game, user_id) VALUES (?,?)';
    return await insertIntoTable(query, [values.game, values.user_id]);
}