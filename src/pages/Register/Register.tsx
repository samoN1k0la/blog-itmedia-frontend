import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setError('');
    
    const requestBody = {
      username: username,
      email: email,
      password: password,
      role: 'author',
    };

    try {
      const registerUrl = `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/auth/signup`;
      const response = await axios.post(registerUrl, requestBody);
      alert("Registration successful! Redirecting to login...");
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'Registration failed!');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <Container className='register-container'>
      <Card className='register-card'>
        <Card.Body>
          <h2 className='register-title'>Register</h2>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className="form-group" controlId="formBasicUsername">
              <span className='form-label'>Username</span>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="form-group" controlId="formBasicEmail">
              <span className='form-label'>Email</span>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="form-group" controlId="formBasicPassword">
              <span className='form-label'>Password</span>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="form-group" controlId="formBasicConfirmPassword">
              <span className='form-label2'>Confirm Password</span>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className='register-button'>
              Register
            </Button>
          </Form>
          <div className='register-footer'>
            <small>Already have an account? <a href="/login">Login</a></small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
