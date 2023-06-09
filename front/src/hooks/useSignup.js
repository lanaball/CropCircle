import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const UseSignup = function () {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const signup = async (firstName, lastName, email, password) => {
    setIsLoading(true);
    setError(null);

    // post the user email and password to the database (is listing the right route??)
    const response = await fetch('/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    const json = await response.json();
    // console.log(response)
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // if response is good save the users email and the webtoken to local storage from the userController in the backend
      localStorage.setItem('user', JSON.stringify(json));
      // update auth context from the AuthContext Hook
      dispatch({ type: 'LOGIN', payload: json });
      // update loading state
      setIsLoading(false);
      navigate('/confirmation');
    }
  };
  return { signup, isLoading, error };
};
