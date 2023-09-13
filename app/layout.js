import '../styles/globals.css'
import Nav from "@/components/Nav";
import Provider from '@/components/Provider'


export const metadata = {
  title: 'House of Games',
  description: 'A Nextjs game app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
            <main>
                <Nav></Nav>
                {children}
            </main>
        </Provider>
      </body>
    </html>
  )
}
