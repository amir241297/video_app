import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

const initialState={
    name:'',
    email:'',
    password:''
}

export const CreateAccount = () => {
    const [state,setState]=useState(initialState)
    const [isAuth, setIsAuth] = useState(false)
    if (isAuth) { return <Navigate to={'/'} /> }
    const handleChange=(e)=>{
        const {value,name}=e.target
        setState({...state,[name]:value})
    }
    const hanldeSubmit=async(e)=>{
        // setState({name:value})
        e.preventDefault()
        // console.log(state)
        try{
            let res=await fetch('http://localhost:8080/createAccount',{
                method:"POST",
                body:JSON.stringify(state),
                headers:{
                    "Content-Type":'application/json'
                }
            })
            let data=await res.json()
            console.log(data)
            setIsAuth(true)
        }catch(err){
            console.log(`Error While create Account ${err}`)
        }
    }
    return (
        <div className='userLogin'>
            <form action="" >
                <h1>Create Account</h1>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" onChange={(e)=>handleChange(e)} name='email'/>
                </div>
                <div>
                    <label htmlFor="">Name: </label>
                    <input type="text" name="name" id="" onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label htmlFor="">Password: </label>
                    <input type="password" name="password" id="" onChange={(e)=>handleChange(e)}/>
                </div>

                <input className='button'  type="submit" name="" id="" value={"Sign up"} onClick={hanldeSubmit}/>
            </form>
        </div>
    )
}
