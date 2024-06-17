import React from 'react';
import ReactCountUp from 'react-countup';

const CountUp = () => {
  return (
    <section className="count-up">
      <div className="container my-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex justify-center">
            <div className="text-center">
              <div className="text-5xl lg:text-4xl xl:text-7xl font-semibold">
                <ReactCountUp
                  startOnMount={false}
                  enableScrollSpy={true}
                  end={99}
                  duration={2.75}
                />
                +
                <div className="text-sm">
                  <span className="text-[#FD5B61]">01 / </span>
                  <span className="">Booking Month</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="text-center">
              <div className="text-5xl lg:text-4xl xl:text-7xl font-semibold">
                <ReactCountUp
                  startOnMount={false}
                  enableScrollSpy={true}
                  end={130}
                  duration={2.75}
                />
                +
                <div className="text-sm">
                  <span className="text-[#FD5B61]">02 / </span>
                  <span className="">Visitors Daily</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="text-center">
              <div className="text-5xl lg:text-4xl xl:text-7xl font-semibold">
                <ReactCountUp
                  startOnMount={false}
                  enableScrollSpy={true}
                  end={86}
                  duration={2.75}
                />
                +
                <div className="text-sm">
                  <span className="text-[#FD5B61]">03 / </span>
                  <span className="">Positive Feedback</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="text-center">
              <div className="text-5xl lg:text-4xl xl:text-7xl font-semibold">
                <ReactCountUp
                  startOnMount={false}
                  enableScrollSpy={true}
                  end={23}
                  duration={2.75}
                />
                +
                <div className="text-sm">
                  <span className="text-[#FD5B61]">04 / </span>
                  <span className="">Awards & Honors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountUp;
