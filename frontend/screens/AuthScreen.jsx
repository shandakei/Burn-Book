import React, { useState } from "react";

const AuthScreen = () => {
  const [isRegister, setIsRegister] = useState(false);

  const toggleAuthMode = () => setIsRegister((prev) => !prev);

  return (
    <div className="auth-container">
      <h1>{isRegister ? "Register" : "Sign In"}</h1>
      <form>
        <label>
          Email:
          <input type="email" placeholder="Enter your email" required />
        </label>
        <label>
          Password:
          <input type="password" placeholder="Enter your password" required />
        </label>
        {isRegister && (
          <label>
            Confirm Password:
            <input type="password" placeholder="Confirm your password" required />
          </label>
        )}
        <button type="submit">{isRegister ? "Register" : "Sign In"}</button>
      </form>
      <p>
        {isRegister ? "Already have an account?" : "Don't have an account?"}
        <button onClick={toggleAuthMode} className="toggle-btn">
          {isRegister ? "Sign In" : "Register"}
        </button>
      </p>
    </div>
  );
};

export default AuthScreen;
