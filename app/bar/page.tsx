import BarComp from "./bar-comp";

// This page uses a client component that itself uses a server function.
export default async function Bar() {
    return (
        <main className="flex min-h-screen flex-col items-left justify-between p-24">
            <BarComp />
        </main>
    )
}