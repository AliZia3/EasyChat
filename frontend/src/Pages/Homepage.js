import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box display="flex" justifyContent="center" p={3} bg="blackAlpha.400" w="100%" m="40px 0 15px 0" borderRadius="lg" borderWidth="1px" style={{borderColor: "#30363d"}}>
        <Text fontSize="4xl" fontFamily="Work sans" color={"#c5ccd6"}>
          EasyChat
        </Text>
      </Box>
      <Box bg="blackAlpha.400" w="100%" p={4} borderRadius="lg" borderWidth="1px" style={{borderColor: "#30363d"}} color={"#c5ccd6"}>
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab color={"#c5ccd6"}>Login</Tab>
            <Tab color={"#c5ccd6"}>Sign Up</Tab>
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
}

export default Homepage;
