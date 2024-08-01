/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-key */
import {
  Modal,
  InputRightElement,
  Input,
  InputGroup,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useToast,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRef, useState, useEffect } from "react";
import { isNull } from "./isNull";

function LoginComponent({ loginURL, isDark, updateCurrentUser }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const nameRef = useRef(null);
  const passRef1 = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    updatePass1View(false);
    updateLogState(false);
  }, [isOpen]);

  const [pass1View, updatePass1View] = useState(false);
  const [isLoggingIn, updateLogState] = useState(true);

  const togglePass1View = () => updatePass1View(!pass1View);

  const toast = useToast();

  function warning(title, message) {
    toast({
      title: title,
      description: message,
      status: "warning",
      duration: 3000,
      position: "top-right",
      isClosable: true,
    });
  }

  function formController() {
    let name = nameRef.current.value;
    let pass1 = passRef1.current.value;

    if (isNull(name)) {
      warning("Mandatory field empty", "Please enter your name");
      return;
    }

    if (isNull(pass1)) {
      warning("Mandatory field empty", "Password field can't be empty");
      return;
    }

    updateLogState(true);

    fetch(loginURL, {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "text/plain",
      },
      body: JSON.stringify({
        user_name: name,
        user_password: pass1,
      }),
    }).then(async (args) => {
      let arg = await args.json();
      toast({
        title: "Message from server",
        description: arg["message"],
        status: arg["type"],
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      updateLogState(false);
      if (arg["type"] === "success") {
        onClose();
        localStorage.setItem("jwtAuthToken", arg["token"]);
        updateCurrentUser({
          id: arg["id"],
          name: arg["name"],
        });
      }
    });
  }

  return (
    <>
      <Button
        colorScheme="blue"
        onClick={onOpen}
        // style={{ marginRight: "10px", marginTop: "10px" }}
      >
        Login
      </Button>

      <Modal
        initialFocusRef={nameRef}
        finalFocusRef={formRef}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent
          backgroundColor={isDark ? "#1a202b" : "#ffffff"}
          color={isDark ? "white" : "black"}
        >
          <ModalHeader>Sign in to your Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired={true}>
              <FormLabel>Name</FormLabel>
              <Input ref={nameRef} placeholder="Enter your Name" />
            </FormControl>

            <FormControl mt={4} isRequired={true}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={pass1View ? "text" : "password"}
                  ref={passRef1}
                  placeholder="Enter your password"
                />
                <InputRightElement>
                  <Button
                    onClick={togglePass1View}
                    style={{ backgroundColor: "transparent" }}
                  >
                    {!pass1View ? (
                      <ViewIcon color="gray.300" />
                    ) : (
                      <ViewOffIcon color="gray.300" />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={formController}
              isDisabled={isLoggingIn}
            >
              Sign in
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

LoginComponent.propTypes = {
  loginURL: PropTypes.string.isRequired,
  isDark: PropTypes.bool.isRequired,
  updateCurrentUser: PropTypes.func.isRequired,
};
export default LoginComponent;
