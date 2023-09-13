import {getRandomWord} from "@/gamesAIServer/hangmanAI/hangman"

export const GET = async () => {
    try{
        const response = await getRandomWord();

        return new Response(JSON.stringify(response), {status: 200});
    } catch (e) {
        return new Response("Failed to fetch a new word", {status: 500});
    }
}