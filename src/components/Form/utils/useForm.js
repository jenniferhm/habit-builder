import React, { useState } from 'react';

const useForm = () => {
  const [state, setState] = useState({});

  const handleChange = (evt) => {
    evt.persist();
    setState(state => ({ ...state, [evt.target.name]: evt.target.value }));
  };


  return [state, handleChange];
}

export default useForm;