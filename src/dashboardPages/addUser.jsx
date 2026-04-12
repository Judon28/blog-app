import Dsidebar from "../components/dsidebar";


export default function AddUser () {
    return (
        <>
            <div className="flex">
                <Dsidebar/>

                <div className="p-10 w-[80%]">

                    <div className="dblock">
            
                        <div className="dblockupper" >
                            <h1 className="font-semibold text-[20px]">New User Form</h1>
                        </div>

                        <form className="p-10">
                            <div className="flex">
                                <div className="flex justify-center items-center w-[50%] border">

                                    <div className="relative h-50 w-50">
                                        <div className="h-50 w-50 rounded-full border-8 border-gray-300 bg-gray-400 flex items-center justify-center text-white text-8xl">
                                            <i className="fas fa-user"></i>
                                        </div>

                                        <div className="h-8 w-8 rounded-full flex items-center justify-center bg-white shadow-[0_0_5px] absolute top-0 right-4">
                                            <i class="fas fa-pencil-alt"></i>
                                        </div>
                                    </div>

                                </div>
                                
                                <div className="w-[50%] border flex flex-col gap-y-5 ">
                                    <div className="flex flex-col">
                                        <label>First Name</label>
                                        <input type="text" className="input" />
                                    </div>

                                    <div className="flex flex-col">
                                        <label>Username</label>
                                        <input type="text" className="input" />
                                    </div>

                                    <div className="flex flex-col">
                                        <label>Email</label>
                                        <input type="email" className="input" />
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <label>Phone Number</label>
                                        <input type="number" className="input" />
                                    </div>
                                </div>


                            </div>

                            <div className="border mt-5">
                                <div className="grid grid-cols-3 gap-5">
                                    <div className="ddContainer">
                                        <label className="ddLabel">Role</label>
                                        <select className="ddSelect">     
                                            <option value="public">admin</option>
                                            <option value="private">manage</option>
                                            <option value="pending">customer</option>
                                        </select>
                                    </div>

                                    <div className="ddContainer">
                                        <label className="ddLabel">Gender</label>
                                        <select className="ddSelect">     
                                            <option value="public">Male</option>
                                            <option value="private">Female</option>
                                            <option value="pending">I rather not say</option>
                                        </select>
                                    </div>
                               

                                    <div className="ddContainer">
                                        <label className="ddLabel">Date of Birth</label>
                                        <input type="date" className="ddSelect" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-5">
                                    <div className="ddContainer">
                                        <label className="ddLabel">Facebook</label>
                                        <input type="url" className="ddSelect"/>
                                    </div>

                                    <div className="ddContainer">
                                        <label className="ddLabel">Facebook</label>
                                        <input type="url" className="ddSelect"/>
                                    </div>

                                    <div className="ddContainer">
                                        <label className="ddLabel">Facebook</label>
                                        <input type="url" className="ddSelect"/>
                                    </div>
                                </div>

                                <div className="ddContainer">
                                    <label className="ddLabel">About</label>
                                    <textarea className="p-5 border border-gray-300 rounded-xl h-40"></textarea>
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div className="ddContainer">
                                        <label className="ddLabel">Password</label>
                                        <input type="password" className="ddSelect" />
                                    </div>

                                    <div className="ddContainer">
                                        <label className="ddLabel">Password</label>
                                        <input type="password" className="ddSelect"/>
                                    </div>
                                </div>

                                
                            </div>

                            <div className="dbtn1 mt-5">    
                                <input type="submit" value="submit" />
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}