"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Sorting: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const changeValueHandler = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sorting", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Select onValueChange={changeValueHandler}>
      <SelectTrigger className="w-[180px] text-[12px]">
        <SelectValue placeholder="Sorting" />
      </SelectTrigger>
      <SelectContent className="bg-primary">
        <SelectItem className="text-[12px]" value="ascending">
          Sort by price (low to high)
        </SelectItem>
        <SelectItem className="text-[12px]" value="descending">
          Sort by price (high to low)
        </SelectItem>
        <SelectItem className="text-[12px]" value="latest">
          Sort by latest
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default Sorting;
