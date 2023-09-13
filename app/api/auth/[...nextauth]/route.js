import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google"
import {selectUserByEmail, addUser, insertResult} from '@/databases/db';
import {GAMES} from "@/utils/constants";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],

    callbacks: {

        async session({session}) {
            try {
                const sessionUser = await selectUserByEmail(session.user.email);

                if (sessionUser) {
                    // Create a session object with user data
                    session.user = {
                        id: sessionUser.id,
                        email: sessionUser.email,
                        image: sessionUser.image,
                    };
                }

                return session;
            } catch (error) {
                console.error('Error fetching user session:', error);
                return session;
            }
        },

        async signIn({profile}) {
            try {
                // Check if the user already exists in the database
                const existingUser = await selectUserByEmail(profile.email);

                if (!existingUser) {
                    // User does not exist, insert a new user
                    try {
                        await addUser({
                            email: profile.email,
                            username: profile.name.replace(' ', '').toLowerCase(),
                            image: profile.picture
                        });

                        const existingUser = await selectUserByEmail(profile.email);

                        GAMES.forEach(g => {
                            insertResult({
                                user_id: existingUser.id,
                                game: g.name,
                            })
                        })

                    } catch (e) {
                        console.error('Error adding user:', e);
                    }
                }

                return true;
            } catch (error) {
                console.error('Error during sign-in:', error);
                return false;
            }
        },
    }
})

export {handler as GET, handler as POST};