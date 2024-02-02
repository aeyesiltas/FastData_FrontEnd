import { Button, TextInput } from "evergreen-ui";
import NavbarComponent from "../common/navbar-component";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toaster } from "evergreen-ui";

function SignupComponent() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const navigate = useNavigate()

    const onSignupPressed = () => {
        var body = new FormData();
        body.append('username', email)
        body.append('password', password)

        // replace with constant proxy
        axios.post("http://localhost:5000/signup", body).then(s => {
            toaster.success('Account created!')    
            navigate("/login");
        })
    }

    return ( 
        <div style={{ height: "70vh" }}>
        <NavbarComponent />

        <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100%" }}>

            <div className="card p-5">
                <h1 className="text-start mb-5">
                    <b>Sign Up</b>
                </h1>
                <TextInput placeholder="E-mail" required="true" value={email} type="email" marginBottom="4%" padding="10px" onChange={(e)=>{setEmail(e.target.value)}}></TextInput>
                <TextInput placeholder="Password" required="true" value={password} type="password" marginBottom="4%" padding="10px" onChange={(e)=>{setPassword(e.target.value)}}></TextInput>
                <TextInput placeholder="Re-enter Password" required="true" value={rePassword} type="password" marginBottom="4%" padding="10px" onChange={(e)=>{setRePassword(e.target.value)}}></TextInput>

                <div className="d-flex flex-row gap-3">
                    <Button intent="none">
                        Already have an account?
                    </Button>
                    <Button appearance="primary" intent="success" onClick={onSignupPressed}>
                        Sign up
                    </Button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default SignupComponent;