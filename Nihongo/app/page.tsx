"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export default function NihonGoLanding() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [visitCount, setVisitCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const sakuraContainerRef = useRef<HTMLDivElement>(null)

  const slides = [
    {
      image: "/placeholder.svg?height=400&width=800",
      caption: "Beautiful Japanese landscapes await you in Nihon-GO!",
    },
    {
      image: "/placeholder.svg?height=400&width=800",
      caption: "Learn Japanese through interactive conversations with locals",
    },
    {
      image: "/placeholder.svg?height=400&width=800",
      caption: "Explore traditional Japanese architecture and culture",
    },
  ]

  const developers = [
    {
      name: "Jan Lancelot Mailig",
      role: "Lead Developer",
      description:
        "Passionate about promoting cross-cultural understanding through interactive experiences, with a strong interest in designing educational games that inspire learning and meaningful engagement.",
      skills: ["Leadership", "Game Design", "Education"],
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "Rafael Ramos",
      role: "Game Designer & Developer",
      description:
        "A college student specializing in game design and development, passionate about creating interactive experiences that entertain, educate, and inspire.",
      skills: ["Game Design", "Development", "Interactive Media"],
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "Sherwin Bernardo",
      role: "UI/UX Designer & Artist",
      description:
        "A college student specializing in UI/UX design, passionate about crafting intuitive and visually engaging digital experiences.",
      skills: ["UI/UX Design", "Visual Design", "User Experience"],
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "Kim Ryan Nabo",
      role: "UI/UX Designer & Artist",
      description:
        "A college student focused on UI/UX design, driven by a passion for creating user-friendly digital experiences.",
      skills: ["UI/UX Design", "User Research", "Digital Art"],
      image: "/placeholder.svg?height=120&width=120",
    },
  ]

  // Initialize visit counter from API
  useEffect(() => {
    const initializeCounter = async () => {
      try {
        const response = await fetch("/api/counter")
        const data = await response.json()
        setVisitCount(data.count)
      } catch (error) {
        console.error("Failed to load counter:", error)
        // Fallback to localStorage for offline functionality
        const localCount = localStorage.getItem("nihongo-visits")
        setVisitCount(localCount ? Number.parseInt(localCount) : 1247)
      } finally {
        setIsLoading(false)
      }
    }

    initializeCounter()
  }, [])

  // Enhanced sakura petals creation for mobile compatibility
  useEffect(() => {
    const createSakuraPetals = () => {
      if (!sakuraContainerRef.current) return

      const container = sakuraContainerRef.current
      const isMobile = window.innerWidth <= 768
      const isTablet = window.innerWidth <= 1024

      // Adjust petal count based on device performance
      let petalCount = 30
      if (isMobile) petalCount = 20
      if (isTablet && !isMobile) petalCount = 25

      // Clear existing petals
      container.innerHTML = ""

      for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement("div")
        petal.className = "sakura-petal"

        // Random horizontal position
        petal.style.left = Math.random() * 100 + "%"

        // Staggered animation delays
        petal.style.animationDelay = Math.random() * 20 + "s"

        // Varied animation duration for natural movement
        const duration = Math.random() * 8 + 12 // 12-20 seconds
        petal.style.animationDuration = duration + "s"

        // Vary petal sizes
        const size = Math.random() * 6 + 8 // 8-14px
        petal.style.width = size + "px"
        petal.style.height = size + "px"

        // Different petal colors
        const colors = ["#ffb6c1", "#ffc0cb", "#f8bbd9", "#e91e63", "#ff69b4"]
        petal.style.background = colors[Math.floor(Math.random() * colors.length)]

        // Add slight rotation variation
        const rotation = Math.random() * 360
        petal.style.setProperty("--initial-rotation", rotation + "deg")

        // Mobile-specific optimizations
        if (isMobile) {
          petal.style.willChange = "transform"
          petal.style.backfaceVisibility = "hidden"
        }

        container.appendChild(petal)
      }
    }

    createSakuraPetals()

    // Recreate petals on resize with debouncing
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(createSakuraPetals, 250)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [])

  // Auto-advance slideshow
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(slideInterval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleGitHubClick = async () => {
    try {
      // Increment counter via API
      const response = await fetch("/api/counter", {
        method: "POST",
      })
      const data = await response.json()
      setVisitCount(data.count)

      // Update localStorage as backup
      localStorage.setItem("nihongo-visits", data.count.toString())
    } catch (error) {
      console.error("Failed to increment counter:", error)
      // Fallback to localStorage increment
      const newCount = visitCount + 1
      setVisitCount(newCount)
      localStorage.setItem("nihongo-visits", newCount.toString())
    }

    // Show success animation
    const success = document.createElement("div")
    success.className = "success-animation"
    success.textContent = "🌸 Thank you for visiting!"
    document.body.appendChild(success)

    setTimeout(() => {
      success.remove()
    }, 2000)

    // Add extra sakura burst effect
    if (sakuraContainerRef.current) {
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          const petal = document.createElement("div")
          petal.className = "sakura-petal burst-petal"
          petal.style.left = Math.random() * 100 + "%"
          petal.style.animationDuration = "3s"
          petal.style.animationDelay = "0s"
          sakuraContainerRef.current?.appendChild(petal)

          setTimeout(() => petal.remove(), 3000)
        }, i * 100)
      }
    }
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Sticky Sakura Branches */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {/* Top Left Branch */}
        <div className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 opacity-30">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path
              d="M10,10 Q30,40 50,30 Q70,20 90,40 Q110,60 130,50"
              stroke="#8B4513"
              strokeWidth="4"
              fill="none"
              className="animate-pulse"
            />
            <path d="M20,20 Q40,50 60,40 Q80,30 100,50" stroke="#8B4513" strokeWidth="3" fill="none" />
            <circle cx="50" cy="30" r="8" fill="#FFB6C1" opacity="0.8" className="animate-pulse" />
            <circle cx="90" cy="40" r="6" fill="#FFC0CB" opacity="0.7" />
            <circle cx="130" cy="50" r="7" fill="#F8BBD9" opacity="0.9" />
            <circle cx="60" cy="40" r="5" fill="#E91E63" opacity="0.6" />
          </svg>
        </div>

        {/* Top Right Branch */}
        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 opacity-30 transform scale-x-[-1]">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path
              d="M10,10 Q30,40 50,30 Q70,20 90,40 Q110,60 130,50"
              stroke="#8B4513"
              strokeWidth="4"
              fill="none"
              className="animate-pulse"
            />
            <path d="M20,20 Q40,50 60,40 Q80,30 100,50" stroke="#8B4513" strokeWidth="3" fill="none" />
            <circle cx="50" cy="30" r="8" fill="#FFB6C1" opacity="0.8" className="animate-pulse" />
            <circle cx="90" cy="40" r="6" fill="#FFC0CB" opacity="0.7" />
            <circle cx="130" cy="50" r="7" fill="#F8BBD9" opacity="0.9" />
            <circle cx="60" cy="40" r="5" fill="#E91E63" opacity="0.6" />
          </svg>
        </div>

        {/* Bottom Left Branch */}
        <div className="absolute bottom-0 left-0 w-36 h-36 md:w-48 md:h-48 opacity-25 transform rotate-180">
          <svg viewBox="0 0 150 150" className="w-full h-full">
            <path d="M10,10 Q25,30 40,25 Q55,20 70,35 Q85,50 100,40" stroke="#8B4513" strokeWidth="3" fill="none" />
            <circle cx="40" cy="25" r="6" fill="#FFB6C1" opacity="0.7" />
            <circle cx="70" cy="35" r="5" fill="#FFC0CB" opacity="0.8" />
            <circle cx="100" cy="40" r="7" fill="#F8BBD9" opacity="0.6" />
          </svg>
        </div>

        {/* Bottom Right Branch */}
        <div className="absolute bottom-0 right-0 w-36 h-36 md:w-48 md:h-48 opacity-25 transform rotate-180 scale-x-[-1]">
          <svg viewBox="0 0 150 150" className="w-full h-full">
            <path d="M10,10 Q25,30 40,25 Q55,20 70,35 Q85,50 100,40" stroke="#8B4513" strokeWidth="3" fill="none" />
            <circle cx="40" cy="25" r="6" fill="#FFB6C1" opacity="0.7" />
            <circle cx="70" cy="35" r="5" fill="#FFC0CB" opacity="0.8" />
            <circle cx="100" cy="40" r="7" fill="#F8BBD9" opacity="0.6" />
          </svg>
        </div>

        {/* Side Branches - Hidden on mobile for better performance */}
        <div className="hidden md:block absolute left-0 top-1/2 w-32 h-32 opacity-20 transform -translate-y-1/2">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M0,50 Q20,30 40,50 Q60,70 80,50" stroke="#8B4513" strokeWidth="2" fill="none" />
            <circle cx="40" cy="50" r="4" fill="#FFB6C1" opacity="0.8" />
            <circle cx="80" cy="50" r="3" fill="#FFC0CB" opacity="0.7" />
          </svg>
        </div>

        <div className="hidden md:block absolute right-0 top-1/2 w-32 h-32 opacity-20 transform -translate-y-1/2 scale-x-[-1]">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M0,50 Q20,30 40,50 Q60,70 80,50" stroke="#8B4513" strokeWidth="2" fill="none" />
            <circle cx="40" cy="50" r="4" fill="#FFB6C1" opacity="0.8" />
            <circle cx="80" cy="50" r="3" fill="#FFC0CB" opacity="0.7" />
          </svg>
        </div>
      </div>

      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-50 via-pink-100 to-rose-200" />

      {/* Pattern Overlay */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-radial from-pink-200/20 via-transparent to-transparent" />
      </div>

      {/* Enhanced Animated Sakura Petals */}
      <div ref={sakuraContainerRef} className="fixed inset-0 pointer-events-none z-20 overflow-hidden" />

      {/* Main Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center min-h-screen text-center mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black bg-gradient-to-r from-pink-600 via-rose-500 to-pink-400 bg-clip-text text-transparent mb-4 relative">
            Nihon-GO!
            <span className="absolute -top-4 md:-top-8 -right-4 md:-right-8 text-xl md:text-2xl opacity-70 animate-bounce">
              🌸
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-purple-700 font-light tracking-wide opacity-0 animate-fade-in-up px-4">
            Explore Japan in Three Different Era • A Japanese Learning Adventure
          </p>
        </div>

        {/* GitHub Section */}
        <div className="bg-white/90 backdrop-blur-xl border-2 border-pink-200 rounded-3xl p-6 md:p-8 mb-8 text-center shadow-2xl">
          <button
            onClick={handleGitHubClick}
            className="inline-flex items-center gap-3 text-purple-700 hover:text-pink-600 font-medium text-base md:text-lg transition-all duration-300 px-6 md:px-8 py-3 md:py-4 border-2 border-purple-200 hover:border-pink-300 rounded-full bg-white/50 hover:bg-white/80 hover:-translate-y-1 hover:shadow-lg"
          >
            <svg width="20" height="20" md:width="24" md:height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </button>

          <div className="mt-6 md:mt-8 p-4 md:p-6 bg-white/60 rounded-2xl border border-pink-200 relative">
            <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">
              {isLoading ? (
                <div className="animate-pulse">Loading...</div>
              ) : (
                <div className="animate-pulse">{visitCount.toLocaleString()}</div>
              )}
            </div>
            <div className="text-purple-600 font-medium text-sm md:text-base">GitHub Visits</div>
            {!isLoading && <div className="text-xs text-gray-500 mt-1">Synced across all devices</div>}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-8">
          {/* Slideshow Panel */}
          <div className="lg:col-span-2 bg-white/90 backdrop-blur-xl border-2 border-pink-200 rounded-3xl p-6 md:p-8 shadow-2xl">
            <h2 className="text-xl md:text-2xl font-bold text-pink-600 mb-4 md:mb-6 flex items-center gap-2">
              🖼️ Game Screenshots
            </h2>
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl mb-4 md:mb-6">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={`Game Screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6">
                    <p className="text-white text-sm md:text-lg font-medium">{slide.caption}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-3 md:gap-4 mb-4">
              <button
                onClick={prevSlide}
                className="px-4 md:px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-sm md:text-base"
              >
                ← Previous
              </button>
              <button
                onClick={nextSlide}
                className="px-4 md:px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-sm md:text-base"
              >
                Next →
              </button>
            </div>
            <div className="flex justify-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-pink-600 scale-125" : "bg-pink-300 hover:bg-pink-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Video Panel */}
          <div className="bg-white/90 backdrop-blur-xl border-2 border-pink-200 rounded-3xl p-6 md:p-8 shadow-2xl">
            <h2 className="text-xl md:text-2xl font-bold text-pink-600 mb-4 md:mb-6 flex items-center gap-2">
              🎥 Game Trailer
            </h2>
            <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-xl mb-4">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/t1ZtN6UjWbg"
                frameBorder="0"
                allowFullScreen
                className="rounded-2xl"
              />
            </div>
            <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
              Watch as players embark on an immersive adventure through Nihon-GO!, exploring stunning Japanese
              landscapes that bring the country's rich history and culture to life.
            </p>
          </div>

          {/* Description Panel */}
          <div className="bg-white/90 backdrop-blur-xl border-2 border-pink-200 rounded-3xl p-6 md:p-8 shadow-2xl">
            <h2 className="text-xl md:text-2xl font-bold text-pink-600 mb-4 md:mb-6 flex items-center gap-2">
              📖 About the Game
            </h2>
            <div className="space-y-3 md:space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
              <p>
                Nihon-GO! takes players on an immersive journey through Japan across three distinct historical eras.
                Designed as a language-learning adventure game, it seamlessly blends cultural exploration with
                interactive gameplay.
              </p>

              <div>
                <p className="font-semibold text-pink-600 mb-2">Key Features:</p>
                <ul className="space-y-1 md:space-y-2">
                  {[
                    "Explore Japan across three unique time periods",
                    "Learn vocabulary by photographing objects in the game",
                    "Practice pronunciation with interactive feedback",
                    "Engage in conversations with native-speaking characters",
                    "Complete tasks, mini-games, and quizzes",
                    "Unlock achievements as you advance",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm md:text-base">
                      <span className="text-pink-500">🌸</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <p>
                Perfect for learners who want to study Japanese through fun, immersive gameplay and cultural discovery.
              </p>
            </div>
          </div>
        </div>

        {/* Developers Section */}
        <div className="bg-white/90 backdrop-blur-xl border-2 border-pink-200 rounded-3xl p-6 md:p-8 shadow-2xl">
          <h2 className="text-xl md:text-2xl font-bold text-pink-600 mb-6 md:mb-8 text-center flex items-center justify-center gap-2">
            👥 Meet the Developers
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {developers.map((dev, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-4 md:p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 md:mb-4">
                  <Image
                    src={dev.image || "/placeholder.svg"}
                    alt={dev.name}
                    fill
                    className="rounded-full object-cover border-4 border-pink-200 group-hover:border-pink-400 transition-colors duration-300"
                  />
                  <div className="absolute -top-1 -right-1 text-sm md:text-lg animate-bounce">🌸</div>
                </div>

                <h3 className="text-base md:text-lg font-bold text-pink-600 mb-1">{dev.name}</h3>
                <p className="text-xs md:text-sm font-semibold text-purple-600 uppercase tracking-wide mb-2 md:mb-3">
                  {dev.role}
                </p>
                <p className="text-xs leading-relaxed text-gray-600 mb-3 md:mb-4">{dev.description}</p>

                <div className="flex flex-wrap gap-1 justify-center">
                  {dev.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 bg-gradient-to-r from-pink-200 to-rose-200 text-pink-700 text-xs rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .sakura-petal {
          position: absolute;
          width: 12px;
          height: 12px;
          background: #ffb6c1;
          border-radius: 0 100% 0 100%;
          transform: rotate(var(--initial-rotation, 45deg));
          opacity: 0.8;
          animation: sakuraFall linear infinite;
          box-shadow: 0 0 10px rgba(255, 182, 193, 0.3);
        }

        .sakura-petal::before {
          content: '';
          position: absolute;
          top: -6px;
          left: -6px;
          width: 12px;
          height: 12px;
          background: #ffc0cb;
          border-radius: 0 100% 0 100%;
          transform: rotate(30deg);
        }

        .burst-petal {
          animation: sakuraBurst linear forwards !important;
        }

        @keyframes sakuraFall {
          0% {
            transform: translateY(-100vh) rotate(var(--initial-rotation, 45deg)) rotateX(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(100vh) rotate(calc(var(--initial-rotation, 45deg) + 360deg)) rotateX(360deg);
            opacity: 0;
          }
        }

        @keyframes sakuraBurst {
          0% {
            transform: translateY(0) rotate(var(--initial-rotation, 45deg)) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(calc(var(--initial-rotation, 45deg) + 180deg)) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.5s forwards;
        }

        .success-animation {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(255, 182, 193, 0.95);
          color: #2d1b2e;
          padding: 1.5rem 2rem;
          border-radius: 16px;
          font-weight: 500;
          font-size: 1rem;
          z-index: 1000;
          animation: successPop 0.5s ease-out;
          border: 2px solid rgba(233, 30, 99, 0.3);
          box-shadow: 0 20px 40px rgba(214, 51, 132, 0.2);
        }

        @keyframes successPop {
          0% { transform: translate(-50%, -50%) scale(0); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .sakura-petal {
            width: 10px;
            height: 10px;
          }
          
          .sakura-petal::before {
            width: 10px;
            height: 10px;
            top: -5px;
            left: -5px;
          }
        }
      `}</style>
    </div>
  )
}
