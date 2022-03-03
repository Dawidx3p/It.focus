import { connect } from "react-redux";
import App from "../App";
import { deleteTask, fetchLocalData, fetchVacations } from "../redux/actions";

function mapState({tasks, vacations}){
    return({
        tasks, vacations
    })
}

function mapDispatch(dispatch){
    return({
        deleteTask: (id) => dispatch(deleteTask(id)),
        fetchLocalData: () => dispatch(fetchLocalData()),
        fetchVacations: () => dispatch(fetchVacations())
    })
}


export default connect(mapState, mapDispatch)(App)
