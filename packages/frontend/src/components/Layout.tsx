import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";


export default function Layout({children}:{children:ReactNode}) {
    return (
        <div className="container mx-auto px-4 flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex flex-col justify-center items-center">
                {children}
            </main>
            <Footer />
        </div>
    )
}