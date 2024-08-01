import { Component } from "react";
import PropTypes from "prop-types";

class Footer extends Component {
  render() {
    const { isDark } = this.props;

    return (
      <footer
        className="bg-white rounded-lg shadow m-4 font-bold"
        style={{
          transition: "ease-out 0.5s",
          color: isDark ? 'white': 'black',
          backgroundColor: isDark ? "#1E2936" : "white"
        }}
      >
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-bg sm:text-center ">
            &copy; Saptarshi Dey {new Date().getFullYear()}
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-bg font-bold sm:mt-0">
            <li>
              <a
                href="https://www.linkedin.com/in/dey-saptarshi/"
                target="_blank"
                className="hover:underline me-4 md:me-6"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/DarkMortal"
                target="_blank"
                className="hover:underline me-4 md:me-6"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://medium.com/@darkmortal"
                target="_blank"
                className="hover:underline me-4 md:me-6"
              >
                Medium
              </a>
            </li>
            <li>
              <a
                href="mailto:saptarshidey.bdm@gmail.com"
                target="_blank"
                className="hover:underline"
              >
                Email
              </a>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  isDark: PropTypes.bool.isRequired,
};
export default Footer;
