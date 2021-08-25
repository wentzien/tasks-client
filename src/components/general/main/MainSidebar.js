import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, Button, Chip, Drawer, Link } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Logo from "../Logo";

const MainSidebar = (props) => {
  const { onMobileClose, openMobile } = props;
  const location = useLocation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  return (
    <Drawer
      anchor="left"
      onClose={onMobileClose}
      open={!lgUp && openMobile}
      variant="temporary"
      PaperProps={{
        sx: {
          backgroundColor: "background.default",
          width: 256
        }
      }}
    >
      <Box
        sx={{
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          p: 2
        }}
      >
        <RouterLink to="/">
          <Logo />
        </RouterLink>
          <Link
              sx={{pt: 2, pb: 2, mt: 2}}
              color="textSecondary"
              component={RouterLink}
              to="/authentication/register"
              underline="none"
              variant="body1"
          >
              Register
          </Link>
          <Link
              sx={{pt: 2, pb: 2}}
              color="textSecondary"
              component={RouterLink}
              to="/authentication/login"
              underline="none"
              variant="body1"
          >
              Login
          </Link>
      </Box>
    </Drawer>
  );
};

MainSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default MainSidebar;
