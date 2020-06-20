import React from "react";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";

import Header from "../Header";
import Dropzone from "../../../../components/dropzoneDemo";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import factsIcon from "../../../../images/factsicon.png";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row max-w-screen-xl mx-auto py-8 md:py-8`;
const LeftColumn = tw.div`relative lg:w-6/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`;

const Heading = tw.h1`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight`;
const Paragraph = tw.p`my-2 text-xl xl:text-2xl`;

const HeroCardContainer = tw.div`flex justify-center items-center lg:justify-start `;

const DropzoneContainer = tw.div`flex justify-center items-center`;
const DropzoneBox = tw.div`max-w-md`;

const useStyles = makeStyles((theme) => ({
  heroCard: {
    marginTop: theme.spacing(4),
    maxWidth: "370px",
    padding: theme.spacing(3),
  },
  factsIcon: {
    marginBottom: theme.spacing(1),
  },
  signin: {
    color: "#49535B",
    textDecoration: "underline",
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

export default ({ roundedHeaderButton }) => {
  const classes = useStyles();

  return (
    <section id="aboutus">
      <Header roundedHeaderButton={roundedHeaderButton} />
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>You emit what you eat.</Heading>
            <Paragraph>
              Food accounts for up to 30% of your carbon footprint. <br></br>See
              how your lunch scores on emissions.
            </Paragraph>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              <Link style={{ color: "#FFF" }} to="/signup">
                See Your Score Now
              </Link>
            </Button>
            <HeroCardContainer>
              <Card className={classes.heroCard}>
                <CardContent>
                  <div>
                    <img
                      src={factsIcon}
                      className={classes.factsIcon}
                      alt="factsIcon"
                    />
                  </div>
                  <Typography
                    variant="subtitle1"
                    color="secondary"
                    gutterBottom
                  >
                    <strong>Did you know?</strong>
                  </Typography>
                  <Typography
                    className={classes.title}
                    color="secondary"
                    gutterBottom
                  >
                    Beef and lamb are the most carbon intensive foods! Cattle
                    results in emission of 15-27 kilograms...
                  </Typography>
                </CardContent>
                <CardActions style={{ paddingLeft: "16px" }}>
                  <Typography variant="body1" color="textPrimary">
                    Already have an account? <br></br>
                    <Link to="/login" className={classes.signin}>
                      Sign in here
                    </Link>
                  </Typography>
                </CardActions>
              </Card>
            </HeroCardContainer>
          </LeftColumn>
          <RightColumn>
            <DropzoneContainer>
              <DropzoneBox>
                <Dropzone />
              </DropzoneBox>
            </DropzoneContainer>
          </RightColumn>
        </TwoColumn>
      </Container>
    </section>
  );
};
