import { z } from "zod";
import data from "../data.json";

export const dynamic = 'force-dynamic'

export async function GET(
  _: Request,
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params
  const slug = z.string().parse(params.slug);

  const product = data.products.find((product) => product.slug === slug);

  if (!product) {
    return Response.json({message: "Product not found"}, { status: 404 });
  }

  return Response.json(product);
}
