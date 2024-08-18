import React,{useState} from "react";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import "../../styles/AuthStyles.css"


const ForgotPassword = () => {

    const [email, setEmail]= useState("");
    const [newPassword, setnewPassword]= useState("");
    const [answer, setAnswer]= useState("");
    
    const navigate = useNavigate()
    
     // Form Function

     const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post('/api/forgot-password',{
                 email, 
                 newPassword,
                 answer
            })
        if( res && res.data.success){
            toast.success(res.data && res.data.message,{duration : 4000});
            navigate('/login'); 
        }
        else{
            toast.error(res.data.message, { duration: 4000 })
        }
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong")
        }
    }




  return (
    <Layout title={'Forgot Password'}>
       <div className="form-container">
      <form onSubmit={handleSubmit}>
      <h1 className="title">RESET PASSWORD</h1>
        
        <div className="mb-3">
          <input
            type="email"
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value);
            }}
            className="form-control"
            id="exampleInputEmail"
            placeholder="Enter Your Email"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            value={answer}
            onChange={(e)=>{
              setAnswer(e.target.value);
            }}
            className="form-control"
            id="exampleInputEmail"
            placeholder="Enter Your Favorite Sports"
            required
          />
        </div>

        <div className="mb-3">

          <input
            type="password"
            value={newPassword}
            onChange={(e)=>{
              setnewPassword(e.target.value);
            }}
            className="form-control"
            id="exampleInputPassword"
            placeholder="Enter New Password"
            required
          />
        </div>
        
           

        <button type="submit" className="btn btn-primary">
          RESET
        </button>
      </form>
    </div>
    </Layout>
  )
}

export default ForgotPassword
