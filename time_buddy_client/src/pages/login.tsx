import React from 'react';

const LoginPage = () => {

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })

    return (
        <form>
            <label htmlFor="username">Username</label>
            <input placeholder="Username"/>
            <label htmlFor="password">Password</label>
            <input placeholder="Password"/>
            <button disabled="true" type = "submit">Login</button>
        </form>
    )
}

export default LoginPage;


