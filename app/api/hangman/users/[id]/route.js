import {selectResultsByGame, updateResult} from '@/databases/db';
import {HANGMAN} from "@/utils/constants";


export const GET = async (request, {params}) => {
    try {
        const result = await selectResultsByGame({
            user_id: params.id,
            game: HANGMAN
        });

        if (result) {
            return new Response(JSON.stringify(result), {status: 200});
        } else {
            return new Response("Failed to fetch the result", {status: 500});
        }
    } catch (error) {
        return new Response("Failed to fetch the result", {status: 500});
    }

}

export const PATCH = async (request) => {
    // Update results for a user
    try {

        const data = await request.json();

        await updateResult({
            wins: data.wins,
            losses: data.losses,
            ties: 0,
            user_id: data.user_id,
            game: HANGMAN
        });
        return new Response('Results updated successfully', {status: 200});
    } catch (e) {
        return new Response("Failed to update results", {status: 500});
    }
}

