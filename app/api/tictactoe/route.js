
export const POST = async (req) => {
    try{
        const {xos, difficult} = await req.json();

        const response = await fetch('http://127.0.0.1:8000/api/tictactoe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                                        board: xos,
                                        difficulty: difficult ? "hard" : "easy"
                }),
            });

        const responseData = await response.json();
        return new Response(JSON.stringify({
            xos: responseData.game.board,
            winner: responseData.winner
        }), { status: 200 });
    } catch (e) {
        return new Response("Failed to fetch AI's next move", {status: 500});
    }
}