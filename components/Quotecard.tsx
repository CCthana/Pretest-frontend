import quoteApi from "@/app/api/quote";
import { HeartIcon } from "./Icons";
import Swal from "sweetalert2";



interface QuoteCardProps {
   id: number,
   title: string,
   userName: string,
   votes: number,
   hasVoted: boolean; 
   quote?: string;
   userId?: number;
}

export default function QuoteCard(props: QuoteCardProps) {

   const handleClickVote = async () => { 
         Swal.fire({
               position: "center",
               icon: "info",
               title: `Vote this quote?`,
               text: `"${props.title}"`,
               confirmButtonText: "Yes",
                cancelButtonText: "No",
                showCancelButton: true,
                showCloseButton: true
               }).then(async (result) => {
               if (result.isConfirmed) {
                  try {

                     const accessToken = localStorage.getItem('accessToken');
                     if (!accessToken) {
                        throw new Error("Access token is missing");
                     }
                     
                     await quoteApi.voteQuote(props.id, accessToken);
                     
                     Swal.fire({
                     position: "center",
                     title: "Voted Successfully!!",
                     icon: "success"
                     }).then(() => {
                        window.location.reload();
                     });

                     

                  } catch (error) {
                     console.error("Error voting for quote:", error);
                     Swal.fire({
                     position: "center",
                     icon: "error",
                     title: "Failed to vote for quote",
                     text: "Please try again later.",
                     showConfirmButton: true
                     })
                  }
               }})
  };

    return (
        <div className=" w-1/3 h-64 mt-2 px-8  ">
            <div className="w-full bg-white h-full rounded-xl  flex flex-col shadow-2xl ">

                    <div className="flex justify-center  h-full flex-col rounded-lg px-2 ">
                       <span className="text-3xl font-semibold ml-2"> " </span> 
                        <h1 className="text-md  font-semibold text-center overflow-hidden text-ellipsis whitespace-normal  break-words"> 
                           {props.title}
                        </h1>
                       <span className="text-3xl font-semibold text-end mr-2"> " </span>  
                    </div>

                    <div className="w-full flex justify-between bg-[#605cff] py-2 rounded-b-lg px-1 text-white">
                        <h1 className="w-full font-semibold px-2"> {props.userName}</h1>

                        <div className="flex px-2 gap-2 ">
                            <h1 className="w-full font-semibold text-center"> {props.votes} </h1>
                            <div className="hover:cursor-pointer" onClick={handleClickVote}>
                                 <HeartIcon 
                                 fill={props.hasVoted ? "#ff0000" : ""}
                                 className="w-6 h-full "
                                 />
                            </div>
                               
                        </div>
                    </div>
                
            </div>
        </div>
    );
}