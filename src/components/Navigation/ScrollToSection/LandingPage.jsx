import NavBarHeader from "./NavBarHeader"

const LandingPage = () => {
  const headerLinks = [
    { id: "about", text: "About" },
    { id: "experience", text: "Experience" },
    { id: "skills", text: "Skills" },
    { id: "contact", text: "Contact" },
  ]

  return (
    <div>
      <NavBarHeader links={headerLinks} />

      {/* The rest of your content */}
      <section id="about">About content...</section>
      <section id="experience">Experience content...</section>
      <section id="skills">Skills content...</section>
      <section id="contact">Contact content...</section>
    </div>
  )
}

export default LandingPage
