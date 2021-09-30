import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { UserContext } from '../context/UserContext';
import { SignUpUser } from '../helpers/apiCalls';
import { toast } from 'react-toastify';


const Signup = () => {
  const { setUser } = useContext(UserContext);

  const { register, handleSubmit, formState: { errors } } = useForm();

  let history = useHistory()

  const onSubmit = async (data) => {
    const res = await SignUpUser(data)
    if (!res.error) {
      setUser(res)
      history.push('/shop')
    } else {
      toast(`🦄 ${res.error.message}`);
    }
  };

  console.log(errors);


  return (
    <section className='page-wrapper'>
      <h5>Sign Up</h5>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="First Name" {...register("firstname", {required: true, maxLength: 80})} />
        {errors.firstname && <span>First Name is required</span>}

        <input type="text" placeholder="Last Name" {...register("lastname", {required: true, maxLength: 100})} />
        {errors.lastname && <span>Last Name is required</span>}

        <input type="text" placeholder="Username" {...register("username", {})} />
        {errors.username && <span>User Name is required</span>}
        
        <input type="text" placeholder="Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
        {errors.email && <span>Email is required</span>}

        <input type="text" placeholder="Password" {...register("password", {required: true })} />
        {errors.password && <span>Password is required</span>}
        
        <input type="submit" />
      </form>
    </section>
  )
}

export default Signup
