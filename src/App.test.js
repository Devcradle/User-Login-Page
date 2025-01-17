// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Welcome from '../src/Components/Home/Welcome';
import Login from './Components/Login/Login';
import UserTable from './Components/UserTable/UserTable';
import Signup from './Components/Signup/Signup';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import Home from './Components/Home/Home';
import {
  forgetPasswordAdmin,
  getAdmin,
  getAllUsers,
  login,
  signUp
} from './utils/Api';
import { Provider } from 'react-redux';
import appStore from './utils/Store/AppStore';

jest.mock('./utils/Api', () => ({
  getAllUsers: jest.fn(),
  getAdmin: jest.fn(),
  login: jest.fn(),
  signUp: jest.fn(),
  forgetPasswordAdmin: jest.fn()
}));

const mockUsers = [
  {
    id: 1,
    image: { path: 'path/to/image1.png' },
    name: 'John Doe',
    designation: 'Developer',
    department: 'Engineering'
  },
  {
    id: 2,
    image: { path: 'path/to/image2.png' },
    name: 'Jane Smith',
    designation: 'Designer',
    department: 'Design'
  }
];

describe('MyComponent', () => {
  test('renders the component with the correct text', () => {
    render(<Welcome />);
    const element = screen.getByText(/Welcome to the home page/i);
    expect(element).toBeInTheDocument();
  });
});

describe('Usertable', () => {
  beforeEach(() => {
    getAllUsers.mockResolvedValue({ data: { data: mockUsers } });
  });

  test('renders the component with the correct text', () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <UserTable />
        </BrowserRouter>
      </Provider>
    );
    const element = screen.getByText(/Image/i);
    expect(element).toBeInTheDocument();
  });

  test('renders UserTable component', () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <UserTable />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Add User')).toBeInTheDocument();
  });
});

describe('Login', () => {
  beforeEach(() => {
    login.mockResolvedValue({
      data: {
        data: {
          token: 'test-token',
          name: 'Test User'
        }
      }
    });
  });

  test('renders Login component', () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Login Here!')).toBeInTheDocument();
  });

  test('validates email input', async () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
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
      <Provider store={appStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('EmailId');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(emailInput, { target: { value: 'table01@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'GoodMorning' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(localStorage.getItem('ref')).toBe('test-token');
      expect(window.location.pathname).toBe('/home/welcome');
    });
  });

  test('handles login failure', async () => {
    login.mockRejectedValue({
      response: {
        data: {
          code: 404,
          message: 'User not found'
        }
      }
    });

    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
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
      <Provider store={appStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const forgetPasswordLink = screen.getByText('Forget Password');
    fireEvent.click(forgetPasswordLink);

    expect(window.location.pathname).toBe('/forgetpwd');
  });

  test('navigates to sign-up page', () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const signUpLink = screen.getByText('SignUp here');
    fireEvent.click(signUpLink);

    expect(window.location.pathname).toBe('/');
  });
});

describe('SignUp', () => {
  beforeEach(() => {
    signUp.mockResolvedValue({
      data: {
        data: {
          token: 'test-token',
          name: 'Test User'
        }
      }
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

  test('validates email input on blur', async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('EmailId');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(
        screen.getByText('EmailId must contain min 4 letters.')
      ).toBeInTheDocument();
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

describe('Forget Password', () => {
  beforeEach(() => {
    forgetPasswordAdmin.mockResolvedValue({
      data: {
        message: 'Password reset link sent'
      }
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
    forgetPasswordAdmin.mockRejectedValue({
      response: {
        data: {
          message: 'EmailId not found'
        }
      }
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
});

describe('Home Component', () => {
  beforeEach(() => {
    localStorage.setItem('name', 'Test User');
    getAdmin.mockResolvedValue({
      data: { data: { id: 1, name: 'Test Admin' } }
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('renders Home component', () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('UserTable')).toBeInTheDocument();
  });

  test('toggles dark mode', () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    const toggleButton = screen.getByText(/🌙/);
    fireEvent.click(toggleButton);

    expect(document.documentElement.classList.contains('dark')).toBe(true);

    fireEvent.click(toggleButton);

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  test('handles user profile navigation', async () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    const profileImage = screen.getByAltText('');
    fireEvent.click(profileImage);

    const profileLink = screen.getByText(/Hii/i);
    fireEvent.click(profileLink);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/login');
    });
  });

  test('handles logout', () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    const profileImage = screen.getByAltText('');
    fireEvent.click(profileImage);

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);

    expect(localStorage.getItem('ref')).toBe(null);
    expect(window.location.pathname).toBe('/login');
  });
});
