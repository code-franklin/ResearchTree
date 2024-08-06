import React from 'react'
import './LoginFunction.css';
import usernameIcon from '../Authenticate/username-icon.png';
import passwordIcon from '../Authenticate/password-icon.png';



function LoginFunction() {
  
  return (
    <div className="rectangle">
     
      <h1 className="hero1">Unlock your <br></br> 
      Creativity </h1>
      <img className="studentgirl " src="./src/assets/student.png"/>
       <img className="green-background  " src="./src/assets/gif.gif"/>
       <h1 className="logintext">Login </h1>
       <h1 className="logintext2">Explore hundreds of Manuscript Free</h1>
       <img className="logorstree" src="./src/assets/LogoResearchTree.png"/>
      <div className="">
       <img src={usernameIcon} alt="Username Icon" className="absolute left-20 top-1/2" />
       <input className="Username pl-[3rem] py-2" name="myInput" type="email" placeholder="Username" />
      </div>
      <div className="">
       <img src={passwordIcon} alt="Username Icon" className="absolute left-20 top-[398px]" />
       <input className="Password pl-[3rem] py-2" name="myInput" type="email" placeholder="Password" />
      </div>
    
      <button className="Login" >Login </button>
     
     <h1 className="Register"><span className="text1">Don’t have an Account?</span> <span className="text2">Sign up here</span></h1>
    </div>
  )
}

export default LoginFunction