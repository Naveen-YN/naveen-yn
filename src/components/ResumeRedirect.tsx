import React, { useEffect } from 'react';

   const ResumeRedirect: React.FC = () => {
     useEffect(() => {
       window.location.href = 'https://drive.google.com/file/d/1EsffInOaC-iOewZdebQOn5eMoc9UTbk8/view?usp=sharing';
     }, []); // Empty dependency array ensures this runs once on mount

     return (
       <div>
         <p>Redirecting to resume...</p>
       </div>
     );
   };

   export default ResumeRedirect;