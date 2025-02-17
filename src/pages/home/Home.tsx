
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
function Home() {
    const [name, setName] = useState(() => {
        return localStorage.getItem("studentName") || ""; // جلب الاسم من localStorage إذا كان موجودًا
    });


    useEffect(() => {
        localStorage.setItem("studentName", name);
    }, [name]);
    return (
        <div>

            <section className="bg-gray-900 text-white h-[100vh]">
                <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className='mb-[20px] text-center flex items-center justify-center'>
                            <img src='https://itlegend.net/Website/assets/images/logo-1.png' alt='logo' />

                        </div>
                        {/* <h1
                            className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
                        >
                            Understand User Flow.

                            <span className="sm:block"> Increase Conversion. </span>
                        </h1> */}

                        <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                            It Legend platform offers you an enjoyable journey to learn programming during which you will not feel bored. You will get the information you need smoothly without facing difficulty in learning or spending long hours understanding and navigating between different sources.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4 flex-col w-[90%] sm:w-[70%] mx-auto">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block overflow-hidden rounded-md border border-gray-200 px-3 py-1 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                                >
                                    <span className="text-xs font-medium text-gray-700"> Student Name </span>

                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Ali Shahin"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="mt-1 w-full border-none p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm"
                                    />
                                </label>
                            </div>


                            <Link
                                className={`block w-full rounded-sm border border-blue-600 px-12 py-3 text-sm font-medium text-white focus:ring-3 sm:w-auto ${name ? "bg-blue-600 hover:bg-transparent hover:text-white" : "bg-gray-400 pointer-events-none"
                                    }`}
                                to={name ? "/courses" : "#"}
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}

export default Home