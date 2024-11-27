"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useParams } from "next/navigation";
import { fetchProduct } from "@/lib/actions/product";
import { useContext } from "react";
import { CartContext } from "@/lib/store/CartContext";

const FormSchema = z.object({
  type: z.enum(["6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"], {
    required_error: "You need to select size",
  }),
});

export function SizeForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const params = useParams();
  const cartCtx = useContext(CartContext);

  const prodId = params.id.slice(12, params.id.length) as string;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const product = await fetchProduct(prodId as string);

    let price = product.price;
    if (product.offer) {
      price = product.price * 0.8;
    }
    const cartItem = {
      id: prodId,
      title: product.name,
      price: price,
      size: data.type,
      category: product.category,
      image: product.images[0],
      quantity: 1,
    };
    cartCtx?.addToCart(cartItem);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6  xl:mt-4 "
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg md:text-xl">
                Select a size:
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 md:py-5"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0  pb-1">
                    <FormControl>
                      <RadioGroupItem className="" value="6.5" />
                    </FormControl>
                    <FormLabel className="font-normal">6.5</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0  pb-1">
                    <FormControl>
                      <RadioGroupItem value="7" />
                    </FormControl>
                    <FormLabel className="font-normal">7</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0  pb-1">
                    <FormControl>
                      <RadioGroupItem value="7.5" />
                    </FormControl>
                    <FormLabel className="font-normal">7.5</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0  pb-1">
                    <FormControl>
                      <RadioGroupItem value="8" />
                    </FormControl>
                    <FormLabel className="font-normal">8</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0  pb-1">
                    <FormControl>
                      <RadioGroupItem value="8.5" />
                    </FormControl>
                    <FormLabel className="font-normal">8.5</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0  pb-1">
                    <FormControl>
                      <RadioGroupItem value="9" />
                    </FormControl>
                    <FormLabel className="font-normal ">9</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0  pb-1">
                    <FormControl>
                      <RadioGroupItem value="9.5" />
                    </FormControl>
                    <FormLabel className="font-normal">9.5</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0  pb-1">
                    <FormControl>
                      <RadioGroupItem value="10" />
                    </FormControl>
                    <FormLabel className="font-normal">10</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          style={{ marginTop: "50px !important" }}
          className="bg-[var(--green-main)] hover:bg-[var(--green-main-hover)] transition-all p-3 px-6 lg:p-5 rounded-lg xl:w-[200px] xl:h-[60px] xl:text-xl mt-10 text-white"
          type="submit"
        >
          Add to Cart
        </Button>
      </form>
    </Form>
  );
}
