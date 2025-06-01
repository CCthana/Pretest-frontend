

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800">
      {children}
    </div>
  );
}