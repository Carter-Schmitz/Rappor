import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import { Box, Flex, Card, CardBody, CardHeader, CardFooter, Button, Input, Center } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import Auth from '../../utils/auth';

import "./login.css"

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  useEffect(() => {
    const alreadyLoggedIn = Auth.loggedIn();

    if (alreadyLoggedIn) {
      navigate("/feed")
    }
  })

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
    try {
      const { data } = await login({

        variables: { email:formState.email, password:formState.password},
      });

      const loginSuccess = Auth.login(data.loginUser.token)

      if (loginSuccess === false) {
        return (
          <p>
            <h1>Sorry, something went wrong</h1>
            <Link to="/">back to the homepage.</Link>
          </p>
        )
      }

      navigate("/feed")

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
      mt="10"
    >
      <div className="col-12 col-lg-10 login-card">
        <Card className="card" styling={{ borderColor: "red" }}>
          <CardHeader
            className="card-header bg-dark text-light p-2"
            textAlign="center"
            bg="white"
          >
            Login Here
          </CardHeader>
          <CardBody className="card-body" bg="white">
              <form
                onSubmit={handleFormSubmit}
                style={{ background: "white" }}
              >
                <Input
                  variant="something"
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  bg="#d3d3d3"
                  border="2px solid #000"
                  color="#000"
                  margin="5px"
                  _hover={{ color: "#fff",border:"2px solid #f8ad67",bg:"#ce7b2e", transition: "80ms" }}
                />
                <Input
                  variant="something"
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                  bg="#d3d3d3"
                  border="2px solid #000"
                  color="#000"
                  margin="5px"
                  _hover={{ color: "#fff",border:"2px solid #f8ad67",bg:"#ce7b2e", transition: "80ms" }}
                />
                <Center bg="white">
                  <Button
                    variant="something"
                    className="btn btn-block btn-primary"
                    style={{ cursor: "pointer" }}
                    type="submit"
                    bg="#dda46f"
                    color="#000"
                    _hover={{ color: "#fff",bg:"#ce7b2e", transition: "80ms" }}
                  >
                    Login
                  </Button>
                </Center>
              </form>

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