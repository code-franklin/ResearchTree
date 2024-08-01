import React from 'react'
import './LoginFunction.css';



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
      <button className="Username"> <img className="inline-block mr-1" src="./src/assets/username-icon.png"/> Username</button>
      <button className="Password"> <img className="inline-block mr-2" src="./src/assets/password-icon.png"/>Password</button>
      <button className="Login">Login </button>
      <h1 className="Register"><span className="text1">Don’t have an Account?</span> <span className="text2">Sign up here</span></h1>
    </div>
  )
}

export default LoginFunction