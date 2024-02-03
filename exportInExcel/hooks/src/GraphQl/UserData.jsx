import { gql, useQuery } from '@apollo/client'
import React from 'react'

const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

const UserData = () => {
    const { loading, error, data } = useQuery(GET_USERS
        // ,  context: {
        //     headers: {
        //       Authorization: `Bearer ${customAuthToken}`, // Override with a custom token
        //     },
        //   },
        );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <div>
            {
                data?.map((user, index) => (
                    <div>{user}</div>
                ))
            }
        </div>
    )
}

export default UserData
