import React from 'react';
import './Banner.scss';

const Banner = () => {
  return (
    <section className="banner mt-16">
      <div className="w-full relative flex items-center h-[50vh] sm:h-[50vh] md:h-[60vh] lg:h-[50vh] xl:h-[97vh]">
        <video
          className="absolute w-full h-full left-2/4 top-2/4 object-cover transform -translate-x-2/4 -translate-y-2/4 -z-[1]"
          autoPlay={true}
          loop={true}
          playsInline={true}
          muted={true}
        >
          <source
            src="https://youtu.be/uQm3-6ZV4QQ?si=w5qLe0mnOdxfwvZZ"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default Banner;
