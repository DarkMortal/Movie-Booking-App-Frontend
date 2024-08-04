import { useState, useEffect, useRef } from "react";
import {
  Text,
  Button,
  Input,
  Container,
  ButtonGroup,
  IconButton,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  TableContainer,
  TableCaption,
  Tr,
  Td,
  Th,
  Thead,
  Tbody,
  Table,
} from "@chakra-ui/react";
import CardSkeleton from "./components/skeleton";
import {
  MoonIcon,
  SunIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import MovieCard from "./components/movieCard";
import SignupComponent from "./components/signUp";
import LoginComponent from "./components/Login";
import { isNull } from "./components/isNull";
import Footer from "./components/Footer";
import getProperDate from "./components/dateParser";

const data_url = "https://mbs-backend-w63h.onrender.com/";

function App() {
  const searchRef = useRef(null);
  const toast = useToast();
  const [bookings, updateBookings] = useState({});
  const [isLoading, update_loading] = useState(true);
  const [movie_array, update_movies] = useState([]);
  const [currentPage, updateCurrentPage] = useState(1);
  const [isDark, changeMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [itemsPerPage, changeItemsPerPage] = useState(6);
  const [loggedInUser, updateLoggedInUser] = useState(null);

  const toggleTheme = () => changeMode(!isDark);
  const nextPAGE = () =>
    updateCurrentPage(isNull(movie_array) ? currentPage : currentPage + 1);
  const prevPAGE = () =>
    updateCurrentPage(currentPage > 1 ? currentPage - 1 : 1);

  function logout() {
    localStorage.removeItem("jwtAuthToken");
    updateLoggedInUser(null);
    updateBookings({});
  }

  useEffect(() => {
    if (isNull(localStorage.getItem("jwtAuthToken"))) return;

    fetch(`${data_url}getUserDetails`, {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "text/plain",
      },
      body: JSON.stringify({
        jwtAuthToken: localStorage.getItem("jwtAuthToken"),
      }),
    })
      .then(async (response) => {
        let data = await response.json();
        updateLoggedInUser({ id: data["userid"], name: data["username"] });
      })
      .catch((err) => {
        console.error(err);
        logout();
      });
  }, []);

  function searchMovie() {
    if (searchRef.current.value.trim() === "") {
      toast({
        title: "Blank search query",
        description: "Please enter a valid search query",
        status: "warning",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (currentPage !== 1) updateCurrentPage(1);
    else {
      let query = `${data_url}?page=${currentPage}&limit=${itemsPerPage}&search=${encodeURIComponent(
        searchRef.current.value.trim()
      )}`;
      update_loading(true);
      fetch(query)
        .then(async (response) => {
          let data = await response.json();
          update_movies(data);
          update_loading(false);
        })
        .catch((err) => {
          console.error(err);
          update_movies([]);
          update_loading(false);
        });
    }
  }

  function getAllBookings() {
    if (isNull(loggedInUser)) return;
    fetch(`${data_url}getAllBookings`, {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "text/plain",
      },
      body: JSON.stringify({
        user_id: loggedInUser["id"],
      }),
    }).then(async (args) => {
      let arg = await args.json();
      updateBookings(arg);
    });
  }

  // TODO: get bookings if user is logged in
  useEffect(getAllBookings, [loggedInUser]);

  useEffect(() => {
    update_loading(true);
    let query = "";
    if (searchRef.current.value.trim() === "")
      query = `${data_url}?page=${currentPage}&limit=${itemsPerPage}`;
    else
      query = `${data_url}?page=${currentPage}&limit=${itemsPerPage}&search=${encodeURIComponent(
        searchRef.current.value.trim()
      )}`;
    fetch(query)
      .then(async (response) => {
        let data = await response.json();
        update_movies(data);
        update_loading(false);
      })
      .catch((err) => {
        console.error(err);
        update_movies([]);
        update_loading(false);
      });
  }, [itemsPerPage, currentPage]);

  useEffect(() => {
    document.body.style.backgroundColor = isDark ? "#101826" : "#F9F8FA";
  }, [isDark]);

  return (
    <>
      <Button
        onClick={toggleTheme}
        position="fixed"
        className="hoverBlack"
        top={5}
        left={5}
        zIndex={100}
        backgroundColor={isDark ? "#1a202b" : "#ffffff"}
        textColor={isDark ? "white" : "black"}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </Button>

      <Container
        minWidth="100%"
        //backgroundColor={isDark ? "#101826" : "#F9F8FA"}
        textColor={isDark ? "white" : "black"}
      >
        <Text
          className="text-2xl flow-root mx-auto"
          maxWidth="90%"
          style={{ paddingTop: "25px" }}
          fontFamily="Noto Sans"
        >
          <strong className="float-left">
            Welcome {isNull(loggedInUser) ? "Guest User" : loggedInUser.name}
          </strong>
          {isNull(loggedInUser) ? (
            <ButtonGroup className="float-right">
              <LoginComponent
                loginURL={`${data_url}login`}
                isDark={isDark}
                updateCurrentUser={updateLoggedInUser}
              />
              <SignupComponent
                signupURL={`${data_url}signup`}
                isDark={isDark}
              />
            </ButtonGroup>
          ) : (
            <Button className="float-right" colorScheme="red" onClick={logout}>
              Log out
            </Button>
          )}
        </Text>

        <Container
          className="flex"
          minWidth="90%"
          style={{
            paddingBottom: "20px",
            transition: "ease-out 0.5s",
            paddingRight: 0,
            paddingLeft: 0,
            justifyContent: "flex-end",
          }}
          fontFamily="Noto Sans"
        >
          <Container
            minWidth="100%"
            className="flex flex-wrap flow-root"
            textColor={isDark ? "white" : "black"}
            padding={0}
            float="right"
          >
            <Container
              minWidth="70%"
              className="flex float-left"
              marginTop="20px"
            >
              <Input
                marginRight={3}
                placeholder="Search for a movie"
                ref={searchRef}
              />
              <Button
                minWidth="20%"
                colorScheme="blue"
                onClick={searchMovie}
                isDisabled={isLoading}
                overflow="hidden"
              >
                Search
              </Button>
            </Container>
            <Container
              className="float-right"
              width="200px"
              marginTop="20px"
              padding={0}
              textAlign="right"
            >
              <Menu preventOverflow={true}>
                <MenuButton
                  backgroundColor={isDark ? "#1a202b" : "#FFFFFF"}
                  textColor={isDark ? "white" : "black"}
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  className="menuButton hoverBlack"
                  minWidth="100%"
                >
                  Movies per page
                </MenuButton>
                <MenuList
                  backgroundColor={isDark ? "#1a202b" : "#FFFFFF"}
                  textColor={isDark ? "white" : "black"}
                  borderColor={isDark ? "#1a202b" : "#FFFFFF"}
                >
                  {Array.from(Array(10).keys(), (index) => (
                    <MenuItem
                      key={index}
                      isDisabled={isLoading}
                      style={{ backgroundColor: "inherit", color: "inherit" }}
                      onClick={() => {
                        updateCurrentPage(1);
                        changeItemsPerPage(index + 1);
                      }}
                    >
                      {index + 1}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Container>
          </Container>
        </Container>
      </Container>
      <div
        className={`flex justify-center flex-wrap -m-4 ${
          isNull(movie_array) && !isLoading ? "noMovie" : ""
        }`}
        style={{
          //backgroundColor: isDark ? "#101826" : "#F9F8FA",
          transition: "ease-out 0.5s",
        }}
      >
        {isLoading ? (
          <div className="text-2xl mx-auto flex flex-wrap justify-center">
            <CardSkeleton num={itemsPerPage} isDark={isDark} />
          </div>
        ) : isNull(movie_array) ? (
          <div
            className="text-2xl m-auto"
            style={{
              fontWeight: "bold",
              color: isDark ? "white" : "black",
              transition: "ease-out 0.5s",
            }}
          >
            No movies to show
          </div>
        ) : (
          movie_array.map((e) => (
            <MovieCard
              movie={e}
              isDark={isDark}
              key={e.id}
              userid={isNull(loggedInUser) ? null : loggedInUser.id}
              bookingDate={
                isNull(bookings[e.id]) ? null : bookings[e.id]["date"]
              }
              bookingURL={`${data_url}book`}
              deleteBookingURL={`${data_url}deleteBooking`}
              updateBookingList={getAllBookings}
            />
          ))
        )}
      </div>
      <Container
        className="flex justify-center"
        style={{ columnGap: "25px", marginTop: "20px", marginBottom: "20px" }}
        textColor={isDark ? "white" : "black"}
      >
        <IconButton
          colorScheme="blue"
          aria-label="Previous Page"
          icon={<ArrowBackIcon />}
          onClick={prevPAGE}
          isDisabled={isLoading || currentPage === 1}
        />
        <Text className="m-auto">
          <strong>Page {currentPage}</strong>
        </Text>
        <IconButton
          colorScheme="blue"
          aria-label="next Page"
          icon={<ArrowForwardIcon />}
          onClick={nextPAGE}
          isDisabled={isLoading || isNull(movie_array) || movie_array.length < itemsPerPage}
        />
      </Container>
      {isNull(loggedInUser) ? null : (
        <TableContainer
          backgroundColor={isDark ? "#1E2936" : "#ffffff"}
          color={isDark ? "white" : "black"}
          overflowX="auto"
          width="90%"
          className="m-auto rounded-xl"
          style={{
            transition: "ease-out 0.5s",
          }}
        >
          <Table>
            <TableCaption color={isDark ? "white" : "black"} fontSize="1rem">
              <strong>Your Bookings</strong>
            </TableCaption>
            <Thead>
              <Tr>
                <Th
                  borderColor={isDark ? "#1a202b" : "#EDF2F7"}
                  color={isDark ? "white" : "black"}
                >
                  Movie
                </Th>
                <Th
                  borderColor={isDark ? "#1a202b" : "#EDF2F7"}
                  color={isDark ? "white" : "black"}
                >
                  Date booked
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.keys(bookings).map((e) => (
                <Tr key={e}>
                  <Td
                    borderColor={isDark ? "#1a202b" : "#EDF2F7"}
                    fontFamily="Noto Sans"
                  >
                    {bookings[e]["name"]}
                  </Td>
                  <Td
                    borderColor={isDark ? "#1a202b" : "#EDF2F7"}
                    fontFamily="Noto Sans"
                  >
                    {getProperDate(bookings[e]["date"])}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <Footer isDark={isDark} />
    </>
  );
}

export default App;
