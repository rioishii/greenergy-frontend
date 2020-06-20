import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "../Heading";
import stepsImage from "../../../../images/login.png";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24 items-center`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-6/12 flex-shrink-0 relative`;
const TextColumn = styled(Column)((props) => [
  tw`md:w-6/12 mt-16 md:mt-0`,
  props.textOnLeft
    ? tw`md:mr-12 lg:mr-16 md:order-first`
    : tw`md:ml-12 lg:ml-16 md:order-last`,
]);

const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Heading = tw(
  SectionHeading
)`mt-4 font-black text-gray-700 text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;

const Steps = tw.ul`mt-12`;
const Step = tw.li`mt-8 flex flex-col md:flex-row items-center md:items-start`;
const StepNumber = tw.div`font-semibold text-4xl leading-none text-gray-400`;
const StepText = tw.div`mt-3 md:mt-0 md:ml-6`;
const StepHeading = tw.h6`leading-none text-xl font-semibold`;
const StepDescription = tw.p`mt-3 max-w-xs leading-loose text-sm text-gray-600 font-medium`;

export default ({
  heading = (
    <>
      Easy to <span tw="text-primary-500">Get Started.</span>
    </>
  ),
  textOnLeft = false,
  steps = null,
}) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

  const defaultSteps = [
    {
      heading: "Take a picture",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    },
    {
      heading: "Upload",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    },
    {
      heading: "See results!",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    },
  ];

  if (!steps) steps = defaultSteps;

  return (
    <section id="steps">
      <Container>
        <TwoColumn>
          <ImageColumn>
            <img
              src={stepsImage}
              style={{ maxWidth: "100%", height: "auto" }}
              alt="stepsimg"
            />
          </ImageColumn>
          <TextColumn textOnLeft={textOnLeft}>
            <TextContent>
              <Heading>{heading}</Heading>
              <Steps>
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepNumber>
                      {(index + 1).toString().padStart(2, "0")}
                    </StepNumber>
                    <StepText>
                      <StepHeading>{step.heading}</StepHeading>
                      <StepDescription>{step.description}</StepDescription>
                    </StepText>
                  </Step>
                ))}
              </Steps>
            </TextContent>
          </TextColumn>
        </TwoColumn>
      </Container>
    </section>
  );
};
