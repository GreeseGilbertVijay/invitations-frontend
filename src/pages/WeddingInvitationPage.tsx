import { useState } from "react";
import ImageSlider from "./../components/ImageSlider";

const images = [
  "/wedding-1.jpg",
  "/wedding-2.jpg",
  "/wedding-3.jpg",
  "/wedding-4.jpg",
  "/wedding-5.jpg",
  "/wedding-6.jpg",
  
];
const WeddingInvitationPage = () => {
  // intro: black cover + button shown
  // fading: intro section fading out
  // content: main content shown
  const [phase, setPhase] = useState<"intro" | "fading" | "content">("intro");

  const handleOpen = () => {
    setPhase("fading");

    setTimeout(() => {
      setPhase("content");
    }, 3300);
  };

  return (
    <div className="w-full bg-white text-gray-800">
      {/* HERO IMAGE SECTION */}
      {phase !== "content" && (
        <div
          className={`relative w-full h-screen overflow-hidden transition-opacity duration-3500 ${
            phase === "fading" ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* Background Image */}
          <img
            src="/wedding-7.jpg"
            alt="Wedding Intro"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Black Overlay */}
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-500 ${
              phase === "intro"
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          />

          {/* Open Button */}
          {phase === "intro" && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <button
                onClick={handleOpen}
                className="text-white cursor-pointer text-2xl md:text-4xl font-light tracking-[5px] border border-white px-8 py-4 hover:bg-white hover:text-black transition-all duration-500"
              >
                TAP TO OPEN
              </button>
            </div>
          )}
        </div>
      )}

      {/* MAIN CONTENT */}
      {phase === "content" && (
        <div className="w-full">
          {/* SECTION 1 */}
          <section className="relative w-full h-screen flex flex-col items-center justify-center bg-[#fdf7f2] text-center px-6">
            <div className="absolute inset-0 bg-[url('/images/banner.jpg')] bg-cover bg-center opacity-20"></div>

            <div className="relative z-10">
              <p className="text-lg uppercase tracking-[8px] mb-4">
                Wedding Invitation
              </p>

              <h1 className="text-5xl md:text-7xl font-serif mb-4">
                Rahul
              </h1>

              <p className="text-2xl md:text-4xl my-4">&</p>

              <h1 className="text-5xl md:text-7xl font-serif mb-10">
                Priya
              </h1>

              <div className="inline-block border px-8 py-4 bg-white/80 shadow-lg">
                <p className="text-xl md:text-2xl tracking-[4px]">
                  15 DECEMBER 2026
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 2 */}
          <section className="py-24 bg-white text-center px-6">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              Save The Date
            </h2>

            <p className="text-xl tracking-[4px] mb-10">
              Sunday, 15 December 2026
            </p>

            <div className="flex justify-center">
              <img
                src="/flowerpot.png"
                alt="Bouquet"
                className="w-48 md:w-64 object-contain"
              />
            </div>
          </section>

          {/* SECTION 3 */}
          <section className="py-24 bg-[#f9f4ef] px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-serif mb-6">
                  Welcome
                </h2>

                <p className="max-w-3xl mx-auto text-lg leading-8">
                  Together with our families, we invite you to celebrate the joy
                  of our wedding and share in the beginning of our beautiful
                  journey together.
                </p>
              </div>

              {/* PHOTO SLIDER */}
              <div className="p-10">
                <ImageSlider images={images} />
             </div>
            </div>
          </section>

          {/* SECTION 4 */}
          <section className="py-24 bg-white px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
              {/* LEFT */}
              <div>
                <h2 className="text-4xl md:text-5xl font-serif mb-8">
                  Venue
                </h2>

                <div className="space-y-4 text-lg leading-8">
                  <p>
                    <strong>Royal Grand Palace</strong>
                  </p>

                  <p>
                    123 Wedding Street,
                    <br />
                    Chennai, Tamil Nadu,
                    <br />
                    India
                  </p>

                  <p>
                    Reception: 6:00 PM
                    <br />
                    Wedding Ceremony: 7:30 AM
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-xl">
                <iframe
                  title="Wedding Venue"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.4049962788735!2d76.95583287504388!3d11.08369535315417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859bfcaaaaaab%3A0xbbbbbbbbbbbbb!2sWedding%20Hall!5e0!3m2!1sen!2sin!4v1711111111111!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default WeddingInvitationPage;