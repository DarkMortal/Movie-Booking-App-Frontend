/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-key */
import {
  Modal,
  InputLeftElement,
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
import { EmailIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRef, useState, useEffect } from "react";
import { isNull } from "./isNull";

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validateEmail = (mail) => emailRegex.test(mail);

function SignupComponent({ signupURL, isDark }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef1 = useRef(null);
  const passRef2 = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    updatePass1View(false);
    updatePass2View(false);
    updateLogState(false);
  }, [isOpen]);

  const [pass1View, updatePass1View] = useState(false);
  const [pass2View, updatePass2View] = useState(false);
  const [isLoggingIn, updateLogState] = useState(true);

  const togglePass1View = () => updatePass1View(!pass1View);
  const togglePass2View = () => updatePass2View(!pass2View);

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
    let email = emailRef.current.value;
    let pass1 = passRef1.current.value;
    let pass2 = passRef2.current.value;

    if (isNull(name)) {
      warning("Mandatory field empty", "Please enter your name");
      return;
    }

    if (isNull(email) || !validateEmail(email)) {
      warning("Invalid email address", "Please provide a valid email address");
      return;
    }

    if (isNull(pass1) || isNull(pass2)) {
      warning("Mandatory field empty", "Password fields can't be empty");
      return;
    }

    if (pass1 !== pass2) {
      warning("Password mismatch", "Confrim password doesn't match");
      return;
    }

    updateLogState(true);

    fetch(signupURL, {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "text/plain",
      },
      body: JSON.stringify({
        user_name: name,
        user_email: email,
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
      if (arg["type"] === "success") onClose();
    });
  }

  return (
    <>
      <Button
        colorScheme="green"
        onClick={onOpen}
        // style={{ marginRight: "10px", marginTop: "10px" }}
      >
        Sign up
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
          <ModalHeader>Sign up for an Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired={true}>
              <FormLabel>Name</FormLabel>
              <Input ref={nameRef} placeholder="Enter your Name" />
            </FormControl>

            <FormControl mt={4} isRequired={true}>
              <FormLabel>Email Address</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <EmailIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  type="email"
                  ref={emailRef}
                  placeholder="Enter your email Address"
                />
              </InputGroup>
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

            <FormControl mt={4} isRequired={true}>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={pass2View ? "text" : "password"}
                  ref={passRef2}
                  placeholder="Enter your password again"
                />
                <InputRightElement>
                  <Button
                    onClick={togglePass2View}
                    style={{ backgroundColor: "transparent" }}
                  >
                    {!pass2View ? (
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
              Sign up
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

SignupComponent.propTypes = {
  signupURL: PropTypes.string.isRequired,
  isDark: PropTypes.bool.isRequired,
};
export default SignupComponent;
