const ResetPassword = () =>{
    return (
        <>
            <div className="bg-gray-300 h-screen flex items-center justify-center">
                <div className="flex flex-col rounded-lg bg-white px-6 py-16 md:px-8 gap-8 justify-center items-center">
                    <span className="text-3xl font-serif">Reset Password</span>
                    <div className="flex flex-col gap-4 justify-center w-44">
                        <input type="password" placeholder="Password" className="border border-1 border-red-300 rounded p-2" maxLength="256"/>
                    </div>
                    <button className="py-2 px-4 text-white bg-blue-300 rounded-md hover:bg-gray-300">Reset</button>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;