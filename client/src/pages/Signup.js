import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import {
  Box,
  Flex,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Input,
  Center,
} from "@chakra-ui/react";

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { username: formState.username, email:formState.email, password:formState.password },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Flex
      className="flex-row justify-center mb-4"
      justifyContent="center"
      mt="10"
    >
      <div className="col-12 col-lg-10">
        <Card className="card">
          <CardHeader
            className="card-header bg-dark text-light p-2"
            textAlign="center"
            bg="white"
          >
            Sign Up
          </CardHeader>
          <CardBody className="card-body" bg="white">
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ background: "white" }}>
                 <Input
                  variant="something"
                  className="form-input"
                  placeholder="Your email"
                  name="username"
                  type="text"
                  value={formState.name}
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
                    Submit
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

export default Signup;