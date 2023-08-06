import React, { useState } from "react";
import eyeImg from "../../assets/eye.png";


import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const submitHandler = () => {};

	return (
		<VStack spacing={2}>
			<FormControl id="email" isRequired>
				<FormLabel>Email Address</FormLabel>
				<Input type="email" placeholder="Enter Your Email Address" onChange={(e) => setEmail(e.target.value)} />
			</FormControl>

			<FormControl id="password" isRequired>
				<FormLabel>Password</FormLabel>
				<InputGroup size="md">
					<Input type={showPassword ? "text" : "password"} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
					<InputRightElement width={12} color={'grey'}>
						<Button mr={1} size="sm" onClick={() => { setShowPassword(!showPassword); }}>
							<img src={eyeImg} />
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>

			<Button
				colorScheme="blue"
				width="100%"
				style={{ marginTop: 10 }}
				onClick={submitHandler}
				// isLoading={loading}
			>
				Login
			</Button>

			<Button colorScheme="red" width="100%" onClick={() => { setEmail("guest@example.com"); setPassword("123456"); }} >
				Get Guest User Credentials
			</Button>
		</VStack>
	);
};

export default Login;
