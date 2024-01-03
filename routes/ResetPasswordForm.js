const React = require('react');
const { useRef } = require('react');

const ResetPasswordForm = ({ token }) => {
    console.log("ResetPasswordForm");
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();

    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      console.log('Passwords do not match');
      // You can handle the error in a way that makes sense for your application
      return;
    }

    // Call the updatePassword function with the token and new password
    await updatePassword(token, newPassword, confirmPassword);

    // Redirect to the specified page (redirectTo) after successful password update
    // window.location.href = redirectTo;
    console.log("sucsses");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" id="token" name="token" value={token} />
      <label htmlFor="newPassword">New Password:</label>
      <input type="password" id="newPassword" name="newPassword" ref={newPasswordRef} required />
      <br />
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword" name="confirmPassword" ref={confirmPasswordRef} required />
      <br />
      <input type="submit" value="Reset Password" onClick={handleSubmit}/>
    </form>
  );
};

module.exports = ResetPasswordForm;
