import React, { useContext } from 'react';
import { SignInUser } from '../helpers/apiCalls';
import { UserContext } from '../context/UserContext';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let history = useHistory();

  const { setUser } = useContext(UserContext);

  const onSubmit = async (data) => {
    const res = await SignInUser(data);
    if (!res.error) {
      console.log(res)
      setUser(res);
      history.push('/shop');
    } else {
      toast(`🦄 ${res.error.message}`);
    }
  };

  return (
    <section className='page-wrapper'>
      <div className="container">
        <h5>Login</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input placeholder='Email' {...register('email', { required: true })} />
          {errors.email && <span>Email is required</span>}
          <input placeholder='Password' {...register('password', { required: true })} />
          {errors.password && <span>Password is required</span>}
          <button type='submit' className=''>Login</button>
        </form>
      </div>
    </section>
  );
};

export default Login;