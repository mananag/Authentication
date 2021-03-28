import CurrentUser from "../queries/CurrentUser";
import {useMutation, useQuery} from "@apollo/client";
import {Link} from "react-router-dom";
import query from "../queries/CurrentUser"
import mutation from "../mutations/logout";

const Header = (props) => {
    const {loading, error, data} = useQuery(CurrentUser)
    const [logout] = useMutation(mutation)

    const onLogoutClick = () => {
        logout({
            refetchQueries: [{query: query}]
        })
    }

    const renderButtons = () => {
        if (loading) return <div>Loading</div>

        if(data.user){
            return <li><a onClick={onLogoutClick}>Logout</a></li>
        }
        else {
            return (
                <div>
                    <li>
                        <Link to={'/login'}>
                            Log In
                        </Link>
                    </li>
                    <li>
                        <Link to={'/signup'}>
                            Sign Up
                        </Link>
                    </li>
                </div>
            )
        }
    }

    // console.log(data)
    if (error) return <div>Loading</div>
    return(
        <nav>
            <div className={'nav-wrapper'}>
                <Link to={'/'} className={'brand-logo left'} >Home</Link>
                <ul className={'right'}>
                    {renderButtons()}
                </ul>
            </div>
        </nav>
    )
}

export default Header
