import React from "react";

const HomePage = () => {
  const logoutHandler = () => {
    console.log(5);
    localStorage.clear();
    window.location.reload();

    console.log(55);
  };

  return (
    <div>
      <h1>Welcome To HomePage</h1>

      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default HomePage;
