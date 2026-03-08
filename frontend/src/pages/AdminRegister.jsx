import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminRegister() {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const registerAdmin = async () => {

    try{

      const res = await axios.post(
        "http://localhost/dscms/backend/api/register.php",
        {
          name:name,
          email:email,
          password:password,
          role:"admin"
        }
      );

      if(res.data.status === "success"){
        alert("Admin Account Created");
        navigate("/login");
      } else {
        alert("Registration failed");
      }

    }catch(err){
      alert("Server error");
    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-900">

      <div className="bg-white/10 p-10 rounded-xl w-96 text-white">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Registration
        </h2>

        <input
          placeholder="Admin Name"
          className="w-full p-2 mb-3 rounded text-black"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full p-2 mb-3 rounded text-black"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded text-black"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={registerAdmin}
          className="w-full bg-blue-600 p-2 rounded"
        >
          Create Admin
        </button>

      </div>

    </div>

  );
}

export default AdminRegister;