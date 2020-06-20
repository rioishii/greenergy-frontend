import React from "react"
import AnimationRevealPage from "./helper/AnimationRevealPage"
import Hero from "./components/Hero"
import Features from "./components/Features"
import Steps from "./components/Steps"
import WhyUs from "./components/WhyUs"
import AboutUs from "./components/AboutUs"
import Footer from "./components/Footer"
import theme from "../../themes"
import { MuiThemeProvider } from "@material-ui/core/styles"

const LandingPage = () => {

  return (
    <MuiThemeProvider theme={theme}>
      <AnimationRevealPage>
        <Hero roundedHeaderButton={true} />
        <Features />
        <Steps />
        <WhyUs />
        <AboutUs />
        <Footer />
      </AnimationRevealPage>
    </MuiThemeProvider>
  )
}

export default LandingPage
