import React, { useState } from 'react';
import useForm from './utils/useForm';

const Form = () => {
  const [values, handleChange] = useForm();


  const submit = (evt) => {
    evt.preventDefault();
    console.log("submitted");
    console.log("GOAL: ", goal);
  }

  return(
    <form onSubmit={submit}>
      <label>Name: </label>
      <input 
        value={values.goal || ""}
        onChange={handleChange}
        name="goal"
        placeholder="Set a goal..." />
    </form>
  )
} 