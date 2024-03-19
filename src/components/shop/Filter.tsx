import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { filterDataType } from "@/lib/data";

const Filter = ({ title, items }: filterDataType) => {
  return (
    <div className="border-b-[1px] border-[rgba(255,255,255,0.2)] pt-3  ">
      <div className="flex flex-row gap-4 pb-2 ">
        <span className=" block w-[3px] bg-[var(--color)]"></span>
        <h3 className="text-[16px] lg:text-[20px] text-[var(--color)]">
          {title}
        </h3>
      </div>
      <ul className="flex flex-row flex-wrap items-start py-4 gap-2">
        {items.map((item) => (
          <li key={item} className="flex flex-row gap-2 items-center w-[40%]">
            <Checkbox className="" />
            <p className="lg:text-[16px] text-[var(--h2)]">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filter;
