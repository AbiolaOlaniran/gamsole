"use client"
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const Loading = () => {
  return (
      <div className=" grid gap-7 max-w-[1500px] ">
          <div className=" w-full gap-7 grid grid-cols-2 md:grid-cols-5  h-[250px] md:h-[130px]">
            {/* Render the Skeleton component to show loading animations */}
            <Skeleton  borderRadius={"0.5rem"} width={"100%"} height={"100%"} highlightColor={"#373952"} baseColor={"#1F2030"} className="w-full rounded-2xl h-full" />
            <Skeleton  borderRadius={"0.5rem"} width={"100%"} height={"100%"} highlightColor={"#373952"} baseColor={"#1F2030"} className="w-full rounded-2xl h-full" />
            <Skeleton  borderRadius={"0.5rem"} width={"100%"} height={"100%"} highlightColor={"#373952"} baseColor={"#1F2030"} className="w-full rounded-2xl h-full" />
            <Skeleton  borderRadius={"0.5rem"} width={"100%"} height={"100%"} highlightColor={"#373952"} baseColor={"#1F2030"} className="w-full rounded-2xl h-full" />
            <Skeleton  borderRadius={"0.5rem"} width={"100%"} height={"100%"} highlightColor={"#373952"} baseColor={"#1F2030"} className="w-full rounded-2xl h-full" />
            
          </div>
          <div className=" w-full gap-7 grid-cols-2 grid md:grid-cols-5    h-[250px] md:h-[130px]">
            {/* Render the Skeleton component to show loading animations */}
            <Skeleton  borderRadius={"0.5rem"} width={"100%"} height={"100%"} highlightColor={"#373952"} baseColor={"#1F2030"} className="w-full rounded-2xl h-full" />
            <Skeleton  borderRadius={"0.5rem"} width={"100%"} height={"100%"} highlightColor={"#373952"} baseColor={"#1F2030"} className="w-full rounded-2xl h-full" />
            <Skeleton  borderRadius={"0.5rem"} width={"100%"} height={"100%"} highlightColor={"#373952"} baseColor={"#1F2030"} className="w-full rounded-2xl h-full" />
            <Skeleton  borderRadius={"0.5rem"} width={"100%"} height={"100%"} highlightColor={"#373952"} baseColor={"#1F2030"} className="w-full rounded-2xl h-full" />
            <Skeleton  borderRadius={"0.5rem"} width={"100%"} height={"100%"} highlightColor={"#373952"} baseColor={"#1F2030"} className="w-full rounded-2xl h-full" />
            
          </div>
          <div className=" w-full gap-7 grid md:grid-cols-5 grid-cols-2   h-[250px] md:h-[130px]">
            {/* Render the Skeleton component to show loading animations */}
            <Skeleton  borderRadius={"0.5rem"} width={"100%"} height={"100%"} highlightColor={"#373952"} baseColor={"#1F2030"} className="w-full rounded-2xl h-full" />
            <Skeleton  borderRadius={"0.5rem"} width={"100%"} height={"100%"} highlightColor={"#373952"} baseColor={"#1F2030"} className="w-full rounded-2xl h-full" />
            <Skeleton  borderRadius={"0.5rem"} width={"100%"} height={"100%"} highlightColor={"#373952"} baseColor={"#1F2030"} className="w-full rounded-2xl h-full" />
            <Skeleton  borderRadius={"0.5rem"} width={"100%"} height={"100%"} highlightColor={"#373952"} baseColor={"#1F2030"} className="w-full rounded-2xl h-full" />
            <Skeleton  borderRadius={"0.5rem"} width={"100%"} height={"100%"} highlightColor={"#373952"} baseColor={"#1F2030"} className="w-full rounded-2xl h-full" />
            
          </div>
          <div className=" w-full gap-7 grid grid-cols-5  grid-cols-2  h-[250px] md:h-[130px]">
            {/* Render the Skeleton component to show loading animations */}
            <Skeleton  borderRadius={"0.5rem"} width={"100%"} height={"100%"} highlightColor={"#373952"} baseColor={"#1F2030"} className="w-full rounded-2xl h-full" />
            <Skeleton  borderRadius={"0.5rem"} width={"100%"} height={"100%"} highlightColor={"#373952"} baseColor={"#1F2030"} className="w-full rounded-2xl h-full" />
            <Skeleton  borderRadius={"0.5rem"} width={"100%"} height={"100%"} highlightColor={"#373952"} baseColor={"#1F2030"} className="w-full rounded-2xl h-full" />
            <Skeleton  borderRadius={"0.5rem"} width={"100%"} height={"100%"} highlightColor={"#373952"} baseColor={"#1F2030"} className="w-full rounded-2xl h-full" />
            <Skeleton  borderRadius={"0.5rem"} width={"100%"} height={"100%"} highlightColor={"#373952"} baseColor={"#1F2030"} className="w-full rounded-2xl h-full" />
            
            
          </div>
      </div>
  );
};

export default Loading;
