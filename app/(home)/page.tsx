"use client";
import { LogoSvg, PostIcon, SearchIcon, TextBoxIcon } from "@/components/Icons";
import QuoteCard from "@/components/Quotecard";
import Searchbox from "@/components/SearchBox";
import { ChangeEvent, useEffect, useState } from "react";
import userApi from "../api/user";
import quoteApi from "../api/quote";
import Swal from "sweetalert2"
import { motion } from "motion/react";

interface User {
    userId: number;
    username: string;
}

interface Voter {
  id: number;
  userId: number;
  quoteId: number;
}

interface Quote {
    id: number;
    title: string;
    user: User;
    user_id: number;
    votes: number;
    voters: Voter[];
    voteStatus: boolean;
    created_at: string;
}

export default function HomePage() {
 const [user, setUser] = useState<User>();
 const [allQuote, setAllQuote] = useState<Quote[]>([]);
 const [quote, setQuote] = useState('')

   const fetchUser = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                const result = await userApi.getMe(accessToken)
                setUser(result.data)
            }
        } catch (error) {
            console.log(error)
        }
    };

     const fetchAllQuote = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
            const result = await quoteApi.getAllQuote(accessToken);
            console.log(result);
            setAllQuote(result.data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUser();
        fetchAllQuote();
    }, []);

   const handleChangeQuoteInput = (e: ChangeEvent<HTMLInputElement>) => {
        setQuote(e.target.value);
    }

    const handleAddQuote = () => {
        
            Swal.fire({
                title: "Add this quote?",
                icon: "info",
                confirmButtonText: "Yes",
                cancelButtonText: "Maybe later",
                showCancelButton: true,
                showCloseButton: true
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const userId = user?.userId ?? 0;
                        const title = quote;
                        const accessToken = localStorage.getItem('accessToken');

                        if (!accessToken) {
                              throw new Error("Access token is missing");
                           }
                        await quoteApi.addQuote({ userId, title }, accessToken);

                        Swal.fire({
                            title: "Added successfully!!",
                            icon: "success",
                        });

                        fetchAllQuote();
                        setQuote('')
                    } catch (error) {
                        console.error("Error adding quote:", error);
                        Swal.fire({
                            title: "Something went wrong!!",
                            icon: "error",
                        });
                    }
                }
            });
        
    }


    const handleSearch = async (quote: string) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token is missing");
      }

      const result = await quoteApi.searchQuote(quote, accessToken); 
      setAllQuote(result.data); 
    } catch (error) {
      console.error("Error searching quotes:", error);
    }
  };


  return (
  <>
      <div className="w-full h-full overflow-scroll ">

        

         <div className="fixed w-full flex justify-center items-center -ml-14 mt-8">
            <Searchbox onSearch={handleSearch}  />  
         </div>

          <div className="fixed w-full bottom-8 flex justify-center items-center -ml-14 mt-8">
            <div className="w-full h-1/6 px-14 flex justify-center items-center mt-20 ">
               <div className="w-3/5 h-3/5 bg-white shadow-2xl rounded-xl">
               <div className="flex justify-between items-center gap-2 p-4 h-full">
                  <div className="w-full h-3/5 bg-slate-100 flex items-center rounded-full px-2 ">
                     <input
                     className="w-full h-3/5 px-4 bg-slate-100 font-semibold outline-none"
                     placeholder="write some quote?"
                     maxLength={60}
                     value={quote}
                     onChange={handleChangeQuoteInput}
                     />
                     <button className="mr-2" onClick={handleAddQuote}>
                        <PostIcon className="w-10 px-1 mr-2 hover:cursor-pointer " />
                     </button>
                     
                  </div>
               </div>
               </div>
            </div> 
         </div> 

          
         <div className="flex justify-between items-baseline ">
            <div className="flex items-center hover:cursor-pointer" onClick={() => fetchAllQuote() }>
                  <h1 className="font-bold text-5xl mt-20 mb-10 pl-14"> Quotes </h1>
                  <TextBoxIcon className="h-16 px-4  " />
            </div>
            <div className="flex gap-4 items-baseline px-10">
               <h1 className="font-bold text-3xl mt-20 mb-10 "> Hello, {user?.username} </h1>
               <LogoSvg className="w-12 " />
            </div>
            
         </div>
         
      <motion.div
         initial={{ opacity: 0, scale: 0.8 }} 
         animate={{ opacity: 1, scale: 1 }} 
         transition={{ duration: 0.3 }} 
         viewport={{ once: false, amount: 0.2 }} 
         >

   
        <div className="flex flex-col justify-center items-center gap-20 px-8 ">

        {allQuote?.map((item) => {
            const hasVoted = item.voters.some((voter) => voter.userId === user?.userId);

            return (
               <QuoteCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  votes={item.votes}
                  userName={item.user.username}
                  hasVoted={hasVoted} 
               />
            );
            })}
        </div>
      </motion.div>
             
                
    
      </div>
  </>
    
  )
}

