"use client";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { filterDataType } from "@/lib/data";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = ({ title, items, cat }: filterDataType) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const changeValue = (params: any, value: boolean) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    const categoryValues = currentParams.getAll(params.cat);

    if (value) {
      categoryValues.push(params.item);
    } else {
      const index = categoryValues.indexOf(params.item);
      if (index > -1) {
        categoryValues.splice(index, 1);
      }
    }

    // Clear all existing values for the category
    currentParams.delete(params.cat);

    // Add updated values back to the URLSearchParams
    categoryValues.forEach((item) => {
      currentParams.append(params.cat, item);
    });
    const newUrl = `${pathname}?${currentParams.toString()}`;
    router.push(newUrl);
  };

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
            <Checkbox
              onCheckedChange={(checked) =>
                changeValue(
                  {
                    cat: cat,
                    item: item,
                  },
                  checked
                )
              }
            />
            <p className="lg:text-[16px] text-[var(--h2)] capitalize">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filter;
