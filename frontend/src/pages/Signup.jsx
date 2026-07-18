import { useEffect, useState } from "react";
import api from "../api/axios" 
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./signup.css";
import { useLoading } from "../context/LoadingContext";

function Signup() {
    const navigate = useNavigate()
    const { setIsLoading } = useLoading();
    const [user, setUser] = useState({
        username: "",
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
            await api.post("/signup", { user: user });
            toast.success("User Registred Successfully");
            navigate("/")
        } catch (err) {
            if (err.response?.status === 409) {
                toast.error("User Allready Exists");
                return;
            }
            if (err.response?.status === 400) {
                toast.error(err.response?.data?.message || "somthing went wrong")
            }
        } finally {
            setIsLoading(false);
        }


    }

    return (
        <div className="signup-body">
            <div className="container-fluid d-flex align-items-center justify-content-center py-2">
                <div className="signup">
                    <h3 className="signup-h2">Create Account</h3>
                    <p className="signup-p">Join Wanderlust and start hoisting your stays.</p>
                    <div className="form-data">
                        <form onSubmit={handleSubmit} className="needs-validation w-100" noValidate>
                            <div>
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" name="username" value={user.username}
                                    onChange={handleChange}
                                    required
                                    className="signup-input form-control w-100"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" name="email" value={user.email}
                                    onChange={handleChange}
                                    required
                                    className="signup-input form-control w-100"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" name="password" value={user.password}
                                    onChange={handleChange}
                                    required
                                    className="signup-input form-control w-100"
                                />
                            </div>
                            <button type="submit" className="signup-btn w-100">Sign Up</button>
                            <p style={{ textAlign: "center", }}>Already have an account?&nbsp;<Link style={{ textDecoration: "none" }} to={"/login"}>Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Signup;