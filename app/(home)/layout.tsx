import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#605cff] flex">
      <Sidebar />
        <div className="w-screen h-screen bg-[#f1f1fe] rounded-l-4xl">
          {children} 
        </div>
    </div>
  );
}