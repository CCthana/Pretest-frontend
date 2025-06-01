"use client";
import { ChangeEvent, useEffect, useState } from "react";
import LoginBtn from "./Button";
import userApi from "@/app/api/user";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import axios from "axios";

const Login = ({handleClickRegis}: { handleClickRegis: () => void }) => { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

   const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await userApi.login({ email, password });
      console.log(response)

      localStorage.setItem("accessToken", response.data.access_token);
      document.cookie = `accessToken=${response.data.access_token}; path=/; secure; SameSite=Strict`; 

      Swal.fire({
          title: "Login success",
          icon: "success",
          text: 'Welcome back!',
          }).then(() => {
             router.push("/"); 
        });
     

    } catch (error) {
      console.error("Login failed:", error);
      Swal.fire({
        title: "Error!",
        text: 'Wrong email or password, Please try again',
        icon: "error"
      });
    }
  };


  useEffect(() => {
   const pingApi = async () => { 
      try {
         await axios.get("https://pretest-backend.onrender.com")
         console.log("API is reachable");
      } catch (error) {
         console.error("Error pinging API:", error);
      }
   };

   const interval = setInterval(() => {
      pingApi();
    }, 300000); 

   return () => clearInterval(interval); 
  }, []);


   return (     

                <div className="flex flex-col justify-center items-center w-full " > 
                  <h1 className="mb-8 mt-12 text-3xl font-bold"> Login </h1>               
                  <div className="w-3/4 mb-8 mt-4 ">
                    <h4 className="font-semibold"> Email </h4>
                    <input
                      className="w-full border-b-[1.5px] border-gray-500 outline-none bg-none p-2 text-md "
                      maxLength={20}
                      placeholder="Type your email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
      
                  <div className="w-3/4 mb-16 ">
                    <h4 className="font-semibold"> Password </h4>
                    <input
                      type="password"
                      className=" w-full border-b-[1.5px] border-gray-500 outline-none bg-none  p-2 text-md  "
                      maxLength={20}
                      placeholder="Type your password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
      
                 <LoginBtn title="Login" onClick={handleSubmitLogin} />
              
                  <div className="mb-10">
                    <div>
                      Don't have account?
                      <span className="font-semibold mx-2 text-blue-500 hover:text-blue-900 hover:cursor-pointer" onClick={handleClickRegis}>
                        Sign up
                      </span>
                    </div>
      
                  </div>
                  
                </div>
     
       
   )
};


 const  Register = ({ handleClickLogin }: { handleClickLogin: () => void }) => {
      interface RegisterInput {
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
      }

      const initialRegisInput: RegisterInput = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
      };

      const [regisInput, setRegisInput] = useState<RegisterInput>(initialRegisInput);
      

      const handleChangeRegisInput = (e: ChangeEvent<HTMLInputElement>) => {
         setRegisInput({ ...regisInput, [e.target.name]: e.target.value });
       
      };

      const handleSubmitRegister = async (e: React.FormEvent) => {
         e.preventDefault(); 

         if (!regisInput.username || !regisInput.email || !regisInput.password || !regisInput.confirmPassword) {
            Swal.fire({
            title: "Error!",
            text: "Please fill in all fields.",
            icon: "warning"
            });
          return;
         }

         if (regisInput.password !== regisInput.confirmPassword) {
            Swal.fire({
            title: "Error!",
            text: "Passwords do not match.",
            icon: "error"
            });
            return;
         }

         try {
            const result = await userApi.register(regisInput);
            console.log(result.data);

            Swal.fire({
            title: "Register success",
            icon: "success"
             }).then(() => {
               setRegisInput(initialRegisInput); 
               handleClickLogin();
            });
            
         } catch (error) {
            console.log(error);
            Swal.fire({
            title: "Error!",
            text: 'Please try again',
            icon: "error"
            });
         }
      };

   return (
      <div className="flex flex-col justify-center items-center w-full "> 
          <h1 className="mb-8 mt-8 text-3xl font-bold"> Register </h1>
          <div className="w-3/4 mb-8 mt-4 ">
            <h4 className="font-semibold"> Username </h4>
            <input 
              className="w-full border-b-[1.5px] border-gray-500 outline-none bg-none p-2 text-md font-semibold" 
              maxLength={30} 
              placeholder="Type your Name"
              name="username"
              onChange={handleChangeRegisInput}
            />
          </div>

          <div className="w-3/4 mb-8 ">
            <h4 className="font-semibold"> Email </h4>
            <input 
              className="w-full border-b-[1.5px] border-gray-500 outline-none bg-none p-2 text-md font-semibold" 
              maxLength={20} 
              placeholder="Type your email"
              name="email"
             onChange={handleChangeRegisInput}
            />
          </div>

          <div className="w-3/4 mb-8  ">
            <h4 className="font-semibold"> Password </h4>
            <input 
              type="password" 
              className=" w-full border-b-[1.5px] border-gray-500 outline-none bg-none  p-2 text-md font-semibold " 
              maxLength={20} 
              placeholder="Type your password"
              name="password"
             onChange={handleChangeRegisInput}
            />
          </div>

          <div className="w-3/4 mb-8  ">
            <h4 className="font-semibold"> Confirm Password </h4>
            <input 
              type="password" 
              className=" w-full border-b-[1.5px] border-gray-500 outline-none bg-none  p-2 text-md font-semibold " 
              maxLength={20} 
              placeholder="Type your Confirm password"
              name="confirmPassword"
              onChange={handleChangeRegisInput}
            />
          </div>

            
          <LoginBtn title="Register" onClick={handleSubmitRegister} />
            
          

          <div className="mb-10">
            <div> Already have an account? <span className="font-semibold mx-2 text-blue-500 hover:text-blue-900 hover:cursor-pointer"  onClick={handleClickLogin} > Login </span>  </div>
          </div>
        </div>
   )
};

export default function LoginDialog (){

   const [regis, setRegis] = useState<boolean>(false);

   const handleClickRegis = () => {
      setRegis(true); 
   };

   const handleClickLogin = () => {
      setRegis(false); 
   };

   
   return (
      <>
       <div className="bg-[#ffff] w-1/3 rounded-2xl shadow-2xl">
         {regis ? 
         <Register handleClickLogin={handleClickLogin} /> 
         : <Login handleClickRegis={handleClickRegis} />
         }  
       </div>
         
      </>
            
   )
};