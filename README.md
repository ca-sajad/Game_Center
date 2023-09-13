# Game_Center

This project is a template where simple games can be created. It uses Next.js as the central framework. Part of the code responsible for calculating game logic
can be created in any language and connected to the server. For instance, Tic Tac Toe AI code is written in Python, while Hangman backend is in JavaScript. <br>
The two games currently implemented use a wide range of tools and frameworks:
- React.js for front-end capabilities
- Tailwind CSS for CSS styling 
- FastAPI to connect website server to TicTacToe game server and validate data
- SQLite to save user data and game results
- The comibnation of next-auth and an Authentication Provider to manage user authentication and authorization

#### HomePage
<p align="center">
<img width="700" alt="Screenshot 2023-09-10 at 12 42 45 PM" src="https://github.com/ca-sajad/Game_Center/assets/113402467/f75e2104-ef8b-49be-9f5e-5678d94c708e">
</p>

### Tic Tac Toe
<p align="center">
<img width="700" alt="Screenshot 2023-09-10 at 1 05 16 PM" src="https://github.com/ca-sajad/Game_Center/assets/113402467/b8a9640c-41a7-4a20-be86-fe4c0d9bf2ff">
</p>

### Hangman
<p align="center">
<img width="700" alt="Screenshot 2023-09-10 at 12 45 49 PM" src="https://github.com/ca-sajad/Game_Center/assets/113402467/c5257477-0571-4b28-930c-10aaeeeea09f">
</p>

For the authentication and authorization to work, you need to add a .env file containing the following information:
GOOGLE_ID=??  <br>
GOOGLE_CLIENT_SECRET=?? <br>
NEXTAUTH_URL=http://localhost:3000 <br>
NEXTAUTH_URL_INTERNAL=http://localhost:3000 <br>
NEXTAUTH_SECRET=?? <br>
