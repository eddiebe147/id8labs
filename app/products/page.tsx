import type { Metadata } from 'next'
import ProductsContent from './ProductsContent'

export const metadata: Metadata = {
  title: 'Products - ID8Labs',
  description: 'Professional tools for creators, AI orchestration for builders, and experiments because we can\'t help ourselves.',
}

export default function ProductsPage() {
  return <ProductsContent />
}
