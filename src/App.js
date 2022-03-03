import './App.css';
import moment from 'moment'
import AddTask from './Containers/AddTask';
import { useEffect, useState } from 'react';
import { addDataIntoCache } from './api';

function App({ tasks, vacations, deleteTask, fetchLocalData, fetchVacations }) {
  const [active, setActive] = useState(moment());
  const [myTasks, setTasks] = useState([])

  const startDay = active.clone().startOf("month").subtract(1, 'day').startOf("week");
  const endDay = active.clone().endOf("month").endOf("week");
  const day = startDay.clone();
  const calendar = []

  const isVacation = vacations.includes(active.format('DD/MMMM/YYYY'))

  const compareTasks = (a,b) => {
    switch(a.priority){
      case 'high':
        return b.priority==='high' ? 0 : -1;
      case 'medium':
        if(b.priority==='high'){
          return 1;
        }else if(b.priority==='medium'){
          return 0
        }else{
          return -1;
        }
      case 'low':
        return b.priority==='low' ? 0 : 1;
      default:
        return -1;
    }
  }

  useEffect(() => {
    fetchLocalData()
    fetchVacations()
  }, [])

  useEffect(() => {
    if(tasks.length){
      addDataIntoCache('tasks', tasks);
    }
  }, [tasks])

  useEffect(() => {
    if(vacations.length){
      addDataIntoCache('vacations', vacations);
    }
  }, [vacations])

  useEffect(() => {
    setTasks(tasks.filter(task => task.date===active.format('DD/MMMM/YYYY')))
  }, [active, tasks])

  while(day.isBefore(endDay, "day")){
    calendar.push(
      Array(7).fill(0).map(() => day.add(1, "day").clone())
    )
  }
  return (
    <main>
      <div className="month">
      <div className='month-nav'>
        <button 
        onClick={() => setActive(prev => prev.clone().subtract(1, 'month'))}>
          {'<'}</button>
        {active.format("DD MMMM YYYY")}
        <button
        onClick={() => setActive(prev => prev.clone().add(1, 'month'))}>
          {'>'}
        </button>
      </div>
        <div className="day-names">
          <p className='name'>Mon</p>
          <p className='name'>Tue</p>
          <p className='name'>Wed</p>
          <p className='name'>Thu</p>
          <p className='name'>Fri</p>
          <p className='name'>Sat</p>
          <p className='name'>Sun</p>
        </div>
        {calendar.map((week, key) => (
          <div key={key} className="week">
            {week.map((day, key) => (
              <div 
              key={key} 
              className={`day ${day.format("L")===active.format("L") ? 'active': 'inactive'} ${vacations.includes(day.format('DD/MMMM/YYYY')) ? 'vacation': ''}`}
              onClick={() => setActive(day)}>
                {day.format("D")}
              </div>
            ))}
          </div>
        ))}
      </div>
      <section className='right-side'>
        <AddTask date={active} isVacation={isVacation}/>
      </section>
      <ul>{[...myTasks].sort(compareTasks).map((task, key) => <li className={`task ${task.priority}`} key={key}>
        <div className='inline'><h2>{task.name}</h2><button onClick={() => deleteTask(task.id)}>x</button></div>
        <p>{task.description}</p>
        <p>Priorytet: {task.priority}</p>
      </li>)}</ul>
    </main>
    
  );
}

export default App;
