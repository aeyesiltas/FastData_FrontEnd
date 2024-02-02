import { Button, Link, TextInput } from "evergreen-ui";
import NavbarComponent from "../common/navbar-component";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toaster } from "evergreen-ui";

function LoginComponent() {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onLoginPressed = () => {
        setIsLoading(true);
        var body = new FormData();
        body.append('username', email)
        body.append('password', password)
        axios.post("http://localhost:5000/login", body).then(s => {
            if (s){
                setIsLoading(false)
                localStorage.setItem("user", email);
                navigate("/home");
                toaster.success('Successfully logged in!')  
            }
        }).catch(err => {
            if (err.response.status==401){
                setIsLoading(false)
                navigate("/login");
                toaster.danger('Invalid credentials!')  
            }
        })
    }

    const onNoAccountPressed = () => {
        navigate("/signup");
    }

    return (
        <div style={{ height: "70vh" }}>
            <NavbarComponent />

            <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100%" }}>

                <div className="card p-5">
                    <h1 className="text-start mb-5">
                        <b>Login</b>
                    </h1>
                    <TextInput placeholder="E-mail" required="true" value={email} type="email" marginBottom="4%" padding="10px" onChange={(e)=>{setEmail(e.target.value)}}></TextInput>
                    <TextInput placeholder="Password" required="true" value={password} type="password" marginBottom="4%" padding="10px" onChange={(e)=>{setPassword(e.target.value)}}></TextInput>

                    <div className="d-flex flex-row gap-3">
                        <Button intent="none" onClick={onNoAccountPressed}>
                            Don't have an account?
                        </Button>
                        <Button onClick={onLoginPressed} appearance="primary" isLoading={isLoading} intent="success">
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        </div>);
}

export default LoginComponent;