export const NotSameUser = (Details) => {
  const getUser = JSON.parse(localStorage.getItem("Token"));
  const userId = getUser.Token.userIden;
  if (Details.match.params.userId !== userId) {
    localStorage.removeItem("Token");
    return (window.location = "SignIn");
  } else {
    console.log("yes it is yuser");
  }
};
