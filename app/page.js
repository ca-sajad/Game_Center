import {GameList} from "@/components/GameList";
import {GAMES} from "@/utils/constants";

export default function Home() {

  return (
    <section className="min-h-screen flex-center flex-col">
      <h1 className="w-full text-center head-text font-mono">
          Play These Exciting Games in
          <p className="orange-gradient p-10">
                 Game Center
          </p>
      </h1>
      <GameList
          games={GAMES}
      />
    </section>
  )
}
