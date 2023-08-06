import React, { useState } from "react";
import eyeImg from "../../assets/eye.png";

import { useToast } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import {
	Input,
	InputGroup,
	InputRightElement,
	InputLeftElement,
} from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	const [pic, setPic] = useState();
	const [loading, setLoading] = useState(false);
	const toast = useToast();
	const history = useHistory();

	const postDetails = (pics) => {
		setLoading(true);
		if (pics === undefined) {
			toast({
				title: "Please Select an Image.",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			return;
		}
		if (pics.type === "image/jpeg" || pics.type === "image/png") {
			const data = new FormData();
			data.append("file", pics);
			data.append("upload_preset", "MERN-Chat");
			data.append("cloud_name", "duvkpqgev");
			fetch("https://api.cloudinary.com/v1_1/duvkpqgev/image/upload", {
				method: "post",
				body: data,
			})
				.then((res) => res.json())
				.then((data) => {
					setPic(data.url.toString());
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
				});
		} else {
			toast({
				title: "Please Select an Image.",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			setLoading(false);
			return;
		}
	};
	const submitHandler = async () => {
		setLoading(true);
		if (!name || !email || !password || !confirmPassword) {
			toast({
				title: "Please Fill all Fields.",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			setLoading(false);
			return;
		}
		if (password !== confirmPassword) {
			toast({
				title: "Please Select an Image.",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			return;
		}

		try {
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};
			const { data } = await axios.post(
				"/api/user",
				{ name, email, password, pic },
				config
			);
			toast({
				title: "Registration Successful",
				status: "success",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			localStorage.setItem("userInfo", JSON.stringify(data));
			setLoading(false);
			history.push("/chats");
		} catch (error) {
			toast({
				title: "Error Occured",
				description: error.response.data.message,
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			setLoading(false);
			return;
		}
	};

	return (
		<VStack spacing={2}>
			<FormControl id="name" isRequired>
				<FormLabel>Name</FormLabel>
				<Input
					placeholder="Enter Your Name"
					onChange={(e) => setName(e.target.value)}
				/>
			</FormControl>

			<FormControl id="email" isRequired>
				<FormLabel>Email Address</FormLabel>
				<Input
					type="email"
					placeholder="Enter Your Email Address"
					onChange={(e) => setEmail(e.target.value)}
				/>
			</FormControl>

			<FormControl id="password" isRequired>
				<FormLabel>Password</FormLabel>
				<InputGroup size="md">
					<Input
						type={showPassword ? "text" : "password"}
						placeholder="Enter Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<InputRightElement width={12}>
						<Button
							mr={1}
							size="sm"
							onClick={() => {
								setShowPassword(!showPassword);
							}}
						>
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
					<Input
						type={showPassword ? "text" : "password"}
						placeholder="Confirm password"
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<InputRightElement width={12}>
						<Button
							mr={1}
							size="sm"
							onClick={() => {
								setShowPassword(!showPassword);
							}}
						>
							<img src={eyeImg} />
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>

			<FormControl id="pic">
				<FormLabel>Upload your Picture</FormLabel>
				<Input
					type="file"
					p={1}
					accept="image/*"
					onChange={(e) => postDetails(e.target.files[0])}
				/>
			</FormControl>

			<Button
				colorScheme="blue"
				width="100%"
				style={{ marginTop: 10 }}
				onClick={submitHandler}
				isLoading={loading}
			>
				Sign Up
			</Button>
		</VStack>
	);
};

export default Signup;
