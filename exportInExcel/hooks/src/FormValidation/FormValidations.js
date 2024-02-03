import React, { useState } from 'react'

const FormValidation = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <form>
                <input
                    type='text'
                    value={name}
                    placeholder='enter your name here'
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type='email'
                    value={email}
                    placeholder='enter your email here'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type='password'
                    value={password}
                    placeholder='enter your password here'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button>submit</button>
            </form>
        </div>
    )
}
export default FormValidation