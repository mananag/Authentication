import {useMutation, useQuery} from "@apollo/client";
import mutation from "../mutations/singup";
import query from "../queries/CurrentUser";
import {useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import CurrentUser from "../queries/CurrentUser";

const SignUp = () => {
    // let email = ''
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const history = useHistory()

    const {data} = useQuery(CurrentUser)
    const [signup] = useMutation(mutation)

    const check = (data) => {
        if (data.user){
            return <Redirect to={"/"} />
        }else{

        }
    }

    const  onSubmit = (e) => {
        e.preventDefault()
        signup({
            variables: {email, password},
            refetchQueries: [{query: CurrentUser}]
        }).then(r => {
            history.push('/')
        }).catch(e => {
            if (e){
                setError("Email Address already Existed")
                console.log(e)
            }
        })
    }

    return(
        <div className={'row'}>
            {check(data)}

            <form className={'col s4'} onSubmit={onSubmit} >
                <h3>
                    Create New Account
                </h3>
                <div className={'input-field'}>
                    <input className={error && "invalid"} type={'email'}
                           id={'email'} name={'email'} value={email} required
                           onChange={e => setEmail(e.target.value)}/>
                    <label htmlFor={'email'}>Email</label>
                </div>
                <div className={'input-field'}>
                    <input className={error && "invalid"} type={'password'} value={password} id={'password'}
                           onChange={e => setPassword(e.target.value)}/>
                    <label htmlFor={'password'}>Password</label>
                    <span className="helper-text" style={{color: 'red'}} data-error="Invalid Credentials">{error}</span>

                </div>
                <button className={'btn'} type={'submit'}>
                    Create Account
                </button>
            </form>
        </div>
    )
}

export default SignUp
