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
            {run.distance} miles {(run.time / run.distance).toFixed(2)} min/mile {run.time} min
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RunDetails;
