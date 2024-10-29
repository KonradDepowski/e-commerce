"use client";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const Filter = ({
  title,
  items,
  cat,
}: {
  title: string;
  items: string[];
  cat: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // State to hold the selected checkbox values
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Initialize the state from the URL on component mount
  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams.toString());
    const categoryValues = currentParams.getAll(cat) || [];
    setSelectedItems(categoryValues);
  }, [searchParams, cat]);

  // Function to handle checkbox changes
  const changeValue = (item: string, checked: boolean) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    let categoryValues = currentParams.getAll(cat);

    if (checked) {
      // Add the item to selected items
      categoryValues.push(item);
    } else {
      // Remove the item from selected items
      categoryValues = categoryValues.filter((i) => i !== item);
    }

    // Clear and update URLSearchParams
    currentParams.delete(cat);
    categoryValues.forEach((i) => currentParams.append(cat, i));

    // Update the state and URL
    setSelectedItems(categoryValues);
    router.push(`${pathname}?${currentParams.toString()}`);
  };

  return (
    <div className="border-b-[1px] border-[rgba(255,255,255,0.2)] pt-3 ">
      <div className="flex flex-row gap-4 pb-2">
        <span className="block w-[3px] bg-[var(--dark-300)]"></span>
        <h3 className="text-[16px] lg:text-[20px] font-bold text-[var(--green-main)]">
          {title}
        </h3>
      </div>
      <ul className="flex flex-row flex-wrap items-start py-4 gap-2">
        {items.map((item) => (
          <li key={item} className="flex flex-row gap-2 items-center w-[40%]">
            <Checkbox
              checked={selectedItems.includes(item)}
              onCheckedChange={(checked) =>
                changeValue(item, checked as boolean)
              }
            />
            <p className="lg:text-[16px] text-[var(--dark-500)] capitalize">
              {item}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filter;
