import { Helmet } from "react-helmet-async";
import Typography from "@material-ui/core/Typography";

const Home = () => {

  return (
    <div>
      <Helmet>
        <title>Home | Tasks App</title>
      </Helmet>
        <Typography variant="h1">
            Tasks App
        </Typography>
    </div>
  );
};

export default Home;
