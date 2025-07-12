import Image from "next/image";
import Link from "next/link";

type SpotlightCardProps = {
  title: string;
  image: string;
  tag?: string;
  description: string;
  href?: string;
};

export default function SpotlightCard({
  title,
  image,
  tag,
  description,
  href = "#",
}: SpotlightCardProps) {
  return (
    <div className="bg-black text-white rounded-lg overflow-hidden shadow-lg border border-red-600">
      <div className="relative h-56 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        {tag && (
          <div className="absolute top-2 left-2 bg-red-600 text-xs px-2 py-1 rounded">
            {tag}
          </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
        <Link
          href={href}
          className="inline-block mt-2 text-red-500 hover:underline"
        >
          Learn more →
        </Link>
      </div>
    </div>
  );
}
