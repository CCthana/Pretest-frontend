import { useState } from "react";
import { EditIcon} from "./Icons";
import  { MainBtn } from "./Button";
import quoteApi from "@/app/api/quote";
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

export default function MyQuoteCard(props: QuoteCardProps) {

   const [isEditing, setIsEditing] = useState(false); 
   const [editedTitle, setEditedTitle] = useState(props.title);

    const handleEditClick = () => {
    setIsEditing(true); 
  };

  const handleSave = async () => {
    setIsEditing(false); 
    if (editedTitle !== props.title) {
     try {
         const accessToken = localStorage.getItem("accessToken");
         if (!accessToken) {
            throw new Error("Access token is missing");
         } 
         await quoteApi.editQuote({id: props.id, title: editedTitle }, accessToken);
         Swal.fire({
            position: "center",
            title: "Voted Successfully!!",
            icon: "success"
            }).then(() => {
            window.location.reload();
            });
     } catch (error) {
       console.error("Error updating quote:", error);
     }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value); 
  };

 

  return (
    <div className=" w-1/3 h-64 mt-2 px-8  ">
      <div className="w-full bg-white h-full rounded-xl  flex flex-col shadow-2xl ">
        <div className="flex justify-center  h-full flex-col rounded-lg px-2 ">
          <span className="text-3xl font-semibold ml-2"> " </span>
          {isEditing ? (
            <div className="flex flex-col items-center">
            <input
              type="text"
              value={editedTitle}
              onChange={handleInputChange}
              className="w-full h-20 rounded-2xl text-md font-semibold bg-[#605cff] text-white outline-none text-center overflow-hidden text-ellipsis whitespace-normal break-words  border-gray-300 px-2"
              maxLength={60}
              autoFocus
            />
         <div className="w-2/3 flex justify-center items-center gap-4">
            <MainBtn title="Save" onClick={handleSave} />
            <MainBtn title="Cancel"onClick={() => setIsEditing(false)} />
         </div>
           
            </div>
          ) : (
            <h1 className="text-md font-semibold text-center overflow-hidden text-ellipsis whitespace-normal break-words">
              {props.title}
            </h1>
          )}
          <span className="text-3xl font-semibold text-end mr-2"> " </span>
        </div>

        <div className="w-full flex justify-between bg-[#605cff] py-2 rounded-b-lg px-1 text-white">
          <h1 className="w-full font-semibold px-2"> {props.userName} </h1>

          <div className="flex px-2 gap-2 ">
            <h1 className="w-full font-semibold text-center">
              {props.votes}
            </h1>
            <div className="hover:cursor-pointer" onClick={handleEditClick}>
              <EditIcon  className="w-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
