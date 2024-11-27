import z from "zod";

export const deliveryDataSchema = z.object({
  country: z.string().nonempty({ message: "Please enter a correct country" }),
  firstName: z
    .string()
    .min(3, { message: "Password must have min 6 characters" })
    .max(30, { message: "Password must have max 30 characters" })
    .nonempty(),
  lastName: z
    .string()
    .min(3, { message: "Password must have min 6 characters" })
    .max(30, { message: "Password must have max 30 characters" })
    .nonempty(),
  email: z.string().email({ message: "Please enter a correct email" }),
  street: z
    .string()
    .max(30)
    .nonempty({ message: "Please enter a correct street" }),
  houseNumber: z
    .string()
    .nonempty({ message: "Please enter a correct house number" }),
  postalCode: z
    .string()
    .nonempty({ message: "Please enter a correct postal code" }),
  town: z.string().nonempty({ message: "Please enter a correct town" }).max(40),
  phone: z
    .string()
    .nonempty({ message: "Please enter a correct number" })
    .max(9)
    .min(9),
});

export type Data = z.infer<typeof deliveryDataSchema>;
