// // import { Button } from 'antd'
// import React from 'react'
// import {AiFillGoogleCircle}from "react-icons/ai"
// import {GoogleAuthProvider, signInWithPopup,getAuth} from 'firebase/auth'
// import { app } from '../firebase'
// import { useNavigate } from 'react-router-dom'
// const Oauth = () => {
//     const auth = getAuth(app)
//     const navigate = useNavigate()
//     const handleGoogleClick = async()=>{
//         const provider = new GoogleAuthProvider()
//         provider.setCustomParameters({ prompt : 'select_account'})
//         try {
//             const resultsFromGoogle = await signInWithPopup(auth, provider)
//             console.log(resultsFromGoogle)
//             const res = await fetch('/api/google',{
//                 method : 'POST',
//                 headers : {
//                     'Content-Type' : 'application/json',
//                 },
//                 body : JSON.stringify({
//                     name:resultsFromGoogle.user.displayName,
//                     email:resultsFromGoogle.user.email,
//                     // googlePhotoUrl : resultsFromGoogle.user.photoURL
//                 }),
//             })
           
//             const data = await res.json()
//             console.log(data)
//             if(res.ok){
//                 navigate('/');
//             }
//         } catch (error) {
//             console.log(error)
            
//         }

//     }
//   return (
//     <button type='button' onClick={handleGoogleClick} className="btn btn-secondary btn-block mt-3">
//         <AiFillGoogleCircle style={{ marginRight: "8px" }}/>
//          Continue with Google
//     </button>
//   )
// }

// export default Oauth
