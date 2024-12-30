// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Welcome from '../src/Components/Home/Welcome';
import Login from './Components/Login/Login';
import UserTable from './Components/UserTable/UserTable';
import Signup from './Components/Signup/Signup';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import Home from './Components/Home/Home';
import { ForgetPasswordUser, GetAdmin, GetAllUsers, LoginUser, SignUp } from './Api';



jest.mock('./Api', () => ({
    GetAllUsers: jest.fn(),
    GetAdmin: jest.fn(),
    LoginUser: jest.fn(),
    SignUp: jest.fn(),
    ForgetPasswordUser: jest.fn(),
  }));



    const mockUsers = [
    {
        id: 1,
        image: { path: 'path/to/image1.png' },
        name: 'John Doe',
        designation: 'Developer',
        department: 'Engineering',
    },
    {
        id: 2,
        image: { path: 'path/to/image2.png' },
        name: 'Jane Smith',
        designation: 'Designer',
        department: 'Design',
    },
    ];
  
  
    describe('MyComponent', () => {
    test('renders the component with the correct text', () => {
        render(<Welcome />);
        const element = screen.getByText(/Welcome to the home page/i);
        expect(element).toBeInTheDocument();
    });

    });


    describe("Usertable", () => {
    
        beforeEach(() => {
        GetAllUsers.mockResolvedValue({ data: { data: mockUsers } });
        });

        test('renders the component with the correct text', () => {
            render(
            <BrowserRouter>
                <UserTable/>
            </BrowserRouter>
            );
            const element = screen.getByText(/Image/i);
            expect(element).toBeInTheDocument();
        });
    
        test('renders UserTable component', () => {
        render(
            <BrowserRouter>
            <UserTable />
            </BrowserRouter>
        );
        expect(screen.getByText('Add User')).toBeInTheDocument();
        });
    
        test('fetches and displays user data', async () => {
        render(
            <BrowserRouter>
            <UserTable />
            </BrowserRouter>
        );
    
        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        });
        });
    
        
    });


    describe("Login", () => {

    beforeEach(() => {
        LoginUser.mockResolvedValue({
        data: {
            data: {
            token: 'test-token',
            name: 'Test User',
            },
        },
        });
    });

    test('renders Login component', () => {
        render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
        );
        expect(screen.getByText('Login Here!')).toBeInTheDocument();
    });

    test('validates email input', async () => {
        render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
        );

        const emailInput = screen.getByPlaceholderText('EmailId');
        const submitButton = screen.getByText('Submit');

        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
        expect(screen.getByText('EmailId not valid')).toBeInTheDocument();
        });
    });

    test('handles login success', async () => {
        render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
        );

        const emailInput = screen.getByPlaceholderText('EmailId');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByText('Submit');

        fireEvent.change(emailInput, { target: { value: 'table01@gmail.com' } });
        fireEvent.change(passwordInput, { target: { value: 'GoodMorning' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
        expect(localStorage.getItem('ref')).toBe('test-token');
        expect(localStorage.getItem('name')).toBe('Test User');
        expect(window.location.pathname).toBe('/home/welcome');
        });
    });

    test('handles login failure', async () => {
        LoginUser.mockRejectedValue({
        response: {
            data: {
            code: 404,
            message: 'User not found',
            },
        },
        });

        render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
        );

        const emailInput = screen.getByPlaceholderText('EmailId');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByText('Submit');

        fireEvent.change(emailInput, { target: { value: 'table01@gmail.com' } });
        fireEvent.change(passwordInput, { target: { value: 'WrongPassword' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
        expect(screen.getByText('User not found')).toBeInTheDocument();
        });
    });

    test('navigates to forget password page', () => {
        render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
        );

        const forgetPasswordLink = screen.getByText('Forget Password');
        fireEvent.click(forgetPasswordLink);

        expect(window.location.pathname).toBe('/forgetpwd');
    });

    test('navigates to sign-up page', () => {
        render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
        );

        const signUpLink = screen.getByText('SignUp here');
        fireEvent.click(signUpLink);

        expect(window.location.pathname).toBe('/');
    });
    });


    describe("SignUp", () => {

        beforeEach(() => {
            SignUp.mockResolvedValue({
            data: {
                data: {
                token: 'test-token',
                name: 'Test User',
                },
            },
            });
        });
        
        test('renders Signup component', () => {
            render(
            <BrowserRouter>
                <Signup />
            </BrowserRouter>
            );
            expect(screen.getByText('Hi, SignUp Here!')).toBeInTheDocument();
        });
        
        test('validates name input', async () => {
            render(
            <BrowserRouter>
                <Signup />
            </BrowserRouter>
            );
        
            const nameInput = screen.getByPlaceholderText('Name');
            const submitButton = screen.getByText('Submit');
        
            fireEvent.change(nameInput, { target: { value: 'abc' } });
            fireEvent.click(submitButton);
        
            await waitFor(() => {
            expect(screen.getByText('Name must be at least 4 letters and only alphabets.')).toBeInTheDocument();
            });
        });
        
        test('validates email input', async () => {
            render(
            <BrowserRouter>
                <Signup />
            </BrowserRouter>
            );
        
            const emailInput = screen.getByPlaceholderText('EmailId');
            const submitButton = screen.getByText('Submit');
        
            fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
            fireEvent.click(submitButton);
        
            await waitFor(() => {
            expect(screen.getByText('EmailId must contain min 4 letters.')).toBeInTheDocument();
            });
        });
        
        
        test('navigates to login page', () => {
            render(
            <BrowserRouter>
                <Signup />
            </BrowserRouter>
            );
        
            const loginLink = screen.getByText('Click here');
            fireEvent.click(loginLink);
        
            expect(window.location.pathname).toBe('/login');
        });

    });

    describe("Forget Password", () => {
        beforeEach(() => {
            ForgetPasswordUser.mockResolvedValue({
            data: {
                message: 'Password reset link sent',
            },
            });
        });
        
        test('renders ForgetPassword component', () => {
            render(
            <BrowserRouter>
                <ForgetPassword />
            </BrowserRouter>
            );
            expect(screen.getByText('Forget Password')).toBeInTheDocument();
        });
        
        test('validates email input', async () => {
            render(
            <BrowserRouter>
                <ForgetPassword />
            </BrowserRouter>
            );
        
            const emailInput = screen.getByPlaceholderText('EmailId');
            const submitButton = screen.getByText('Submit');
        
            fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
            fireEvent.click(submitButton);
        
            await waitFor(() => {
            expect(screen.getByText('Invalid EmailId')).toBeInTheDocument();
            });
        });
        
        test('handles submit success', async () => {
            render(
            <BrowserRouter>
                <ForgetPassword />
            </BrowserRouter>
            );
        
            const emailInput = screen.getByPlaceholderText('EmailId');
            const submitButton = screen.getByText('Submit');
        
            fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
            fireEvent.click(submitButton);
        
            await waitFor(() => {
            expect(screen.queryByText('Invalid EmailId')).not.toBeInTheDocument();
            });
        });
        
        test('handles submit failure', async () => {
            ForgetPasswordUser.mockRejectedValue({
            response: {
                data: {
                message: 'EmailId not found',
                },
            },
            });
        
            render(
            <BrowserRouter>
                <ForgetPassword />
            </BrowserRouter>
            );
        
            const emailInput = screen.getByPlaceholderText('EmailId');
            const submitButton = screen.getByText('Submit');
        
            fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
            fireEvent.click(submitButton);
        
            await waitFor(() => {
            expect(screen.getByText('EmailId not found')).toBeInTheDocument();
            });
        });
    })


    describe("Home Component", () => {

        beforeEach(() => {
            localStorage.setItem('name', 'Test User');
            GetAdmin.mockResolvedValue({ data: { data: { id: 1, name: 'Test Admin' } } });
        });
        
        afterEach(() => {
            localStorage.clear();
        });
        
        test('renders Home component', () => {
            render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
            );
            expect(screen.getByText('UserTable')).toBeInTheDocument();
        });
        
        
        
        test('toggles dark mode', () => {
            render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
            );
        
            const toggleButton = screen.getByText(/🌙/);
            fireEvent.click(toggleButton);
        
            expect(document.documentElement.classList.contains('dark')).toBe(true);
        
            fireEvent.click(toggleButton);
        
            expect(document.documentElement.classList.contains('dark')).toBe(false);
        });
        
        
        test('handles user profile navigation', async () => {
            render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
            );
        
            const profileImage = screen.getByAltText('');
            fireEvent.click(profileImage);
        
            const profileLink = screen.getByText(/Hii/i);
            fireEvent.click(profileLink);
        
            await waitFor(() => {
            expect(window.location.pathname).toBe('/home/profile');
            });
        });
        
        test('handles logout', () => {
            render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
            );
        
            const profileImage = screen.getByAltText('');
            fireEvent.click(profileImage);
        
            const logoutButton = screen.getByRole('button', { name: /logout/i });
            fireEvent.click(logoutButton);
        
            expect(localStorage.getItem('ref')).toBe(null);
            expect(window.location.pathname).toBe('/login');
        });
    });



