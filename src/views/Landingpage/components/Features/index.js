import React from "react"
import tw from "twin.macro"
import styled from "styled-components"
import { css } from "styled-components/macro" //eslint-disable-line
import { SectionHeading as HeadingTitle } from "../Heading"
import img1 from "../../../../images/feature1.png"
import img2 from "../../../../images/feature2.png"
import img3 from "../../../../images/feature3.png"

const Container = tw.div`relative`
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`
const ThreeColumn = tw.div`flex flex-col items-center lg:items-stretch lg:flex-row flex-wrap`
const Column = tw.div`mt-24 lg:w-1/3`

const HeadingInfoContainer = tw.div`flex flex-col items-center`

const Card = tw.div`lg:mx-4 xl:mx-8 max-w-sm flex flex-col h-full`
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`bg-cover bg-center h-80 lg:h-64 rounded rounded-b-none`,
])

const Details = tw.div`p-6 rounded border-2 border-t-0 rounded-t-none border-dashed border-primary-100 flex-1 flex flex-col items-center text-center lg:block lg:text-left`

const Title = tw.h5`mt-2 leading-snug font-bold text-lg text-primary-500`
const Description = tw.p`mt-2 mb-2 text-gray-700`

export default ({
  heading = (
    <>
      <span tw="text-primary-500">Features</span>
    </>
  ),
}) => {
  return (
    <section id="features">
      <Container>
        <Content>
          <HeadingInfoContainer>
            <HeadingTitle>{heading}</HeadingTitle>
          </HeadingInfoContainer>
          <ThreeColumn>
            <Column>
              <Card>
                <Image imageSrc={img1} />
                <Details>
                  <Title>
                    Calculate how much carbon is emitted from your food
                  </Title>
                  <Description>
                    When you think about it, there are a ton of factors that
                    contribute to the carboon footprint of this. This includes
                    agriculture and transportation, where they both use
                    non-renewable energy. By using our application, you can find
                    out the specific resources used in your food and how much
                    carbon is produced.
                  </Description>
                </Details>
              </Card>
            </Column>
            <Column>
              <Card>
                <Image imageSrc={img2} />
                <Details>
                  <Title>Compare your carbon footprint to other peers</Title>
                  <Description>
                    After uploading an image, you can see your carbon emission
                    score based on the food that you share with us. The higher
                    the score you have, the more positive impact you are making.
                    You can share the score with the world, your friends, and
                    family, to show them that your diet is making a difference
                    for the world.
                  </Description>
                </Details>
              </Card>
            </Column>
            <Column>
              <Card>
                <Image imageSrc={img3} />
                <Details>
                  <Title>Provide solutions to the things you eat.</Title>
                  <Description>
                    Are you concerned about the future of the world and want to
                    make a difference? Your diet can be your first step to
                    making a difference. If you want to lower your carbon
                    footprint and you are unsure of what foods are
                    carbon-friendly, we will provide you a solution. We will
                    give you suggestions on what you can do to lower your carbon
                    footprint.
                  </Description>
                </Details>
              </Card>
            </Column>
          </ThreeColumn>
        </Content>
      </Container>
    </section>
  )
}
