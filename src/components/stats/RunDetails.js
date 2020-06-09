import React from "react";
import { Box } from "@material-ui/core";

const RunDetails = ({ run }) => {
  return (
    <Box display="flex">
      <Box display="flex">
        <Box>
          Map
        </Box>
        <Box flexDirection="column">
          <Box>
            {run.date}
          </Box>
          <Box>
            Monday Morning Run
          </Box>
          <Box>
            {run.distance} {run.time / run.distance} {run.time}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RunDetails;
