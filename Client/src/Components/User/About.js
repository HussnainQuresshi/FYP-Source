import React, { Component } from "react";
import About from "../../Containers/User/Aboutcard";
import Navbarr from "../../Containers/User/Navbarr";
import img from "../../Extra/images/about-img.jpg";
import usman from "../../Extra/images/usman.jpg";
import hussnain from "../../Extra/images/hussnain.jpg";
import basit from "../../Extra/images/basit.jpg";
export default class Abouts extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Navbarr
        check={true}
        goback={true}
        isnormalpage={true}
        {...this.props}
        title="About The Developers"
      >
        <main id="main">
          <section id="about" className="animated fadeInUp">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 about-img">
                  <img src={img} alt="" />
                </div>

                <div className="col-lg-6 content">
                  <h2>Journey’s Debriefed :</h2>
                  <h3>
                    Web development is an art of building professional and
                    responsive websites having sub-tasks or web applications
                    with reduced latency so that the user gets fully satisfied
                    while wielding it .Developers put effort for formalizing
                    their work so that all urges of the users are met with in
                    defined time provided for development .
                  </h3>

                  <ul>
                    <li>
                      Our team started its journey from learning its fundamental
                      concepts followed by convenient implementation using
                      PHP,HTML,CSS& JS when we confronted our first marketing
                      experience at fiver. With the passage of time curiosity
                      converged fully to this domain and while excelling in
                      advance learning ,grabbed the profound concepts and their
                      head to hand experience using MERN stack.Eventually an
                      application was the fruitful result of our cohort effort
                      owing to the good learning skills and devotional attitude
                      to the work assigned which assures fulfillment of all the
                      requirements with in delimited time as urged by our
                      customer.
                    </li>

                    <li>
                      <i className="ion-android-checkmark-circle"></i> Ullamco
                      Currently we are team of fresh graduates that have rapid
                      learning potential for any new technology introduced in
                      the market.We are looking for new opportunities to attain
                      and store the new knowledge with eager and curiosity into
                      our mind’s hoard.We are eager to find a suitable place for
                      us to grow and extend our sphere involving connections of
                      well experienced professionals whom will be considered a
                      vital source of gaining more experience and knowledge.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="services">
            <div className="container">
              <div className="section-header">
                <h2>Services</h2>
                <p>
                  Well if you want yourself to get served by our team after
                  appreciating what we have achieved ,down below are some
                  services you can contact for .
                </p>
              </div>

              <div className="row">
                <div className="col-lg-6">
                  <div className="box animated fadeInLeft">
                    <div className="icon">
                      <i className="fa fa-bar-chart"></i>
                    </div>
                    <h4 className="title">
                      <a href="">Aesthetical UIs</a>
                    </h4>
                    <p className="description">
                      Our team has expedient front-end developers aiming to
                      build sites’ user interfaces using Reactjs while keeping
                      all goals of usability achievable through developmental
                      practice practised.
                    </p>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="box animated fadeInRight">
                    <div className="icon">
                      <i className="fa fa-picture-o"></i>
                    </div>
                    <h4 className="title">
                      <a href="">Back-end’s scripting:</a>
                    </h4>
                    <p className="description">
                      Developers of our team use Node-js and express- js being
                      the new technologies that allow your server scripts to run
                      faster compared to PHP because traditionally, there's a
                      lot of time when a CPU sits idle while a PHP application
                      manages I/O tasks.Well there is a lot more at which node
                      js is good at while making its work even more convenient
                      utility of express js is mind blowing for easing the work
                      out.
                    </p>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div
                    className="box animated fadeInLeft"
                    data-animated-delay="0.2s"
                  >
                    <div className="icon">
                      <i className="fa fa-shopping-bag"></i>
                    </div>
                    <h4 className="title">
                      <a href="">Deployment</a>
                    </h4>
                    <p className="description">
                      Since developers are using advance architectures for
                      back-end’s deployment to ease the access in high network
                      traffic of users visiting the site.We can facilitate you
                      with such features that will make your application’s
                      request processing agile and task completion with
                      optimization provided by reduced latency .
                    </p>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div
                    className="box animated fadeInRight"
                    data-animated-delay="0.2s"
                  >
                    <div className="icon">
                      <i className="fa fa-map"></i>
                    </div>
                    <h4 className="title">
                      <a href="">We provide quick response</a>
                    </h4>
                    <p className="description">
                      If you're like most people, after you've made up your mind
                      to do a website, you want it NOW! Because we are a
                      full-service website design company, we can streamline the
                      process. We'll get you online quickly, usually in a matter
                      of weeks, sometimes days, depending on the complexity of
                      your web site.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="team" className="animated fadeInUp">
            <div className="container">
              <div className="row d-flex justify-content-center">
                <div className="col-4"></div>
                <h1>Meet Our Team</h1>
                <div className="col-4"></div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="member">
                    <About cardtitle="Basit" pic={basit} />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="member">
                    <About cardtitle="Hussnain" pic={hussnain} />
                  </div>
                </div>

                <div className=" col-md-4">
                  <div className="member">
                    <About cardtitle="Usman" pic={usman} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="contact" className="animated fadeInUp">
            <div className="container">
              <div className="section-header">
                <h2>Contact Us</h2>
                <p>
                  We will be glad if you tie a knot of communication’s rope
                  which will be tying you with us by any respective modes
                  diversified by the technology .Fill up the fields below and
                  give it a go.
                </p>
              </div>

              <div className="row contact-info">
                <div className="col-md-6">
                  <div className="contact-phone">
                    <i className="ion-ios-telephone-outline"></i>
                    <h3>Phone Number</h3>
                    <p>+92 311 8423854</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="contact-email">
                    <i className="ion-ios-email-outline"></i>
                    <h3>Email</h3>
                    <p>hussnain77133@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Navbarr>
    );
  }
}
