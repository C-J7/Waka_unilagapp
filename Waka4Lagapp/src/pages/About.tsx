import  { useState } from 'react';
   import '../styles/styles.css';
   import profileImage from '../assets/profileImage.jpg'; // Add image

   const About: React.FC = () => {
     const [showFullImage, setShowFullImage] = useState(false);

     const toggleImage = () => {
       setShowFullImage(!showFullImage);
     };

     return (
       <div className="about">
         <h1>About Waka4Lag</h1>
         <div className="profile-image-container" onClick={toggleImage}>
           <img
             src={profileImage}
             alt="ProfileIMAGE"
             className={showFullImage ? 'full-image' : 'circular-image'}
           />
         </div>
         <div className="about-text">
         <p>
            This is an intuitive app built solely to ease navigation in the university especially for guest and first-timers.
         </p>
         <p>
        <h3>DEVELOPED BY:</h3> 
        </p>
         <p>
          Dev: Bamgbose Christian
          <p>About Dev: A university student, full-stack developer in training and a 2d illustrator.
        </p>
         </p>
         </div>
       </div>
     );
   };

   export default About;