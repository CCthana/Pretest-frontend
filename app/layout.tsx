import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Next Quote app",
  description: "Simple Quote app using Next.js and Tailwind CSS",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body >
         {children} 
      </body>
    </html>
  );
}


// <html lang="en">
//       <body className="bg-[#605cff] flex">
//         <Sidebar />
//         <div className="w-screen h-screen bg-[#f1f1fe] rounded-l-4xl">
//           {children} 
//         </div>
//       </body>
//     </html>