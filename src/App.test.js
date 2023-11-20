import React, { useContext } from 'react';
import { render, fireEvent, screen, waitFor, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import App from './App';
import { validateEmail, validateName, validatePassword } from './validation';
import MultiStepForm, { FormContext, TOTAL_STEPS } from './components/MultiStepForm';

afterEach(() => {
    cleanup();
});

describe('validateName function', () => {
    it('should return true for a valid name', () => {
        const validName = 'JohnDoe';
        expect(validateName(validName)).toBe(true);
    });

    it('should return false for a name with less than 3 characters', () => {
        const invalidName = 'Jo';
        expect(validateName(invalidName)).toBe(false);
    });

    it('should return false for a name with more than 15 characters', () => {
        const invalidName = 'JohnDoeJohnDoe123';
        expect(validateName(invalidName)).toBe(false);
    });

    it('should return false for a name containing non-alphabetic characters', () => {
        const invalidName = 'JohnDoe123';
        expect(validateName(invalidName)).toBe(false);
    });

    it('should return false for a name containing spaces', () => {
        const invalidName = 'John Doe';
        expect(validateName(invalidName)).toBe(false);
    });
});

describe('validateEmail function', () => {
    it('should return true for a valid email', () => {
        const validEmail = 'john@hackerrank.com';
        expect(validateEmail(validEmail)).toBe(true);
    });

    it('should return false for an email longer than 30 characters', () => {
        const invalidEmail = 'john.doe.the.very.long.email@example.com';
        expect(validateEmail(invalidEmail)).toBe(false);
    });

    it('should return false for an email without @gmail.com or @hackerrank.com domain', () => {
        const invalidEmail = 'john@example.com';
        expect(validateEmail(invalidEmail)).toBe(false);
    });

    it('should return false for an email with spaces', () => {
        const invalidEmail = 'john doe@gmail.com';
        expect(validateEmail(invalidEmail)).toBe(false);
    });

    it('should return false for an email with invalid format', () => {
        const invalidEmail = 'john@hackerrank';
        expect(validateEmail(invalidEmail)).toBe(false);
    });
});

describe('validatePassword function', () => {
    it('should return true for a valid password', () => {
        const validPassword = 'Abcd1234';
        expect(validatePassword(validPassword)).toBe(true);
    });

    it('should return false for a password shorter than 6 characters', () => {
        const invalidPassword = 'Ab12';
        expect(validatePassword(invalidPassword)).toBe(false);
    });

    it('should return false for a password longer than 15 characters', () => {
        const invalidPassword = 'Abcdefghijk12345L';
        expect(validatePassword(invalidPassword)).toBe(false);
    });

    it('should return false for a password without an uppercase letter', () => {
        const invalidPassword = 'abcd1234';
        expect(validatePassword(invalidPassword)).toBe(false);
    });

    it('should return false for a password without a lowercase letter', () => {
        const invalidPassword = 'ABCD1234';
        expect(validatePassword(invalidPassword)).toBe(false);
    });

    it('should return false for a password without a digit', () => {
        const invalidPassword = 'Abcdefgh';
        expect(validatePassword(invalidPassword)).toBe(false);
    });
});


describe('NameStep component', () => {

    beforeEach(() => {
        render(<App />);
    })

    it('renders name input field of type text', () => {
        const inputName = screen.getByTestId('name-input');
        expect(inputName).toBeInTheDocument();
        expect(inputName).toHaveAttribute("type", "text");
    });

    it('does not show validation message initially', () => {
        const nameValidationMessage = screen.queryByTestId('name-validation-message');
        expect(nameValidationMessage).toBeNull();
    });

    it('shows validation message when name is invalid', async () => {
        const inputName = screen.getByTestId('name-input');
        fireEvent.change(inputName, { target: { value: 'Jo' } });
        const nameValidationMessage = screen.queryByTestId('name-validation-message');
        expect(nameValidationMessage).toBeInTheDocument();
        expect(nameValidationMessage).toHaveTextContent('Invalid Name!');
    });

    it('does not show validation message when name is valid', async () => {
        const inputName = screen.getByTestId('name-input');
        const nameValidationMessage = screen.queryByTestId('name-validation-message');
        const validName = 'JohnDoe';
        fireEvent.change(inputName, { target: { value: validName } });
        expect(nameValidationMessage).toBeNull();
        expect(validateName(validName)).toBe(true);
    });
});

describe('EmailStep component', () => {

    beforeEach(() => {
        render(<App />);
        const inputName = screen.getByTestId('name-input');
        fireEvent.change(inputName, { target: { value: 'JohnDoe' } });
        const nextButton = screen.getByTestId('next-btn');
        fireEvent.click(nextButton);
    });

    it('renders email input field', async () => {
        await waitFor(() => {
            const inputEmail = screen.getByTestId('email-input');
            expect(inputEmail).toBeInTheDocument();
            expect(inputEmail).toHaveAttribute("type", "email");
        });
    });

    it('does not show validation message initially', async () => {
        await waitFor(() => {
            const inputEmail = screen.getByTestId('email-input');
            expect(inputEmail).toBeInTheDocument();
            expect(inputEmail).toHaveAttribute("type", "email");
            const emailValidationMessage = screen.queryByTestId('email-validation-message');
            expect(emailValidationMessage).toBeNull();
        });
    });

    it('shows validation message when email is invalid', async () => {
        await waitFor(() => {
            const inputEmail = screen.getByTestId('email-input');
            fireEvent.change(inputEmail, { target: { value: 'abc@abc.com' } });
            const emailValidationMessage = screen.queryByTestId('email-validation-message');
            expect(emailValidationMessage).toBeInTheDocument();
            expect(emailValidationMessage).toHaveTextContent('Invalid Email!');
        });
    });

    it('does not show validation message when email is valid', async () => {
        await waitFor(() => {
            const inputEmail = screen.getByTestId('email-input');
            const emailValidationMessage = screen.queryByTestId('email-validation-message');
            const validEmail = 'ishpreet@hackerrank.com';
            fireEvent.change(inputEmail, { target: { value: validEmail } });
            expect(emailValidationMessage).toBeNull();
            expect(validateEmail(validEmail)).toBe(true);
        });
    });
});


describe('Password component', () => {

    beforeEach(async () => {
        render(<App />);
        const inputName = screen.getByTestId('name-input');
        fireEvent.change(inputName, { target: { value: 'JohnDoe' } });
        const nextButton = screen.getByTestId('next-btn');
        fireEvent.click(nextButton);

        await waitFor(() => {
            const inputEmail = screen.getByTestId('email-input');
            fireEvent.change(inputEmail, { target: { value: 'john@hackerrank.com' } });
            fireEvent.click(nextButton);
        });
    });

    it('renders password input field', async () => {
        await waitFor(() => {
            const inputPassword = screen.getByTestId('password-input');
            expect(inputPassword).toBeInTheDocument();
            expect(inputPassword).toHaveAttribute("type", "password");
        });
    });

    it('does not show validation message initially', async () => {
        await waitFor(() => {
            const inputPassword = screen.getByTestId('password-input');
            expect(inputPassword).toBeInTheDocument();
            expect(inputPassword).toHaveAttribute("type", "password");
            const passwordValidationMessage = screen.queryByTestId('password-validation-message');
            expect(passwordValidationMessage).toBeNull();
        });
    });

    it('shows validation message when password is invalid', async () => {
        await waitFor(() => {
            const inputPassword = screen.getByTestId('password-input');
            fireEvent.change(inputPassword, { target: { value: 'invalid-password' } });
            const passwordValidationMessage = screen.queryByTestId('password-validation-message');
            expect(passwordValidationMessage).toBeInTheDocument();
            expect(passwordValidationMessage).toHaveTextContent('Invalid Password!');
        });
    });

    it('does not show validation message when password is valid', async () => {
        await waitFor(() => {
            const inputPassword = screen.getByTestId('password-input');
            const passwordValidationMessage = screen.queryByTestId('password-validation-message');
            const validPassword = 'Abcd1234';
            fireEvent.change(inputPassword, { target: { value: validPassword } });
            expect(passwordValidationMessage).toBeNull();
            expect(validatePassword(validPassword)).toBe(true);
        });
    });
});

describe('FinalPage component', () => {
    beforeEach(async () => {
        render(<App />);
        const inputName = screen.getByTestId('name-input');
        fireEvent.change(inputName, { target: { value: 'JohnDoe' } });
        const nextButton = screen.getByTestId('next-btn');
        fireEvent.click(nextButton);

        await waitFor(() => {
            const inputEmail = screen.getByTestId('email-input');
            fireEvent.change(inputEmail, { target: { value: 'john@hackerrank.com' } });
            fireEvent.click(nextButton);
        });

        await waitFor(() => {
            const inputPassword = screen.getByTestId('password-input');
            fireEvent.change(inputPassword, { target: { value: 'Abcd1234' } });
            fireEvent.click(nextButton);
        });
    });

    it('renders FinalPage component', async () => {
        await waitFor(() => {
            const finalPage = screen.getByTestId('final-page');
            expect(finalPage).toBeInTheDocument();
        });
    });

    it('displays the submitted name', async () => {
        await waitFor(() => {
            const finalPageName = screen.getByTestId('final-page-name');
            expect(finalPageName).toHaveTextContent('Name: JohnDoe');
        });
    });

    it('displays the submitted email', async () => {
        await waitFor(() => {
            const finalPageEmail = screen.getByTestId('final-page-email');
            expect(finalPageEmail).toHaveTextContent('Email: john@hackerrank.com');
        });
    });
});


describe('MultiStepForm component', () => {
    beforeEach(() => {
        render(<App />);
    });

    it('initially renders the NameStep component', () => {
        const inputName = screen.getByTestId('name-input');
        expect(inputName).toBeInTheDocument();
        expect(inputName).toHaveAttribute("type", "text");
        fireEvent.change(inputName, { target: { value: 'Jo' } });
        const nameValidationMessage = screen.queryByTestId('name-validation-message');
        expect(nameValidationMessage).toBeInTheDocument();
        expect(nameValidationMessage).toHaveTextContent('Invalid Name!');
    });

    it('navigates to EmailStep component when NameStep is completed', async () => {
        const inputName = screen.getByTestId('name-input');
        fireEvent.change(inputName, { target: { value: 'JohnDoe' } });
        const nextButton = screen.getByTestId('next-btn');
        fireEvent.click(nextButton);

        await waitFor(() => {
            const inputEmail = screen.getByTestId('email-input');
            expect(inputEmail).toBeInTheDocument();
        });
    });

    it('navigates to PasswordStep component when EmailStep is completed', async () => {
        const inputName = screen.getByTestId('name-input');
        fireEvent.change(inputName, { target: { value: 'JohnDoe' } });
        const nextButton = screen.getByTestId('next-btn');
        fireEvent.click(nextButton);

        await waitFor(() => {
            const inputEmail = screen.getByTestId('email-input');
            fireEvent.change(inputEmail, { target: { value: 'john@hackerrank.com' } });
            fireEvent.click(nextButton);
        });

        await waitFor(() => {
            const inputPassword = screen.getByTestId('password-input');
            expect(inputPassword).toBeInTheDocument();
        });
    });

    it('navigates to FinalPage component when PasswordStep is completed', async () => {
        const inputName = screen.getByTestId('name-input');
        fireEvent.change(inputName, { target: { value: 'JohnDoe' } });
        const nextButton = screen.getByTestId('next-btn');
        fireEvent.click(nextButton);

        await waitFor(() => {
            const inputEmail = screen.getByTestId('email-input');
            fireEvent.change(inputEmail, { target: { value: 'john@hackerrank.com' } });
            fireEvent.click(nextButton);
        });

        await waitFor(() => {
            const inputPassword = screen.getByTestId('password-input');
            fireEvent.change(inputPassword, { target: { value: 'Abcd1234' } });
            fireEvent.click(nextButton);
        });

        await waitFor(() => {
            const finalPage = screen.getByText(/Thank you for submitting your information/i);
            expect(finalPage).toBeInTheDocument();
        });
    });

    it('navigates back to the NameStep component from EmailStep', async () => {
        const inputName = screen.getByTestId('name-input');
        fireEvent.change(inputName, { target: { value: 'JohnDoe' } });
        const nextButton = screen.getByTestId('next-btn');
        fireEvent.click(nextButton);

        const inputEmail = screen.getByTestId('email-input');
        fireEvent.change(inputEmail, { target: { value: 'abc@abc.com' } });
        const emailValidationMessage = screen.queryByTestId('email-validation-message');
        expect(emailValidationMessage).toBeInTheDocument();
        expect(emailValidationMessage).toHaveTextContent('Invalid Email!');

        await waitFor(() => {
            const prevButton = screen.getByTestId('prev-btn');
            fireEvent.click(prevButton);
        });

        await waitFor(() => {
            const progressIndicator = screen.getByTestId('progress-indicator');
            expect(progressIndicator).toHaveTextContent(`1/${TOTAL_STEPS}`)
        });
    });
});

describe('FormContext', () => {
    it("should provide the correct initial context value", () => {
        render(<MultiStepForm />);

        const FormContextConsumer = () => {
            const context = useContext(FormContext);
            return (
                <div data-testid="context-value">
                    {JSON.stringify(context.formData)}
                </div>
            );
        };

        const { getByTestId: getByTestIdInConsumer } = render(
            <FormContext.Provider value={FormContext._currentValue}>
                <FormContextConsumer />
            </FormContext.Provider>
        );

        const contextValueDiv = getByTestIdInConsumer("context-value");
        expect(contextValueDiv.textContent).toBe(
            JSON.stringify({ name: "", email: "", password: "" })
        );
    });
});
