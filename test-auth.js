// Test script to verify authentication flow
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5001/api/auth';

async function testAuth() {
  console.log('Testing authentication flow...\n');

  // Test 1: Register a new user
  console.log('1. Testing registration...');
  const registerData = {
    email: 'testuser@example.com',
    password: 'Password123!',
    firstName: 'Test',
    lastName: 'User',
    grade: '12'
  };

  try {
    const registerResponse = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });

    const registerResult = await registerResponse.json();
    console.log('Registration response:', registerResult);

    if (registerResult.success) {
      console.log('✅ Registration successful!');
      
      // Test 2: Login with the registered user
      console.log('\n2. Testing login...');
      const loginData = {
        username: 'testuser@example.com',
        password: 'Password123!'
      };

      const loginResponse = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const loginResult = await loginResponse.json();
      console.log('Login response:', loginResult);

      if (loginResult.success) {
        console.log('✅ Login successful!');
        console.log('✅ Authentication flow is working correctly!');
      } else {
        console.log('❌ Login failed:', loginResult.error);
      }
    } else {
      console.log('❌ Registration failed:', registerResult.error);
    }
  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }
}

testAuth(); 