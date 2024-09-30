import Image from 'next/image'
import Link from 'next/link'
import bgdots from "./assets/assets/bg-dots.png"
import bgArrow from "./assets/assets/bg-arrow.png"
import Globe from './Globe'
import NavBar from './NavBar'
import CameraApp from './camera/page'
import HeroSectionTextHover from '../../components/animation/animation/hero-section-text-hover'

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col font-montserrat bg-gradient-to-r from-gray-700 to-black relative overflow-hidden">
      <div className="relative z-10 max-w-screen-xl w-full mx-auto px-4 py-6 flex flex-col flex-grow">
        <NavBar />

        <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-12">
          <div className="space-y-6 relative">
            {/* <HeroSectionTextHover /> */}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              WANDER<br />DISCOVER<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white" style={{ WebkitTextStroke: '2px white' }}>EXPERIENCE</span>
            </h1>
            <p className="text-sm md:text-base lg:text-lg max-w-xs md:max-w-sm lg:max-w-md text-white leading-relaxed">
              Embark on a journey of discovery with our travel guide. Explore hidden gems, embrace diverse cultures, and find destinations that captivate and inspire. Whether seeking adventure or serenity, let us help you create unforgettable memories.
            </p>
            <a>

            <button className="px-6 py-2 md:px-8 md:py-3 text-sm md:text-base font-semibold text-white bg-teal-500 hover:bg-teal-600 transition duration-300 rounded-lg shadow-lg">
              CAMERA
            </button>
            </a>
          </div>

          <div className="relative h-64 md:h-80 lg:h-full min-h-[400px]">
            <Globe />
          </div>
        </div>

        <div className="absolute bottom-8 left-4 flex flex-col gap-6">
          {/* <div className="w-px h-24 bg-white/50 ml-[15px]"></div> */}
        </div>
      </div>
      <Image src={bgArrow} alt="background arrow" className="absolute bottom-0 right-0 opacity-10" width={300} height={300} />
      <CameraApp/>
    </div>
  )
}
