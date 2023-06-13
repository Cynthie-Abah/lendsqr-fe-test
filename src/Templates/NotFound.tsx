import type { FC } from 'react';
import { Link } from 'react-router-dom';

interface NotFoundProps {}

const NotFound: FC<NotFoundProps> = () => {
    return (
    <>
    <h1>Oops! We couldnt find the page you are looking for</h1>
    <p>Here are some helpful links:</p>
    
    <Link to='/'>Log in</Link>
    <Link to='/welcome'>Welcome page</Link>
    <Link to='/dashboard'>Dashboard</Link>
    </>
    );
}

export default NotFound;
