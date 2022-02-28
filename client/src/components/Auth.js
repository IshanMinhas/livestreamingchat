import axios from "axios"
import { useState } from "react"
import { useCookies } from 'react-cookie'



const Auth = () => {
    const [cookies, setCookie , removeCookie] =  useCookies(['user']) // acc to documentation
    const [username, setUsername] = useState(null)
    const [password, setpassword] = useState(null)
    const [confirmpassword, setconfirmpassword] = useState(null)
    const [error, seterror] = useState(false)
    const [islogin, setislogin] = useState(true)
    
    

    console.log(username)
    console.log(password)
    const handleSubmit = async (endpoint) => {
        console.log(endpoint)
        if(!islogin && password !== confirmpassword){
            seterror(true)
            return
        }
            const response  =await axios.post(`http://localhost:8000/${endpoint}`, 
            {username , password}
            )
            console.log(response)
            setCookie('Name' , response.data.username)
            setCookie('HashedPassword' , response.data.hashedpassword)
            setCookie( 'UserId' , response.data.userId)
            setCookie('AuthToken' , response.data.token)

            window.location.reload() // once the data is sent we reload the winddw
        }


    
    
    
    return(
        <div className="auth-container">
            <div className="auth_container-box">
                <div className="auth_container-box-form">
                    <input
                        type = "text"
                        id = "username"
                        name = "username"
                        placeholder="username"
                        onChange= {(e)=> setUsername(e.target.value)}
                    />
                    <input
                        type = "text"
                        id = "password"
                        name = "password"
                        placeholder="password"
                        onChange= {(e)=> setpassword(e.target.value)}
                    />
                    
                   {!islogin && <input
                        type = "text"
                        id = "password-check"
                        name = "password-check"
                        placeholder="confirmpassword"
                        onChange= {(e)=> setconfirmpassword(e.target.value)}
                    />}
                    {error && <p> ******* make sure passwords match </p>}
                   <button className ="standard-button"     onClick={() => handleSubmit(islogin? 'login' : 'signup')}>GO!</button> 

                </div>
                <div className="auth_options"> 
                <button onClick={() => setislogin(false)}
                style ={{backgroundColor: !islogin?'#151a1f': '#070a0d' } }
                 > Signup</button>
                <button onClick={()=>  setislogin(true)}
                style ={{backgroundColor: islogin? '#151a1f': '#070a0d' } }
                >Login</button>     
                </div>

            </div>
            
        </div>
    )
}
export default Auth