import React, { useEffect, useState } from 'react'

const Users = () => {
    const [error, setError] = useState<string | null>(null);
    const [users, setUsers] = useState<string[]>([]);
    
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => setUsers(data.map((item: { name: string }) => item.name)))
        .catch((error) => setError("error in fetching users"))
    }, [])
    return (
        <div>
            <h1>Users</h1>
            {error && <p>{error}</p>}
            <ul>
                {
                    users.map((item) => {
                        return (
                            <li key={item}>{item}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
export default Users