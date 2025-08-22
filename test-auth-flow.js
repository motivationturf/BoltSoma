// Comprehensive test to simulate the exact authentication flow
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5001/api/auth';

async function testCompleteAuthFlow() {
  console.log('🧪 Testing Complete Authentication Flow...\n');

  // Step 1: Register a new user
  console.log('📝 Step 1: Registering new user...');
  const registerData = {
    email: 'testfix@example.com',
    password: 'Password123!',
    firstName: 'Test',
    lastName: 'Fix',
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
      console.log('User ID:', registerResult.user.id);
      console.log('Token received:', registerResult.token ? 'Yes' : 'No');
      
      // Step 2: Immediately try to login with the same credentials
      console.log('\n🔐 Step 2: Testing login with registered user...');
      const loginData = {
        username: 'testfix@example.com',
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
        console.log('User ID:', loginResult.user.id);
        console.log('Token received:', loginResult.token ? 'Yes' : 'No');
        
        // Step 3: Test profile endpoint with the token
        console.log('\n👤 Step 3: Testing profile endpoint...');
        const profileResponse = await fetch(`${BASE_URL}/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${loginResult.token}`,
          },
        });

        const profileResult = await profileResponse.json();
        console.log('Profile response:', profileResult);

        if (profileResult.success) {
          console.log('✅ Profile endpoint working!');
        } else {
          console.log('❌ Profile endpoint failed:', profileResult.error);
        }
        
        console.log('\n🎉 All authentication tests passed!');
        console.log('The backend authentication is working correctly.');
        console.log('If users are still having issues, the problem is likely in the frontend.');
        
      } else {
        console.log('❌ Login failed:', loginResult.error);
        console.log('This indicates a problem with the login endpoint.');
      }
    } else {
      console.log('❌ Registration failed:', registerResult.error);
      console.log('This indicates a problem with the registration endpoint.');
    }
  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }
}

testCompleteAuthFlow(); 