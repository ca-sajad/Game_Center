import {GameCard} from "@/components/GameCard.jsx";

export const GameList = ({games}) => {

    return (
        <section className="games">
            {games.map(game => {
                return (<GameCard
                        key={game.id}
                        name={game.name}
                        title={game.title}
                        desc={game.desc}
                        image={game.image}
                        />)
            })}
        </section>
    )
}