import React from "react";
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";

import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const HomePage = () => {
	return (
		<Container maxW="xl" centerContent>
			<Box d="flex" justifyContent="center" p={3} bg="blackAlpha.500" w="100%" mb={5} borderRadius="lg" borderWidth="1px" style={{borderColor: '#30363d'}}>
				<Text fontSize="4xl" fontFamily="Work sans" align={'center'} color={'white'}>MERN-Chat</Text>
			</Box>
			
			<Box bg="blackAlpha.500" w="100%" p={4} borderRadius="lg" borderWidth="1px" style={{borderColor: '#30363d'}} color={'white'} >
				<Tabs isFitted variant="soft-rounded">
					<TabList>
						<Tab color={'white'}>Login</Tab>
						<Tab color={'white'}>Sign Up</Tab>
					</TabList>
					
					<TabPanels>
						<TabPanel>
							<Login />
						</TabPanel>
						<TabPanel>
							<Signup />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Container>
	);
};

export default HomePage;
