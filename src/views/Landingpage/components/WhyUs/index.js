import React from "react"
import styled from "styled-components"
import tw from "twin.macro"
import { css } from "styled-components/macro" //eslint-disable-line
import { SectionHeading } from "../Heading"
import { Container, ContentWithPaddingLg } from "../Layouts"
import whyusImg1 from "../../../../images/whyus1.png"
import whyusImg2 from "../../../../images/whyus2.png"
import whyusImg3 from "../../../../images/Car.png"

const HeadingInfoContainer = tw.div`flex flex-col items-center`

const ThreeColumnContainer = styled.div`
  ${tw`mt-10 flex flex-col items-center lg:items-stretch lg:flex-row flex-wrap lg:justify-center max-w-screen-lg mx-auto`}
`
const Column = styled.div`
  ${tw`lg:w-1/3 max-w-xs`}
`

const Card = styled.a`
  ${tw`flex flex-col items-center text-center h-full mx-4 px-4 py-8 rounded transition-transform duration-300 hover:cursor-pointer transform hover:scale-105 `}
  .imageContainer {
    ${tw`text-center rounded-full p-4 bg-gray-100`}
    img {
      ${tw`w-20 h-20`}
    }
  }

  .title {
    ${tw`mt-4 font-bold text-xl leading-none text-gray-700`}
  }

  .description {
    ${tw`mt-4 text-sm font-medium text-secondary-500`}
  }

  .link {
    ${tw`mt-auto inline-flex items-center pt-5 text-sm font-bold text-primary-300 leading-none hocus:text-primary-900 transition duration-300`}
    .icon {
      ${tw`ml-2 w-4`}
    }
  }
`;

export default ({
  heading = (
    <>
      <span tw="text-primary-500">Why Us?</span>
    </>
  ),
  cards = [
    {
      imageSrc: whyusImg1,
      title: "You Can Make a Difference",
      description:
        "Food is one of the largest contributors to climate change and most people in the world are unaware about the consequences that food has. You can use our application to make a difference in the world by becoming more aware of your food choices.",
    },
    {
      imageSrc: whyusImg2,
      title: "Machine Learning",
      description:
        "Greenergy is the newest application platform for calculating your carbon emissions based on the food you eat. We use machine learning to identify the foods you consume and determine the amount of carbon emitted. ",
    },
    {
      imageSrc: whyusImg3,
      title: "Direct Comparison",
      description: "Lorem ipsum donor amet siti ceali placeholder text",
    },
  ],
  imageContainerCss = null,
  imageCss = null,
}) => {
  return (
    <section id="whyus">
      <Container>
        <HeadingInfoContainer>
          <SectionHeading>{heading}</SectionHeading>
        </HeadingInfoContainer>
        <ContentWithPaddingLg>
          <ThreeColumnContainer>
            {cards.map((card, i) => (
              <Column key={i}>
                <Card href={card.url}>
                  <span className="imageContainer" css={imageContainerCss}>
                    <img src={card.imageSrc} alt="" css={imageCss} />
                  </span>
                  <span className="title">{card.title}</span>
                  <p className="description">{card.description}</p>
                </Card>
              </Column>
            ))}
          </ThreeColumnContainer>
        </ContentWithPaddingLg>
      </Container>
    </section>
  )
}
