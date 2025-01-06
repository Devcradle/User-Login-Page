import '../Home/Welcome.scss';

const Welcome = () =>{
    return (
        <>
            <div className="welcome-mainDiv-cnt">
                <span className='welcome-span0-cnt'>Welcome to the home page</span>
                <span className="welcome-span-cnt">This assignment involves presenting a user table where all CRUD (Create, Read, Update, Delete) operations are demonstrated and tested. The operations include creating and editing users.</span>
            </div>
        </>
    );
};

export default Welcome;