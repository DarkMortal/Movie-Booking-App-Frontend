import PropTypes from "prop-types";
import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

function CardSkeleton({ num, isDark }) {
  let widgets = [];
  for (let i = 0; i < num; i++)
    widgets.push(
      <Box
        style={{
          margin: "10px",
          backgroundColor: isDark ? "#1a202b" : "#ffffff",
          transition: "ease-out 0.5s",
        }}
        minWidth="sm"
        padding="6"
        boxShadow="lg"
        key={i}
      >
        <Skeleton height="100px" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
    );
  return widgets;
}

CardSkeleton.propTypes = {
  num: PropTypes.any.isRequired,
  isDark: PropTypes.bool.isRequired
};

export default CardSkeleton;
