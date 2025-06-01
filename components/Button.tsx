
interface LoginBtnProps {
    title: string;
    onClick?: (e: React.FormEvent) => void;
}


export default function LoginBtn({ title, onClick  }: LoginBtnProps) {
    return (
        <button
              className="w-2/4 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% p-2 
            rounded-full text-white font-semibold mt-4 mb-16
            hover:text-black hover:brightness-80 hover:cursor-pointer "
            onClick={onClick}
            >
            {title}
        </button>
    );
}


export function MainBtn ({ title, onClick  }: LoginBtnProps) {
    return (
        <button
              className="w-2/4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2 
            rounded-full text-white font-semibold mt-4 
            hover:text-black hover:brightness-80 hover:cursor-pointer "
            onClick={onClick}
            >
            {title}
        </button>
    );
}