import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./login.css";
import { useLoading} from "../context/LoadingContext";

function Login() {
    const navigate = useNavigate()
    const { setIsLoading } = useLoading();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user, [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let res = await api.post("/login", user);
            toast.success("Login successfully")
            localStorage.setItem("token", res.data.token);
            localStorage.setItem('user' , JSON.stringify(res.data.user))
            const redirectUrl = localStorage.getItem("redirectUrl") || "/";
            localStorage.removeItem("redirectUrl");
            navigate(redirectUrl)
        } catch (err) {
            if (err.response?.status === 400) {
                toast.error(err.response?.data?.message || "somthing went wrong");
                return;
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleSignup = () => {
        <Link to={"/signup"}></Link>
    }

    return (
        <div className="login-form-body">
            <div className="container-fluid d-flex align-items-center justify-content-center py-4">
                <div className="login-form">
                    <h2 className="login-h2">Welcome back</h2>
                    <p className="login-p">Sign in to continue your journey</p>
                    <form onSubmit={handleSubmit} className="needs-validation w-100" noValidate>

                        <div>
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" name="email" value={user.email}
                                onChange={handleChange}
                                className="form-control w-100"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" name="password" value={user.password}
                                onChange={handleChange}
                                className="form-control w-100"
                                required
                            />
                        </div>
                        <button type="submit" className="login-btn btn-success w-100">Login</button><br />
                        <p style={{ textAlign : "center",}}>Forgot password</p>
                        <div className="d-flex align-items-center my-3" style={{color : "#000000"}}>
                            <hr className="flex-grow-1" /><span className="mx-3 text-muted" >OR</span> <hr className="flex-grow-1" />
                        </div>
                        <p style={{ textAlign : "center",}}>Don't have an account?&nbsp;<Link to={"/signup"} style={{
                            textDecoration : "none"
                        }}>Sign Up</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Login;
