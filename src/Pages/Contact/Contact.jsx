import { Helmet } from "react-helmet";
import "./contact.css";

const Contact = () => {
  return (
    <div id="contact" className=" my-5">
      <Helmet>Medinova-contact</Helmet>
      <section className="contact rounded-md">
        <div className="container">
          <div className="left">
            <div className="contact_wrapper">
              <div className="contact_heading">
                <h1 className=" font-pop font-bold">
                  Lets make us smooth <span>.</span>
                </h1>
                <p>
                  Or reach us via :
                  <a href="#" className=" text-blue-500">
                    {" "}
                    medinova.official@gmail.com
                  </a>
                </p>
              </div>
              <form action="index.html" className="contact_form">
                <div className="input_wrap">
                  <input
                    className="contact_input"
                    autoComplete="off"
                    name="First Name"
                    type="text"
                    required
                  />
                  <label>First Name </label>
                  <i className="icon fa-solid fa-address-card"></i>
                </div>

                <div className="input_wrap">
                  <input
                    className="contact_input"
                    autoComplete="off"
                    name="Last Name"
                    type="text"
                    required
                  />
                  <label>Last Name </label>
                  <i className="icon fa-solid fa-address-card"></i>
                </div>

                <div className="input_wrap w-100">
                  <input
                    className="contact_input"
                    autoComplete="off"
                    name="Email"
                    type="email"
                    required
                  />
                  <label>Email</label>
                  <i className="icon fa-solid fa-envelope"></i>
                </div>

                <div className="input_wrap textarea w-100 bg-[#e9edf78b]">
                  <textarea
                    name="Message"
                    autoComplete="off"
                    className="contact_input"
                    required></textarea>
                  <label>Message</label>
                  <i className="icon fa-solid fa-comment"></i>
                </div>

                <div className="contact_btn">
                  <button className="upbtn upload">
                    <span>
                      <i className="fa-solid fa-paperclip"></i>Add Attachement
                    </span>
                    <input type="file" name="attachement" />
                  </button>
                  <input type="submit" value="Send message" className="upbtn" />
                </div>
              </form>
            </div>
          </div>
          <div className="right">
            <div className="image_wrapper">
              <img
                src="https://images.pexels.com/photos/4226769/pexels-photo-4226769.jpeg?cs=srgb&dl=pexels-karolina-grabowska-4226769.jpg&fm=jpg"
                alt=""
              />

              <div className="wave_wrap">
                <svg
                  className="wave"
                  viewBox="0 0 783 1536"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    id="wave"
                    d="M236.705 1356.18C200.542 1483.72 64.5004 1528.54 1 1535V1H770.538C793.858 63.1213 797.23 196.197 624.165 231.531C407.833 275.698 274.374 331.715 450.884 568.709C627.393 805.704 510.079 815.399 347.561 939.282C185.043 1063.17 281.908 1196.74 236.705 1356.18Z"
                  />
                </svg>
              </div>
              <svg
                className="dashed_wave"
                viewBox="0 0 345 877"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  id="dashed_wave"
                  d="M0.5 876C25.6667 836.167 73.2 739.8 62 673C48 589.5 35.5 499.5 125.5 462C215.5 424.5 150 365 87 333.5C24 302 44 237.5 125.5 213.5C207 189.5 307 138.5 246 87C185 35.5 297 1 344.5 1"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
