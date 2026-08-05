import Image from "next/image";

type BookCardProps = {
  title: string;
  description: string;
  image: string;
  button: string;
  link: string;
};

export default function BookCard({
  title,
  description,
  image,
  button,
  link,
}: BookCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100">

      <div className="overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={title}
          width={400}
          height={550}
          className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      <div className="p-6">

        <h3 className="text-xl font-bold text-gray-900 min-h-[60px]">
          {title}
        </h3>

        <p className="text-gray-600 mt-4 leading-7 text-sm min-h-[100px]">
          {description}
        </p>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 w-full text-center bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition"
        >
          {button}
        </a>

      </div>

    </div>
  );
}