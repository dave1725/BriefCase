import { benefits } from "../constants/index";
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "../assets/svg/Arrow";
import ClipPath from "../assets/svg/ClipPath";
import { GradientLight } from "./design/Benefits";
import UploadButton from "./UploadButton";
import { useState } from "react";

const Dashboard = () => {
  const [isEmpty, SetIsEmpty] = useState(false);

  return (
    <Section id="features" className="min-h-screen">
      <UploadButton className="fixed bottom-4 right-4 z-100" />
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Your secured documents"
        />

        <div className="flex flex-wrap z-0 gap-10 mb-10">
          {benefits.map((item) => (
            <div
              className="block relative z-0 p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.id}
            >
              <div className="relative z-2 flex flex-col min-h-[12rem] p-[2.4rem] cursor-pointer">
                <h5 className="h5 mb-5">{item.title}</h5>
                <p className="body-2 mb-6 text-n-3">{item.text}</p>
                <div className="flex items-center mt-auto">
                  <img
                    src={item.iconUrl}
                    width={48}
                    height={48}
                    alt={item.title}
                  />
                  <p className="ml-auto font-code text-xs hover:underline font-bold text-n-1 uppercase tracking-wider">
                    Open document
                  </p>
                  <Arrow />
                </div>
              </div>

              {item.light && <GradientLight />}

              <div
                className="absolute inset-0.5 bg-n-8 border-[1px] border-zinc-600"
                style={{ clipPath: "url(#benefits)" }}
              >
              </div>
                
              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Dashboard;
