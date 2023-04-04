import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Box, Flex, Card, CardBody, CardHeader, CardFooter, Button, Input, Center } from '@chakra-ui/react';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("This is for mutation",formState);
    try {
      const { data } = await login({

        variables: { email:formState.email, password:formState.password},
      });
      console.log(data)
      Auth.login(data.loginUser.token);

    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <Flex
      className="flex-row justify-center mb-4"
      justifyContent="center"
      mt="200"
    >
      <div className="col-12 col-lg-10">
        <Card className="card" styling={{ borderColor: "red" }}>
          <CardHeader
            className="card-header bg-dark text-light p-2"
            textAlign="center"
            bg="white"
          >
            Login Here
          </CardHeader>
          <CardBody className="card-body" bg="white">
            {data ? (
              <p>Success! You may now head to homepage</p>
            ) : (
              <form
                onSubmit={handleFormSubmit}
                style={{ background: "white" }}
              >
                <Input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  bg="beige"
                />
                <Input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                  bg="beige"
                />
                <Center bg="white">
                  <Button
                    className="btn btn-block btn-primary"
                    style={{ cursor: "pointer" }}
                    type="submit"
                    bg="red.600"
                    _hover={{ color: "cyan", transition: "80ms" }}
                  >
                    Login
                  </Button>
                </Center>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </Flex>
  );
};

export default Login;