import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Validation from "../components/CreateAccountValidation";
import axios from 'axios';

const CreateAccount = () => {
    const [values, setValues] = useState({
        full_name: '',
        age: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const err = Validation(values);
        setErrors(err);
        if (err.full_name === "" && err.age === "" && err.email === "" && err.password === "") {
            axios.post('http://localhost:8800/createAccount', values)
                .then(res => {
                    navigate("/Login"); // Navigate to Login page
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="Full Name">Full Name</label>
                        <input type="text" placeholder="Enter Full Name" name="full_name" onChange={handleInput} />
                        {errors.full_name && <span className="text-danger"> {errors.full_name}</span>}
                    </div>
                    <div>
                        <label htmlFor="age">Age</label>
                        <input type="number" placeholder="Enter Age" name="age" onChange={handleInput} />
                        {errors.age && <span className="text-danger"> {errors.age}</span>}
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Enter Email" name="email" onChange={handleInput} />
                        {errors.email && <span className="text-danger"> {errors.email}</span>}
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter Password" name="password" onChange={handleInput} />
                        {errors.password && <span className="text-danger"> {errors.password}</span>}
                    </div>
                    <button type="submit">Sign Up</button>
                    <p>Already have an account?</p>
                    <Link to="/Login" className="btn btn-default border">Login</Link>

                </form>
            </div>
        </div>
    );
};

export default CreateAccount;