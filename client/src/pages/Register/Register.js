import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Redirect } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';

import Light from '../../assets/light.svg';

import {
  Main,
  Container,
  RegisterBox,
  InputContainer,
  Input,
  SignIn,
  ErrorText,
  CustomRegisterCss,
} from './style';

const MUTATION_REGISTER_USER = loader('./mutationRegisterUser.graphql');

function Register() {
  const [redirect, setRedirect] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  const [reg, { loading }] = useMutation(MUTATION_REGISTER_USER);

  if (loading) {
    return <Loader />;
  }

  async function onSubmit(data) {
    if (data.password === data.rePassword) {
      try {
        await reg({
          variables: {
            email: data.email,
            password: data.password,
            name: data.firstname,
            lastName: data.lastname,
          },
        });
        
        setRedirect(true);
        
      } catch (error) {
        // console.log(consoled)
        console.log(JSON.stringify(error, null, 2));
      }
    }
  }

  return redirect === true ? (
    <Redirect to='/signin' />
  ) : (
    <Main>
      <Header />
      <Container>
        <img alt='light' src={Light}></img>
        <form onSubmit={handleSubmit(onSubmit)}>
          <RegisterBox>
            <span>Register</span>
            <InputContainer>
              <label>First name</label>
              <Input
                name='firstname'
                placeholder='Joe'
                maxLength='15'
                ref={register({
                  required: 'Full Name is required.',
                  maxLength: 10,
                  minLength: {
                    value: 3,
                    message: 'Must be 3 or more letters.',
                  },
                })}
              />

              <ErrorMessage errors={errors} name='firstname' as={<ErrorText />}>
                {({ message }) => <p>{message}</p>}
              </ErrorMessage>
            </InputContainer>

            <InputContainer>
              <label>Last name</label>
              <Input
                name='lastname'
                placeholder='Don'
                maxLength='15'
                ref={register({
                  required: 'Last Name is required.',
                  maxLength: 10,
                  minLength: {
                    value: 3,
                    message: 'Must be 3 or more letters.',
                  },
                })}
              />

              <ErrorMessage errors={errors} name='lastname' as={<ErrorText />}>
                {({ message }) => <p>{message}</p>}
              </ErrorMessage>
            </InputContainer>

            <InputContainer>
              <label>Email Address</label>
              <Input
                name='email'
                placeholder='joe@don.com'
                maxLength='30'
                ref={register({
                  required: 'Email address is required.',
                  maxLength: 20,
                  pattern: {
                    //eslint-disable-next-line
                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Email address is not valid.',
                  },
                })}
              />

              <ErrorMessage errors={errors} name='email' as={<ErrorText />}>
                {({ message }) => <p>{message}</p>}
              </ErrorMessage>
            </InputContainer>

            <InputContainer>
              <label>Password</label>
              <Input
                name='password'
                type='password'
                placeholder='123456'
                maxLength='10'
                ref={register({
                  required: 'Password is required.',
                  maxLength: 10,
                  minLength: {
                    value: 2,
                    message: 'must be 2 or more letters.',
                  },
                })}
              />

              <ErrorMessage errors={errors} name='password' as={<ErrorText />}>
                {({ message }) => <p>{message}</p>}
              </ErrorMessage>
            </InputContainer>

            <InputContainer>
              <label>Re-Type Password</label>
              <Input
                name='rePassword'
                type='password'
                placeholder='123456'
                maxLength='10'
                ref={register({
                  required: 'Re-type Password.',
                  maxLength: {
                    value: 10,
                    message: 'must be 10 or less letters.',
                  },
                  minLength: {
                    value: 2,
                    message: 'must be 2 or more letters.',
                  },
                })}
              />

              <ErrorMessage
                errors={errors}
                name='rePassword'
                as={<ErrorText />}
              >
                {({ message }) => <p>{message}</p>}
              </ErrorMessage>
            </InputContainer>

            <SignIn to='/signin'>Sign In</SignIn>

            <Button addCSS={CustomRegisterCss} type='submit'>
              Register
            </Button>
          </RegisterBox>
        </form>
      </Container>
    </Main>
  );
}

export default Register;
