import CurrentUser from "../queries/CurrentUser";
import {useQuery} from "@apollo/client";
import {Redirect} from "react-router-dom";

export default (WrappedComponent) => {
    const RequireAuth = (props) => {
        const {loading, data} = useQuery(CurrentUser)

        if (loading){
            return <div>Loading</div>
        }

        if(data.user){
            return <WrappedComponent {...props} />
        }else{
            return <Redirect to={'login'} />
        }

    }

    return <RequireAuth />
}
