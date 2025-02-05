import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router";

const RecoverPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const emailFromLogin = location.state?.email || "";
  const emailRef = useRef();

  const handleResetPassword = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;

    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        //toast.success("Password reset email sent! Check your inbox.");
        window.open("https://mail.google.com", "_blank");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        //const errorMessage = error.message;
        console.error("Error sending password reset email:", errorCode);
        // toast.error(
        //   "Failed to send password reset email. Please try again.",
        //   errorMessage
        // );
        // ..
      });
  };

  return (
    <section className="bg-sectionBgColor dark:bg-DarkModeSectionBgColor py-20">
      <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <div className="heading-container w-11/12 md:w-9/12 mx-auto">
          <h4 className="sub-heading">Just 2 easy steps</h4>

          <h3 className="heading dark:text-white">Recover your password</h3>
        </div>

        <form onSubmit={handleResetPassword}>
          <div className="flex flex-col mt-4">
            <div className="flex flex-col">
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="emailAddress"
              >
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                name="email"
                ref={emailRef}
                defaultValue={emailFromLogin}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primaryColorHover focus:ring-primaryColor focus:ring-opacity-40 dark:focus:border-primaryColor focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-primaryColor rounded-md hover:bg-primaryColorHover focus:outline-none focus:bg-primaryColor"
            >
              Recover Password
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RecoverPassword;
