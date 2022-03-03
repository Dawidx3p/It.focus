import { connect } from "react-redux";
import AddTask from "../Components/AddTask";
import { addTask, addVacation, deleteVacation } from "../redux/actions";

function mapDispatch(dispatch){
    return({
        addTask: (task) => dispatch(addTask({...task, id: Date.now()})),
        addVacation: (date) => dispatch(addVacation(date)),
        deleteVacation: (date) => dispatch(deleteVacation(date))
    })
}


export default connect(undefined, mapDispatch)(AddTask)
