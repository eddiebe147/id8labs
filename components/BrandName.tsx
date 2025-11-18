export default function BrandName({ className = '' }: { className?: string }) {
  return (
    <span className={`font-[family-name:var(--font-crimson)] font-bold ${className}`}>
      <span className="text-gradient-orange">id8</span>Labs
    </span>
  )
}
