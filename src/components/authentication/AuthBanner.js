import { Box, Chip, Container, Link, Tooltip, Typography } from "@material-ui/core";

const AuthBanner = () => (
  <Box
    sx={{
      backgroundColor: "background.paper",
      borderBottom: 1,
      borderColor: "divider",
      py: 2
    }}
  >
    <Container maxWidth="md">
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Chip
          color="primary"
          label="NEW"
          size="small"
        />
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            ml: 2,
            "& > img": {
              height: 30,
              mx: 2
            }
          }}
        >
          <Typography
            color="textPrimary"
            variant="subtitle2"
          >
            Save your Tasklists locally.
          </Typography>
        </Box>
      </Box>
    </Container>
  </Box>
);

export default AuthBanner;
