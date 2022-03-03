import React, { useState } from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik'
import * as yup from 'yup'

export default function AddTask({addTask, addVacation, deleteVacation, date, isVacation}){
    const [isSubmitting, setIsSubmitting] = useState(false);

    const initialValues = {
        name: '',
        description: '',
        priority: ''
      }
    return(
        <Formik 
      initialValues={initialValues}
      validationSchema={yup.object({
        name: yup.string().required('Required'),
        description: yup.string().required('Required'),
        priority: yup.string().required('Required')
      })}
      onSubmit={values => {
        setIsSubmitting(true);

        addTask({...values, date: date.format('DD/MMMM/YYYY') })

        setIsSubmitting(false);
      }}
      >
      {({values, handleChange}) => <>
        <Form>
            <h1>Dodaj Zadanie</h1>
          <label htmlFor='name'>Nazwa</label>
          <Field name="name" type="text"/>
          <ErrorMessage name="name">
            {msg => <div className="field-error">{msg}</div>}
          </ErrorMessage>
          <label htmlFor='description'>Opis</label>
          <textarea name="description" value={values.description} onChange={handleChange}/>
          <ErrorMessage name="description">
            {msg => <div className="field-error">{msg}</div>}
          </ErrorMessage>
          <label htmlFor='priority'>Priorytet</label>
          <div className='select'>
            <select name="priority" onChange={handleChange}>
                <option value="">Please choose option</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>
          </div>
          <ErrorMessage name="priority">
            {msg => <div className="field-error">{msg}</div>}
          </ErrorMessage>
          <button 
          type="submit" 
          disabled={isSubmitting}>
            submit
          </button>
          
          {isVacation && <button 
            onClick={(e) => {
              e.preventDefault();
              deleteVacation(date.format('DD/MMMM/YYYY'));
            }} className='btn'>Oznacz jako dzień pracujący
            </button>}

          {!isVacation &&<button 
            onClick={(e) => {
              e.preventDefault();
              addVacation(date.format('DD/MMMM/YYYY'));
            }} className='btn-warning'>Oznacz jako dzień wolny
          </button>}

        </Form>
        </>}
      </Formik>
    )
}