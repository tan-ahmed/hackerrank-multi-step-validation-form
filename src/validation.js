/*
    A valid name:
        - Include only lowercase and uppercase alphabets: [a-zA-Z]
        - Have a minimum length of 3 and a maximum length of 12: {3,15}
*/
export function validateName(name) {
  // if (name.length === 0) return true;
  // regex for name validation
  const nameRegex = new RegExp(/^[a-zA-Z]{3,15}$/);
  return nameRegex.test(name);
}
/*
    A valid email:
        - Should have maximum length of 30 characters
        - Should end with @gmail.com or @hackkerrank.com  
 */
export function validateEmail(email) {
  const emailRegex = new RegExp(/^[a-zA-Z0-9]{1,30}@(gmail|hackerrank)\.com$/);
  return emailRegex.test(email);
}

/*
    A valid password:
        - Must have atleast 6 characters and at max 15 characters
        - Must have atleast 1 upper case letter between A-Z
        - Must have atleast 1 lower case letter between a-z
        - Must have atleast 1 digit between 0-9
 */
export function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,15}$/;
  return passwordRegex.test(password);
}
