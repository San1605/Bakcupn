import { ApolloClient, InMemoryCache} from '@apollo/client';
export const client =new ApolloClient({
     uri:"",
     cache:new InMemoryCache(),
     headers: {
        // Authorization: `Bearer ${yourAuthToken}`, // Add your authentication token here
      },
});
