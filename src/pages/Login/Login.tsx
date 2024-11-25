import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import axios from 'axios';
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import { getRoleFromToken } from '../../protected/ProtectedRoute';


const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number.'
      );
      return;
    }

    setError('');
    
    const requestBody = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:4000/auth/login', requestBody);
      const token = response.data.access_token;
      localStorage.setItem('jwt', token);
      
      const role = getRoleFromToken(token);
      if (role === 'author') {
        navigate('/author');
      } else if (role === 'admin') {
        navigate('/admin');
      } else {
        alert('An error occured. Please try again.');
      }

    } catch (error) {
      if(axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'Login failed!');
      } else {
        setError('An error occured. Please try again.');
      }
    }
  };

  return (
    <Container className='login-container'>
      <Card className='login-card'>
        <Card.Body>
          <h2 className='login-title'>Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className='form-group'>
              <span className='form-label'>Email</span>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='form-control'
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className='form-group'>
              <span className='form-label'>Password</span>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='form-control'
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className='login-button'>
              Login
            </Button>
          </Form>
          <div className='login-footer'>
            <small>Don't have an account? <a href="/register">Register</a></small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
