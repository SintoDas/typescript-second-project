import { z } from 'zod';

export const VariantZodSchema = z.object({
  type: z.string(),
  value: z.string(),
});

export const InventoryZodSchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
});

export const ProductZodSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(VariantZodSchema),
  inventory: InventoryZodSchema,
});
