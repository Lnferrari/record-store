import React, { useContext } from 'react';
import { googleSignUp, SignInUser } from '../helpers/apiCalls';
import { UserContext } from '../context/UserContext';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'Leslie.Gorczany37@gmail.com',
      password: 'asd123'
    }
  });
  
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

  const responseGoogle = async (response) => {
    console.log("I AM THE GOOGLE RES OBJ =>", response);
    const {email, familyName, givenName, googleId} = response.profileObj;
    const data = {
      firstname: givenName,
      lastname: familyName,
      googleId,
      email
    }

    const res = await googleSignUp(data)
    if (!res.error) {
      setUser(res)
      history.push('/shop')
    } else {
      toast(`🦄 ${res.error.message}`);
    }
  }

  return (
    <section className='page-wrapper' id='login'>
      <div className="container">
        <h2>LOGIN</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input placeholder='Email' {...register('email', { required: true })} />
          {errors.email && <span>Email is required</span>}
          <input placeholder='Password' {...register('password', { required: true })} />
          {errors.password && <span>Password is required</span>}
          <button type='submit' className=''>LOGIN</button>
        </form>
        <GoogleLogin
          id='google-button'
          clientId="1077821100586-ha5da8f3gej7n27vf9cs29qft9k19sjv.apps.googleusercontent.com"
          buttonText="Connect with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </section>
  );
};

export default Login;