import Nav from "../components/nav"
import PostGrid from "../components/postGrid"
import AboutImg from "../assets/aboutimg1.jpg"
import Footer from "../components/footer"


function About () {
    return (
        <>
            <Nav />
            <div>
                <section className=" px-5 lg:px-15 py-3">
                    <div className="gridCard lg:flex ">

                        <div className="lg:hidden">
                            <img src={AboutImg} className="rounded-xl" />
                        </div>

                        <div className="lg:w-[50%] p-10">
                            <h1 className="font-lato font-semibold text-[30px] ">About Me</h1>
                            <p className=" font-inter text-[18px] lg:text-[20px] mt-3 text-gray-500 ">Driven by taste, inspired by travel, and defined by style. We are a creative team dedicated to capturing the intersection of global culture and aesthetic design. Our mission is simple: to document the beauty in every experience and find the narrative in the everyday.</p>
                            
                            <ul className="flex justify-between w-40 items-center mt-3 text-[26px] ">
                                <li><i className="fab fa-instagram"></i></li>
                                <li><i className="fab fa-facebook"></i></li>
                                <li><i className="fab fa-twitter"></i></li>
                                <li><i className="fab fa-tiktok"></i></li>
                            </ul>
                        </div>

                        <div className="hidden lg:block w-[50%]">
                            <img src={AboutImg} className="rounded-xl" />
                        </div>

                    </div>
                </section>

                {/*Post grid*/}

                <PostGrid />

            </div>

            <Footer/>
        </>
    )
}

export default About