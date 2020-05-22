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
        pepperoni:'',
        mushrooms:'',
        peppers:'',
        sausage:'',
        specialInstructions:''
    })

    // state for our errors
  const [errors, setErrors] = useState({
        name:'',
        size:'',
        pepperoni:'',
        mushrooms:'',
        peppers:'',
        sausage:'',
        specialInstructions:''
  });

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

    useEffect(() => {
        schema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        })
    }, [formState])

    const addNewPizza = pizza => {
        const addPizza = {
            name: pizza.name,
            size: pizza.size,
            sauce: pizza.sauce,
            toppings: pizza.toppings,
            gluten: pizza.gluten,
            specialInstructions: pizza.specialInstructions,
        };
        setFormState([...formState, addPizza]);
    };

    const handleChange = e => {
        setFormState({...formState, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        });
    }   
 // make post request, reset state
    const [ post, setPost ] = useState([]);

    //on submit
   const formSubmit = e => {
       e.preventDefault();
       axios
         .post("https://reqres.in/api/users", formState)
         .then(res => {
           setPost(res.data);
           console.log("success", post);
           console.log(res.data.size)
           setFormState({
               name: "",
               size: res.data.size,
               pepperoni: false,
               mushrooms: false,
               peppers: false,
               sausage: false,
               specialInstructions: ""
           });
         })
         .catch(err => console.log(err.response));
     };

    return (
    <div>
        <form onSubmit={formSubmit}>
        <label htmlFor="name">
            Name on Order
        <input 
            id="name"
            type="text"
            name="name"
            onChange={handleChange}
            value={formState.name}
            minLength="2"
            required
            />
        </label>

        <label htmlFor="sizes">
             Select Pizza Size:
            <select id="sizes" name="sizes" onChange={handleChange}>
                <option 
                    onChange={handleChange}
                    value="small">Small
                </option>
                <option
                    onChange={handleChange}
                    value="medium">Medium
                </option>
                <option
                    onChange={handleChange}
                    value="large">Large
                </option>
                <option
                    onChange={handleChange}
                    value="extra large">Extra Large
                </option>
            </select>
        </label>
    
        <div className= 'toppingsChecklist'>

            <h4>Select Your Toppings</h4>

            <label htmlFor = 'pepperoni'>
                <input
                    type='checkbox'
                    name='pepperoni'
                    id = 'pepperoni'
                    checked={formState.pepperoni}
                    onChange={handleChange}
                />
                Pepperoni
                </label>
                <br/>

                <label htmlFor = 'mushrooms'>
                <input
                type='checkbox'
                name='mushrooms'
                id = 'mushrooms'
                checked={formState.mushrooms}
                onChange={handleChange}
                />
                Mushrooms
                </label>
                <br/>

                <label htmlFor = 'peppers'>
                <input
                type='checkbox'
                name='peppers'
                id = 'peppers'
                checked={formState.peppers}
                onChange={handleChange}
                />
                Peppers
                </label>
                <br/>

                <label htmlFor = 'sausage'>
                <input
                type='checkbox'
                name='sausage'
                id = 'sausage'
                checked={formState.sausage}
                onChange={handleChange}
                />
                Sausage
                </label>
                <br/>
            </div>
    
            <label htmlFor = 'specialInstructions'>
                Special Instructions
                <br/>
                <textarea
                name = 'specialInstructions'
                id = 'specialInstructions'
                placeholder = 'Any special instructions on your order?'
                value={formState.specialInstructions}
                onChange={handleChange}
                />
            </label>
    </form>
        <button name="orderButton" type ="submit">Order Now!</button>
    </div>
    );
}

export default OrderForm
