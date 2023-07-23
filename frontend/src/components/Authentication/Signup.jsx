import React, { useState } from "react";
import eyeImg from '../../assets/eye.png'

import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import {
	Input,
	InputGroup,
	InputRightElement,
	InputLeftElement,
} from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";

const Signup = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [pic, setPic] = useState("");

	const postDetails = () => {}
	const submitHandler = () => {}

	return (
		<VStack spacing={2}>
			<FormControl id="name" isRequired>
				<FormLabel>Name</FormLabel>
				<Input placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)} />
			</FormControl>


			<FormControl id="email" isRequired>
				<FormLabel>Email Address</FormLabel>
				<Input type="email" placeholder="Enter Your Email Address" onChange={(e) => setEmail(e.target.value)}/>
			</FormControl>


			<FormControl id="password" isRequired>
				<FormLabel>Password</FormLabel>
				<InputGroup size="md">
					<Input type={showPassword ? "text" : "password"} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
					<InputRightElement width={12}>
						<Button mr={1} size="sm" onClick={() => { setShowPassword(!showPassword); }}>
							<img src={eyeImg} />
						</Button>
					</InputRightElement>

					{/* <InputRightElement width={14}>
						<Button style={{backgroundColor: 'transparent'}} size="sm" onClick={() => { setShowPassword(!showPassword); }}>
							<img src={eyeImg} style={{color: 'white'}} />
						</Button>
					</InputRightElement> */}

					{/* <InputRightElement width={12}>
						<Button size="sm" onClick={() => { 	setShowPassword(!showPassword); }}>
							<img src={eyeImg} style={{width: '15px'}} />
						</Button>
					</InputRightElement> */}
				</InputGroup>
			</FormControl>


			<FormControl id="password" isRequired>
				<FormLabel>Confirm Password</FormLabel>
				<InputGroup size="md">
					<Input type={showPassword ? "text" : "password"} placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
					<InputRightElement width={12}>
						<Button mr={1} size="sm" onClick={() => { setShowPassword(!showPassword); }}>
							<img src={eyeImg} />
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>

			<FormControl id="pic">
				<FormLabel>Upload your Picture</FormLabel>
				<Input type="file" p={1} accept="image/*" onChange={(e) => postDetails(e.target.files[0])} />
			</FormControl>

			<Button
				colorScheme="blue"
				width="100%"
				style={{ marginTop: 10 }}
				onClick={submitHandler}
				// isLoading={picLoading}
			>
				Sign Up
			</Button>
		</VStack>
	);
};

export default Signup;
