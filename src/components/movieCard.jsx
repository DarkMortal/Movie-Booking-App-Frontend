import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  Image,
  Text,
  Stack,
  Heading,
  Button,
  Tag,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverBody,
  PopoverHeader,
  PopoverTrigger,
  PopoverCloseButton,
  ButtonGroup,
  Portal,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { isNull } from "./isNull";
import getProperDate from "./dateParser";

function MovieCard({
  movie,
  isDark,
  userid,
  bookingDate,
  bookingURL,
  deleteBookingURL,
  updateBookingList,
}) {
  const toast = useToast();
  const [isLoading, updateLoading] = useState(false);

  function bookMovie() {
    updateLoading(true);

    fetch(bookingURL, {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "text/plain",
      },
      body: JSON.stringify({
        movie_id: movie.id,
        user_id: userid,
      }),
    }).then(async (args) => {
      let data = await args.json();
      toast({
        title: "Message from server",
        description: data["message"],
        status: data["type"],
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      updateBookingList();
      updateLoading(false);
    });
  }

  function deleteMovie() {
    updateLoading(true);

    fetch(deleteBookingURL, {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "text/plain",
      },
      body: JSON.stringify({
        movie_id: movie.id,
        user_id: userid,
      }),
    }).then(async (args) => {
      let data = await args.json();
      toast({
        title: "Message from server",
        description: data["message"],
        status: data["type"],
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      updateBookingList();
      updateLoading(false);
    });
  }

  return (
    <Card
      className="p-4 md:w-1/2 w-full h-full movie"
      maxWidth="sm"
      p="1"
      key={movie.id}
      backgroundColor={isDark ? "#1a202b" : "#ffffff"}
      style={{
        transition: "ease-out 0.5s",
      }}
      fontFamily='Noto Sans'
    >
      <CardBody>
        <Image
          src={movie.poster_image}
          alt={`${movie.name} poster image`}
          borderRadius="lg"
          style={{ height: "20%", aspectRatio: "16/9" }}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" color={isDark ? "white" : "black"}>
            {movie.name}
          </Heading>

          <Text
            color={isDark ? "white" : "black"}
            textAlign="justify"
            height="50px"
            mb={"10px"}
            overflow="hidden"
          >
            {movie.synopsis}
          </Text>

          <Text mt={4} direction="row" style={{ marginTop: 0 }}>
            {Array.from(movie.genres, (_, index) => (
              <Tag
                size="lg"
                colorScheme="blue"
                borderRadius="full"
                variant="solid"
                key={index}
                style={{ width: "fit-content", marginRight: "5px" }}
              >
                {movie.genres[index]}
              </Tag>
            ))}
          </Text>
          <ButtonGroup>
            <Popover isLazy={true}>
              <PopoverTrigger>
                <Button variant="solid" colorScheme="blue" width="50%">
                  Show More
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent
                  backgroundColor={isDark ? "#1a202b" : "#ffffff"}
                  color={isDark ? "white" : "black"}
                  borderColor={isDark ? "#1a202b" : "#ffffff"}
                >
                  <PopoverArrow
                    backgroundColor={isDark ? "#1a202b" : "#ffffff"}
                  />
                  <PopoverCloseButton />
                  <PopoverHeader fontWeight="bold" border="0">
                    Synopsis
                  </PopoverHeader>
                  <PopoverBody>{movie.synopsis}</PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
            {isNull(bookingDate) ? (
              isNull(userid) ? (
                <Tooltip label="You need to be logged in to book a movie">
                  <Button
                    width="50%"
                    variant="solid"
                    colorScheme="green"
                    isDisabled={true}
                  >
                    Book tickets
                  </Button>
                </Tooltip>
              ) : (
                <Button
                  width="50%"
                  variant="solid"
                  colorScheme="green"
                  onClick={bookMovie}
                  isDisabled={isLoading}
                >
                  Book tickets
                </Button>
              )
            ) : (
              <Tooltip
                label={`Booked on ${getProperDate(bookingDate)}`}
                fontSize="md"
              >
                <Button
                  width="50%"
                  variant="solid"
                  colorScheme="red"
                  isDisabled={isLoading}
                  onClick={deleteMovie}
                >
                  Cancel booking
                </Button>
              </Tooltip>
            )}
          </ButtonGroup>
        </Stack>
      </CardBody>
    </Card>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  isDark: PropTypes.bool.isRequired,
  userid: PropTypes.any,
  bookingDate: PropTypes.any,
  bookingURL: PropTypes.string.isRequired,
  deleteBookingURL: PropTypes.string.isRequired,
  updateBookingList: PropTypes.func.isRequired,
};

export default MovieCard;
