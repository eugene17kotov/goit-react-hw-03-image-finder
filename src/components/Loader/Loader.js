import { RotatingLines } from 'react-loader-spinner';
import { Box } from 'utils/Box';

export const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      bg="#0000005e"
    >
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </Box>
  );
};
