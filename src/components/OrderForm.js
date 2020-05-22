import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import axios from "axios";
import * as yup from "yup";

   const schema = yup.object().shape({
    name: yup.string().required("Name is a required field."),
});

const OrderForm = props => {

    console.log(props)

    const [ buttonDisabled, setButtonDisabled ] = useState(true)

    // Intial State from form inputs
    const[ formState, setFormState ] = useState({
        name:'',
        size:'',
        sauce:'',
        toppings:'',
        gluten: '',
        specialInstructions:''
    })

    // state for our errors
  const [errors, setErrors] = useState({
        name:'',
        size:'',
        sauce:'',
        toppings:'',
        gluten: '',
        specialInstructions:''
  });

    // make post request, reset state
    const [ post, setPost ] = useState([]);

    useEffect(() => {
        schema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        })
    }, [formState])

    //validate changes
   const validateChange = e => {
       yup
         .reach(schema, e.target.name)
         .validate(e.target.value)
         .then(valid => {
           setErrors({
             ...errors,
             [e.target.name]: ""
           });
         })
         .catch(err => {
           setErrors({
             ...errors,
             [e.target.name]: err.errors[0]
           });
         });
     };
 

    return (
        <div>
            
        </div>
    )
}

export default OrderForm
