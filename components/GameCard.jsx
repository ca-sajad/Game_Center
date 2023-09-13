import Image from "next/image";
import Link from "next/link";


export const GameCard = ({name, title, desc, image}) => {
    return (
        <div className="game-card">
            <Link href={`/games/${name}`}>
                <div className="flex flex-col items-center ">
                    <h2 className="font-bold text-xl">{title}</h2>
                    <p className="text-center text-sm mt-2 mb-2">{desc}</p>
                    <div >
                        <Image
                            src={image}
                            alt="game_image"
                            width={100}
                            height={100}
                            className="rounded-full object-contain"
                        />
                    </div>
                </div>
            </Link>
        </div>
    )
}