import mutation from "../mutations/login";
import {useMutation, useQuery} from "@apollo/client";
import {useState} from "react";
import {useHistory, Redirect} from "react-router-dom";
import CurrentUser from "../queries/CurrentUser";

const Login = () => {
    // let email = ''
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const history = useHistory()

    const {data } = useQuery(CurrentUser)
    const [login] = useMutation(mutation)

    const check = (data) => {
        if (data.user){
            return <Redirect to={"/"} />
        }else{

        }
    }

    const  onSubmit = (e) => {
        e.preventDefault()
        login({
            variables: {email, password},
            refetchQueries: [{query: CurrentUser}]
        }).then(r => {
            history.push('/')
        }).catch(e => {
            if (e){
                setError("Invalid Credentials")
                console.log()
            }
        })
    }
    return(
        <div className={'row'}>
            {check(data)}
            <form className={'col s4'} onSubmit={onSubmit} >
                <h3>
                    Login
                </h3>
                <div className={'input-field'}>
                    <input className={error && "invalid"} type={'text'}  id={'email'} name={'email'} value={email}
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
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login
