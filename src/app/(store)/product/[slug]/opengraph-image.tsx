import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { env } from '@/env'
import colors from 'tailwindcss/colors'
import { ImageResponse } from 'next/og'
// import Image from 'next/image'

 
export const runtime = 'edge'

type Params = Promise<{slug: string}>
 
export const alt = ''
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    }
  });

  const product = await response.json()

  return product
}
 
export default async function OgImage({params}: {params: Params}) {
  const product = await getProduct((await params).slug)

  const productImageUrl = new URL(product.image, env.APP_URL).toString()

  return new ImageResponse(
    (

      <div
        style={{
         background: colors.zinc[950],
         width: '100%',
         height: '100%',
         display: 'flex',
         flexDirection: 'column',
        }}
      >
       <img src={productImageUrl} alt='' style={{width: '100%'}}/>
      </div>
    ),

    {
      ...size,
    }
  )
}