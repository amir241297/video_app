import React, { useState } from 'react'
import "../Styles/Login.css"
import { Link, Navigate } from 'react-router-dom'

const initialState = {
    name: "",
    email: ""
}
export const Login = () => {
    const [details, setDetails] = useState(initialState)
    const [showName, setShowName] = useState("Please Login")
    const[login,setLogin]=useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setDetails({ ...details, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let res = await fetch('http://localhost:8080/login', {
                method: "POST",
                body: JSON.stringify(details),
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            let data = await res.json()
            console.log(data)
            setShowName("Login Successfull!")
            setLogin(true)
        } catch (err) {
            console.log(`Error While Login Account ${err}`)
        }
    }

    return (
        <div className='userLogin'>
            <form action="">
                <h1>{showName}</h1>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name='email' onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label htmlFor="">Name: </label>
                    <input type="text" name="name" id="" onChange={(e) => handleChange(e)} />
                </div>
                <input className='button' type="submit" name="" id="" value={"Submit"} onClick={handleSubmit} />
                <hr />
                {login?  <h1><Link to='/screenRecording'>recording?</Link></h1> :<p>Dont't have an <Link to='/createAccount'>account?</Link> </p>}
            </form>
        </div>
    )
}
