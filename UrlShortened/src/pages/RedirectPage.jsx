// src/pages/RedirectPage.jsx
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const RedirectPage = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    // 👇 Call backend to get original URL by shortcode
    fetch(`http://localhost:5000/api/redirect/${shortcode}`)
      .then(res => res.json())
      .then(data => {
        if (data.originalUrl) {
          window.location.href = data.originalUrl;
        }
      });
  }, [shortcode]);

  return <p>Redirecting...</p>;
};

export default RedirectPage;
