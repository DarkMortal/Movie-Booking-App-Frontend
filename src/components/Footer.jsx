import { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faGithub, faLinkedinIn, faMedium} from '@fortawesome/free-brands-svg-icons'

export class Footer extends Component {
  render() {
    return (
      <footer
        className="text-center text-lg-start text-white root-footer"
        style={{ backgroundColor: "#1c2331" }}
      >
        <section
          className="d-flex justify-content-between flow-root mx-auto"
          style={{ backgroundColor: "#6351ce", padding: '10px', paddingRight: '15px', paddingLeft: '15px' }}
        >
          <div className="float-left" style={{fontWeight: 'bold', textAlign: 'left', marginLeft: '15px'}}>
            Get connected with me on social networks
          </div>
          <div className="float-right">
            <a
              href="mailto: saptarshidey.bdm@google.com"
              className="text-white me-4"
            >
              <FontAwesomeIcon icon={faGoogle}/>
            </a>
            <a
              href="https://www.linkedin.com/in/dey-saptarshi"
              target="_blank"
              className="text-white me-4"
            >
              <FontAwesomeIcon icon={faLinkedinIn}/>
            </a>
            <a
              href="https://github.com/DarkMortal"
              target="_blank"
              className="text-white me-4"
            >
              <FontAwesomeIcon icon={faGithub}/>
            </a>
            <a
              href="https://medium.com/@darkmortal"
              target="_blank"
              className="text-white me-4"
            >
              <FontAwesomeIcon icon={faMedium}/>
            </a>
          </div>
        </section>
        <section>
          <div
            className="row mt-3"
            style={{paddingLeft: '10px', paddingRight: "10px"}}
          >
            <div
              className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4"
              style={{ width: "90%", textAlign: "left" }}
            >
              <h5><strong>About Me</strong></h5>
              <hr
                className="mb-5 mt-0 d-inline-block"
                style={{
                  width: "25%",
                  backgroundColor: "#7c4dff",
                  height: "3px",
                  border: 'none',
                }}
              />
              <p style={{fontWeight: 'bold'}}>
                My name is Saptarshi Dey and I&apos;m a proficient Software Developer
              </p>
            </div>
          </div>
        </section>
        <div
          className="text-center p-3"
          style={{backgroundColor: "rgba(0, 0, 0, 0.2)", fontWeight: 'bold'}}
        >
          Saptarshi Dey &copy; {new Date().getFullYear()}
        </div>
      </footer>
    );
  }
}

export default Footer;