'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {useState, useEffect} from 'react';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {
    const {data: session} = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            await setProviders(response);
        }
        setUpProviders();
    }, []);

    return (
        <nav className="flex-between w-full pt-3 pl-3 pr-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image src="/icons/games-logo.png"
                        alt="games logo"
                        width={40}
                        height={40}
                />
                <p className="logo-text">Game Center</p>
            </Link>

            {/*Desktop Navigation*/}
            <div className="sm:flex hidden">
                { session?.user ? (
                        <div className="flex gap-3 md:gap-5">
                            <button type="button" onClick={signOut} className="btn">
                                Sign Out
                            </button>
                            <Link href="/profile">
                                <Image src={session.user.image} alt="profile"
                                       className="rounded-full"
                                    width={40} height={40}>
                                </Image>
                            </Link>
                        </div>
                    ) : (
                        <>
                            {providers &&
                                Object.values(providers).map(provider => (
                                    <button type="button"  className="btn"
                                            key={provider.name}
                                            onClick={() => signIn(provider.id)}>
                                        Sign In
                                    </button>
                                    )
                                )
                            }
                        </>
                    )
                }
            </div>

            {/*Mobile Navigation*/}
            {/*<div className="sm:hidden flex relative">*/}
            {/*    { session?.user ? (*/}
            {/*        <div className="flex">*/}
            {/*            <Image src={session.user.image} alt="profile"*/}
            {/*                   className="rounded-full"*/}
            {/*                   width={37} height={37}*/}
            {/*                    onClick={() => setToggleDropdown(prevState => !prevState)}>*/}
            {/*            </Image>*/}
            {/*            {toggleDropdown && (*/}
            {/*                <div className="dropdown">*/}
            {/*                    <Link href="/components/Profile" className="dropdown_link"*/}
            {/*                          onClick={() => setToggleDropdown(false)}>*/}
            {/*                        My Profile*/}
            {/*                    </Link>*/}
            {/*                    <Link href="/create-prompt" className="dropdown_link"*/}
            {/*                          onClick={() => setToggleDropdown(false)}>*/}
            {/*                        Create Prompt*/}
            {/*                    </Link>*/}
            {/*                    <button type="button" className="mt-5 black_btn w-full"*/}
            {/*                        onClick={() => {*/}
            {/*                            setToggleDropdown(false);*/}
            {/*                            signOut();*/}
            {/*                        }}>*/}
            {/*                        Sign Out*/}
            {/*                    </button>*/}
            {/*                </div>*/}
            {/*              )*/}
            {/*            }*/}
            {/*        </div>*/}
            {/*    ) : (*/}
            {/*        <>*/}
            {/*            {providers &&*/}
            {/*                Object.values(providers).map(provider => (*/}
            {/*                        <button type="button"  className="black_btn"*/}
            {/*                                key={provider.name}*/}
            {/*                                onClick={() => signIn(provider.id)}>*/}
            {/*                            Sign In*/}
            {/*                        </button>*/}
            {/*                    )*/}
            {/*                )*/}
            {/*            }*/}
            {/*        </>*/}
            {/*    )}*/}
            {/*</div>*/}
        </nav>
    )
}

export default Nav