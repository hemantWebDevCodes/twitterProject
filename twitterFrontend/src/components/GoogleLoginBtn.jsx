import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios';

function GoogleLoginBtn() {

    const handleSuccess = async(credentialResponse) => {
        console.log("Google Credential Response:", credentialResponse);
        try {
            const response = await axios.post('http://localhost:8000/api/google-login', {
              credential: credentialResponse.credential,
            });
      
            if (response.data.status) {
              sessionStorage.setItem('api_token', response.data.token);
              alert("Login successful 🎉");
              console.log(response.data.user);
            } else {
              alert("Login failed");
            }
          } catch (error) {
            console.error("Error logging in:", error);
            alert("Something went wrong");
          }
    }

  return (
    <GoogleLogin onSuccess={handleSuccess} onError={() => console.log('login Faild')} />
  )
}

export default GoogleLoginBtn