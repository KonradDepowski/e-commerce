"use client";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import CheckoutButton from "../checkout/CheckoutButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deliveryDataSchema } from "@/lib/models/form/deliveryData";
import { checkoutOrder } from "@/lib/actions/order";
import { loadStripe } from "@stripe/stripe-js";
import { CartItemsIds } from "@/lib/types/types";

export type FormValues = {
  country: string;
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  houseNumber: number;
  postalCode: string;
  town: string;
  phone: number;
};

const DeliveryForm = ({
  totalAmount,
  cartItemsIds,
  userId,
  buyerAvatar,
  discount,
}: {
  totalAmount: number;
  cartItemsIds: CartItemsIds[];
  userId: string;
  buyerAvatar: string;
  discount: string;
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(deliveryDataSchema),
  });

  const submitFormHandler = async (data: FormValues) => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    const order = {
      productsIds: [...cartItemsIds],
      buyerId: userId,
      buyerAvatar,
      totalAmount,
      deliveryData: data,
      discount,
    };

    checkoutOrder(order);
  };
  return (
    <form onSubmit={handleSubmit(submitFormHandler)}>
      <h3 className=" py-3 md:pt-0 text-lg">Delivery Data</h3>
      <div className="grid gap-2 mt-2">
        <>
          <div className="grid gap-1 ">
            <Label className="sr-only">Country</Label>
            <Input
              className="lg:p-6 lg:px-3"
              id="country"
              placeholder="Country"
              type="text"
              autoCapitalize="none"
              autoComplete="on"
              autoCorrect="off"
              {...register("country" as const)}
            />
          </div>
          {errors.country && (
            <p className="text-red-500 text-[10px] md:text-[12px] px-2">
              {errors.country.message}
            </p>
          )}
          <div className="grid gap-1 ">
            <Label className="sr-only">Fist Name</Label>
            <Input
              className="lg:p-6 lg:px-3"
              id="firstName"
              placeholder="First name"
              type="text"
              autoCapitalize="none"
              autoComplete="on"
              autoCorrect="off"
              {...register("firstName" as const)}
            />
          </div>
          {errors.firstName && (
            <p className="text-red-500 text-[10px] md:text-[12px] px-2">
              {errors.firstName.message}
            </p>
          )}
          <div className="grid gap-1">
            <Label className="sr-only">Last Name</Label>
            <Input
              className="lg:p-6 lg:px-3"
              id="lastName"
              placeholder="Last name"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              {...register("lastName" as const)}
            />
          </div>
          {errors.lastName && (
            <p className="text-red-500 text-[10px] md:text-[12px] px-2">
              {errors.lastName.message}
            </p>
          )}
          <div className="grid gap-1 ">
            <Label className="sr-only">Email</Label>
            <Input
              className="lg:p-6 lg:px-3"
              id="email"
              placeholder="E-mail"
              type="email"
              autoCapitalize="none"
              autoComplete="on"
              autoCorrect="off"
              {...register("email" as const)}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-[10px] md:text-[12px] px-2">
              {errors.email.message}
            </p>
          )}
          <div className="flex justify-between gap-2">
            <div className="grid gap-1 w-[70%] ">
              <Label className="sr-only">Street</Label>
              <Input
                className="lg:p-6 lg:px-3"
                id="street"
                placeholder="Street"
                type="text"
                autoCapitalize="none"
                autoComplete="on"
                autoCorrect="off"
                {...register("street" as const)}
              />
              {errors.street && (
                <p className="text-red-500 text-[10px] md:text-[12px] px-2">
                  {errors.street.message}
                </p>
              )}
            </div>

            <div className="grid gap-1 ">
              <Label className="sr-only">House Number</Label>
              <Input
                className="lg:p-6 lg:px-3"
                id="houseNumber"
                placeholder="House Number"
                type="number"
                autoCapitalize="none"
                autoComplete="on"
                autoCorrect="off"
                {...register("houseNumber" as const)}
              />
              {errors.houseNumber && (
                <p className="text-red-500 text-[10px] md:text-[12px] px-2">
                  {errors.houseNumber.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="grid gap-1 w-[40%] ">
              <Label className="sr-only">Postal Code</Label>
              <Input
                className="lg:p-6 lg:px-3"
                id="postalCode"
                placeholder="Postal Code"
                type="text"
                autoCapitalize="none"
                autoComplete="on"
                autoCorrect="off"
                {...register("postalCode" as const)}
              />
              {errors.postalCode && (
                <p className="text-red-500 text-[10px] md:text-[12px] px-2">
                  {errors.postalCode.message}
                </p>
              )}
            </div>

            <div className="grid gap-1 w-[60%] ">
              <Label className="sr-only">Town</Label>
              <Input
                className="lg:p-6 lg:px-3"
                id="town"
                placeholder="Town"
                type="text"
                autoCapitalize="none"
                autoComplete="on"
                autoCorrect="off"
                {...register("town" as const)}
              />
              {errors.town && (
                <p className="text-red-500 text-[10px] md:text-[12px] px-2">
                  {errors.town.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-1 ">
            <Label className="sr-only">Phone number</Label>
            <Input
              className="lg:p-6 lg:px-3"
              id="firstName"
              placeholder="Phone number"
              type="tel"
              autoCapitalize="none"
              autoComplete="on"
              autoCorrect="off"
              {...register("phone" as const)}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-[10px] md:text-[12px] px-2">
              {errors.phone.message}
            </p>
          )}
        </>
      </div>

      <p className="self-end text-xl pr-2 py-6 font-bold xl:text-2xl">
        Total Amount:
        <span className="text-[var(--green-main)]">${totalAmount}</span>
      </p>
      <CheckoutButton />
    </form>
  );
};

export default DeliveryForm;
