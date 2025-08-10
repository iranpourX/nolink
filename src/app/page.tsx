import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Home'
};

export default function Home() {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 text-blue-800">
            Home
        </div>
    );
}