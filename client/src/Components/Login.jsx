import React from 'react';
import { SignInUser } from '../helpers/apiCalls';
import { useContext } from 'react';
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
      setUser(res);
      history.push('/shop');
    } else {
      toast(`🦄 ${res.error.message}`);
    }
  };

  return (
    <section className='page-wrapper'>
      <h5>Login</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email', { required: true })} />
        {errors.email && <span>Email is required</span>}

        <input {...register('password', { required: true })} />
        {errors.password && <span>Password is required</span>}

        <input type='submit' />
      </form>
    </section>
  );
};

export default Login;