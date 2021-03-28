import {gql} from '@apollo/client'

export default gql`
    mutation SignUp($email: String!, $password: String!){
        signup(email: $email, password: $password) {
            id
            email
        }
    }
`
