'use client';
import quoteApi from "@/app/api/quote";
import userApi from "@/app/api/user";
import { LogoSvg, TextBoxIcon } from "@/components/Icons";
import MyQuoteCard from "@/components/MyQuoteCard";
import QuoteCard from "@/components/Quotecard";
import { useEffect, useState } from "react";

interface Quote {
    id: number;
    title: string;
    user: User;
    user_id: number;
    votes: number;
    voters: Voter[];
    voteStatus: boolean;
    created_at: string;
};

interface Voter {
  id: number;
  userId: number;
  quoteId: number;
};

interface User {
   userId: number;
  email: string;
  username: string; 
  isVoted: boolean;
};


export default function Page() {
   const [user, setUser] = useState<User>();
   const [voteQuote, setVoteQuote] = useState<Quote[]>([]);
   const [myQuote, setMyQuote] = useState<Quote[]>([]);

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

   const fetchVoteQuote = async () => {
      try {
         const accessToken = localStorage.getItem('accessToken');
          if (accessToken) {
            const result = await quoteApi.getMyVote(accessToken)
            setVoteQuote(result.data)
         }
      } catch (error) {
         console.log(error)
         }
      };

   const fetchMyQuote = async () => {
      try {
         const accessToken = localStorage.getItem('accessToken');
          if (accessToken) {
            const result = await quoteApi.getMyQuote(accessToken)
            setMyQuote(result.data)
         }
      } catch (error) {
         console.log(error)
         }
      };

   useEffect(() => {
      fetchUser();
      fetchVoteQuote(); 
      fetchMyQuote(); 
   }, []);



   return ( 
      <div className="w-full h-full overflow-scroll "> 

         <div className="w-full flex justify-end">
            <div className="flex  gap-4 items-baseline px-10">
               <h1 className="font-bold text-3xl mt-20  "> Hello, {user?.username} </h1>
               <LogoSvg className="w-12 " />
            </div>
         </div>     

       <div className="flex items-baseline justify-center hover:cursor-pointer" >
            <h1 className="font-bold text-4xl mt-14 mb-14 pl-14"> Your Vote</h1>
            <TextBoxIcon className="h-14 px-4  " />
         </div>

         <div className="flex flex-col justify-center items-center gap-24 px-8 ">
         
                 {voteQuote?.map((item) => {
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

         <div className="flex items-center justify-center    hover:cursor-pointer mt-16" >
            <h1 className="font-bold text-4xl mt-20 mb-14 pl-14"> Your Quotes </h1>
            <TextBoxIcon className="h-14 px-4  " />
         </div>
         
            
         <div className="flex flex-wrap justify-center items-center gap-24 px-8 ">
         
                 {myQuote?.map((item) => {
                     const hasVoted = item.voters.some((voter) => voter.userId === user?.userId);
         
                     return (
                        <MyQuoteCard
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

      </div>
   ) };