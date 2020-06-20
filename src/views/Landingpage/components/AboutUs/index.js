import React from "react"
import tw from "twin.macro"
import { css } from "styled-components/macro" //eslint-disable-line
import { ContentWithPaddingXl, Container } from "../Layouts"
import { SectionHeading as Heading } from "../Heading"

import wobin from "../../../../images/Wobin.png"
import ray from "../../../../images/Ray.png"
import rio from "../../../../images/rio.png"
import calvin from "../../../../images/calvin.png"

const Testimonials = tw.div`flex flex-col lg:flex-row items-center lg:items-stretch`;
const TestimonialContainer = tw.div`mt-16 lg:w-1/4`;
const Testimonial = tw.div`px-4 text-center max-w-xs mx-auto flex flex-col items-center`;
const Image = tw.img`w-20 h-20 rounded-full`;
const Quote = tw.blockquote`mt-5 text-gray-600 font-medium leading-loose`;
const Name = tw.p`mt-5 text-gray-900 font-semibold uppercase text-sm tracking-wide`;

export default ({
  heading = (
    <>
      <span tw="text-primary-500">Meet the Team</span>
    </>
  ),
}) => {
  return (
    <Container id="aboutus">
      <ContentWithPaddingXl>
        <Heading>{heading}</Heading>
        <Testimonials>
          <TestimonialContainer>
            <Testimonial>
              <Image src={calvin} />
              <Name>Calvin Chen</Name>
              <Quote>my name calvin</Quote>
            </Testimonial>
          </TestimonialContainer>
          <TestimonialContainer>
            <Testimonial>
              <Image src={ray} />
              <Name>Ray Zhang</Name>
              <Quote>
                my name ray
              </Quote>
            </Testimonial>
          </TestimonialContainer>
          <TestimonialContainer>
            <Testimonial>
              <Image src={rio} />
              <Name>Rio Ishii</Name>
              <Quote>
                my name rio
              </Quote>
            </Testimonial>
          </TestimonialContainer>
          <TestimonialContainer>
            <Testimonial>
              <Image src={wobin} />
              <Name>Wo Bin Chen</Name>
              <Quote>
                Wo Bin has a focus in HCI and he is a UX designer, who enjoys
                working on projects that make a positive impact in the world. He
                is concerned about the wellbeing of others and wants to make a
                future that is happy for everyone around him.
              </Quote>
            </Testimonial>
          </TestimonialContainer>
        </Testimonials>
      </ContentWithPaddingXl>
    </Container>
  )
}
