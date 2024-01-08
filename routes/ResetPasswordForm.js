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
    console.log(newPassword);
    console.log(confirmPassword);
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
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto', marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Reset Password</h2>

      <input type="hidden" id="token" name="token" value={token} />

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="newPassword" style={{ display: 'block', marginBottom: '5px' }}>New Password:</label>
        <input type="password" id="newPassword" name="newPassword" ref={newPasswordRef} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} required />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" ref={confirmPasswordRef} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} required />
      </div>

      <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Reset Password</button>
    </form>

  );
};

module.exports = ResetPasswordForm;
