import React, { useState } from "react";
import eyeImg from "../../assets/eye.png";

import { useToast } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
	const toast = useToast();
	const history = useHistory();

	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const submitHandler = async () => {
		setLoading(true);
		if (!email || !password) {
			toast({ title: "Please Fill all Fields", status: "warning", duration: 5000, isClosable: true, position: "bottom" });
			setLoading(false);
			return;
		}

		try {
			const config = { headers: {"Content-type": "application/json" }};
			const { data } = await axios.post("/api/user/login", { email, password }, config );
			toast({ title: "Registration Successful", status: "success", duration: 5000, isClosable: true, position: "bottom" });
			localStorage.setItem("userInfo", JSON.stringify(data));
			setLoading(false);
			history.push("/chats");
		} catch (error) {
			toast({ title: "Error Occured", description: error.response.data.message, status: "error", duration: 5000, isClosable: true, position: "bottom" });
			setLoading(false);
			return;
		}
	};

	return (
		<VStack spacing={2}>
			<FormControl id="email" isRequired>
				<FormLabel>Email Address</FormLabel>
				<Input type="email" placeholder="Enter Your Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
			</FormControl>

			<FormControl id="password" isRequired>
				<FormLabel>Password</FormLabel>
				<InputGroup size="md">
					<Input type={showPassword ? "text" : "password"} value={password} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
					<InputRightElement width={12} color={'grey'}>
						<Button mr={1} size="sm" onClick={() => { setShowPassword(!showPassword); }}>
							<img src={eyeImg} />
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>

			<Button colorScheme="blue" width="100%" style={{ marginTop: 10 }} onClick={submitHandler} isLoading={loading}>
				Login
			</Button>
		</VStack>
	);
};

export default Login;
