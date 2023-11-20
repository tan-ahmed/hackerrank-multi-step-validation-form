# React: Multi Step Validation Form

![](https://hrcdn.net/s3_pub/istreet-assets/kHU5UcHZdwpHFQRKm0Gs0Q/multi-step-validation-form.gif)

Design a web application that implements a step-by-step form with validation using the Context API. The form collects personal information: name, email, and password. Implement validation rules for each step. The application has 5 components: _NameStep_, _EmailStep_, _PasswordStep_, _MultiStepForm_, _FinalPage_ and a file _validation.js_ for managing validation rules.

_NameStep_
- An input field of type _text_ and with value _formData.name_.
- Validate the name using _validateName_ function from _validation.js_.
- Display "Invalid Name!" for invalid names.
- Use _FormContext_ for "formData" and "setFormData".

_EmailStep_
- An input field of type _email_ and with value _formData.email_.
- Validate the email using _validateEmail_ from _validation.js_.
- Display "Invalid Email!" for invalid emails.
- Use _FormContext_ for "formData" and "setFormData".

_PasswordStep_
- An input field of type _password_ and with value _formData.password_.
- Validate the password using _validatePassword_ from _validation.js_.
- Display "Invalid Password!" for invalid passwords.
- Use _FormContext_ for "formData" and "setFormData".

_FinalPage_
- Display the _name_ and _email_ passed _NameStep_ _EmailStep_ respectively.
- Use _FormContext_ for "formData".


_MultiStepForm_
- Initialize _formData_ with empty fields for _name_, _email_, and _password_. 
- "Previous" Button:
  - Decreases the _step_ by one when clicked.
  - Disabled on _NameStep_.
- "Next" Button:
  - Increases the _step_ by one when clicked.
  - Disabled if invalid data is present in any step.

_Validation_
| **Valid Field** | **Validation Rules**                                        |
|-----------------|-------------------------------------------------------------|
| Name            | A-Z, a-z, no spaces, 6-10 characters                        |
| Email           | ends with @gmail.com or @hackerrank.com, max 30 characters  |
| Password        | At least 1 lowercase, 1 uppercase, 1 digit, 6-10 characters |

The following data-testid attributes are required in the component for the tests to pass:

| **Attribute**                 | **Component**                                           |
|-------------------------------|---------------------------------------------------------|
| _multistep-form_              | MultiStepForm                                           |
| _name-step_                   | NameStep                                                |
| _email-step_                  | EmailStep                                               |
| _password-step_               | PasswordStep                                            |
| _final-page_                  | FinalPage                                               |
| _progress-indicator_          | MultiStepForm (Progress Indicator)                      |
| _previous-button_             | MultiStepForm (Previous Button)                         |
| _submit-button_               | MultiStepForm (Submit Button)                           |
| _validation-feedback-{field}_ | NameStep, EmailStep, PasswordStep (Validation Feedback) |

Note:
- The application should be designed using Context API and should use only core React functionalities.
- Components have data-testid attributes for test cases and certain classes and ids for rendering purposes. They should not be changed.
- Avoid making changes to other files in the project structure.

## Environment 

- React Version: 16.13.1
- Node Version: 14(LTS)
- Default Port: 8000

**Read Only Files**
- `src/App.test.js`
- `src/App.js`
- `src/App.css`
- `src/index.js`
- `src/index.css`
- `src/registerServiceWorker.js`


**Commands**
- run: 
```bash
npm start
```
- install: 
```bash
npm install
```
- test: 
```bash
npm test
```

