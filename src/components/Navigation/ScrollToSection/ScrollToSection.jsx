// ScrollToSection: Component for smooth scrolling to a specified section
// Props:
//   - sectionId: The ID of the target section to scroll to
//   - children: The content to be rendered inside the scroll trigger (usually a button or link)
const ScrollToSection = ({ sectionId, children }) => {
  const scrollToSection = () => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return <button onClick={scrollToSection}>{children}</button>
}

export default ScrollToSection
