import { useContext, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";
import logoLight from "../../assets/logoLight.png";
import logoDark from "../../assets/logoDark.png";
import { ThemeContext } from "../../../ThemeProvider/ThemeProvider";

const UserRegistrationForm = () => {
  const { theme } = useContext(ThemeContext);

  // Set image sources based on the theme
  const logo = theme === "dark" ? logoLight : logoDark;

  // state for controlling form data

  const [errors, setErrors] = useState({});

  // calling auth context
  const {
    createUser,
    userLoginByGoogle,
    setLoading,
    updateUsernameAndPhotoUrl,
    setUser,
  } = useAuth();

  // this part is for redirecting user after login
  const location = useLocation();
  const from = location?.state || "/";
  const navigate = useNavigate();

  const showAlert = (icon, title, message) => {
    Swal.fire({
      title: title,
      text: message,
      icon: icon,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Close",
    });
  };

  /*
   * create user using email and password
   */
  const handleCreateUser = async (event) => {
    event.preventDefault();

    // Reset previous errors
    setErrors({});

    // Create a new FormData object from the form
    const formData = new FormData(event.target);

    // Convert FormData entries to a plain JavaScript object
    const formDataObj = Object.fromEntries(formData.entries());

    const { username, email, photoUrl, password, confirmPassword } =
      formDataObj;

    /* 
    validation of the form data starts here 
    */

    // Username validation
    if (username.length < 5) {
      setErrors((prevError) => ({
        ...prevError,
        username: "Username must be at least 5 characters long",
      }));
      return;
    }

    // Email address validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setErrors((prevError) => ({
        ...prevError,
        email: "Please type a valid email address",
      }));
      return;
    }

    const isValidPhotoUrl = photoUrl && /\.(jpg|jpeg|png|gif)$/i.test(photoUrl);
    if (!isValidPhotoUrl) {
      setErrors((prevError) => ({
        ...prevError,
        photoUrl: "Please enter a valid photo url",
      }));
      return;
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

    if (!passwordRegex.test(password)) {
      setErrors((prevError) => ({
        ...prevError,
        password:
          "Your password must be minimum 6 characters long and must contain one uppercase letter, one lowercase letter, and one digit",
      }));
      return;
    }

    // Password confirmation
    if (password !== confirmPassword) {
      setErrors((prevError) => ({
        ...prevError,
        confirmPassword: "Your entered password doesn't match",
      }));
      return;
    }

    // if every thing is ok then create user
    try {
      setLoading(true);
      // Step 1: Create user in Firebase
      const userCredential = await createUser(email, password);
      console.log(
        "User  created successfully in Firebase",
        userCredential.user
      );

      // Step 2: Update username and photo URL
      const updatedUser = await updateUsernameAndPhotoUrl(username, photoUrl);
      if (updatedUser) {
        showAlert("success", "Success!", "Account Created Successfully.");
        setUser(updatedUser); // Update the user state with the new user object
        navigate(from);
      }
    } catch (firebaseError) {
      console.error("Error creating user in Firebase:", firebaseError.message);
      alert("Failed to create user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * handle Google login
   */
  const handleGoogleLogin = () => {
    userLoginByGoogle()
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        if (user) {
          Swal.fire({
            title: "Success",
            text: "You have successfully logged in",
            icon: "success",
          });
          navigate(from);
        }
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        //const errorMessage = error.message;
        // The email of the user's account used.
        //const email = error.customData.email;
        // The AuthCredential type that was used.
        //const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        if (errorCode === "auth/user-cancelled") {
          Swal.fire({
            title: "Error",
            text: "You have cancelled Google signin process",
            icon: "error",
          });
        }
      });
  };

  return (
    <>
      <section className="bg-sectionBgColor dark:bg-DarkModeSectionBgColor py-20">
        <div className="heading-container w-11/12 md:w-9/12 mx-auto">
          <h4 className="font-subheadingFont text-[40px] leading-[40px] text-center text-primaryColor md:pt-10 pb-2">
            Just in few steps
          </h4>

          <h3 className="font-headingFont text-[30px] leading-[30px] md:text-[55px] md:leading-[55px] font-bold text-center text-[#111] dark:text-white pb-[4rem]">
            Become a registered user
          </h3>
        </div>

        <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src={logo} alt="" />
          </div>

          <form onSubmit={handleCreateUser} className="mt-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Name
              </label>
              <input
                type="text"
                name="username"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primaryColorHover dark:focus:border-primaryColor focus:ring-primaryColor focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {errors.username && (
                <p className="mt-2 text-sm text-red-600">{errors.username}</p>
              )}
            </div>

            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primaryColorHover dark:focus:border-primaryColor focus:ring-primaryColor focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div className="mt-4">
              <label
                htmlFor="photoUrl"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Photo Url
              </label>
              <input
                type="url"
                name="photoUrl"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primaryColorHover dark:focus:border-primaryColor focus:ring-primaryColor focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {errors.photoUrl && (
                <p className="mt-2 text-sm text-red-600">{errors.photoUrl}</p>
              )}
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-800 dark:text-gray-200"
                >
                  Password
                </label>
              </div>

              <input
                type="password"
                name="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primaryColorHover dark:focus:border-primaryColor focus:ring-primaryColor focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm text-gray-800 dark:text-gray-200"
                >
                  Confirm Password
                </label>
              </div>

              <input
                type="password"
                name="confirmPassword"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primaryColorHover dark:focus:border-primaryColor focus:ring-primaryColor focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="mt-6">
              {/* <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primaryColor rounded-lg hover:bg-primaryColorHover focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                Register
              </button> */}
              <button className="w-full px-12 py-3 inline-block rounded-[5px] text-primaryColor border border-primaryColor transition-all duration-300 hover:bg-primaryColor hover:border-primaryColor hover:text-white mt-1 md:mt-3 font-bold">
                Register
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

            <a
              href="#"
              className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or login with Google
            </a>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
          </div>

          <div className="flex items-center mt-6 -mx-2">
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="flex items-center justify-center  mx-2 text-sm   transition-colors duration-300 transform w-full px-12 py-3 rounded-[5px] text-primaryColor border border-primaryColor  hover:bg-primaryColor hover:border-primaryColor hover:text-white mt-1 md:mt-3 font-bold focus:bg-primaryColor focus:outline-none"
            >
              <svg className="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"></path>
              </svg>

              <span className="hidden mx-2 sm:inline">Sign in with Google</span>
            </button>
          </div>

          <p className="mt-8 text-xs font-light text-center text-gray-400">
            Already have an account?
            <Link
              to="/login"
              state={from} // Pass the location state
              className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default UserRegistrationForm;
