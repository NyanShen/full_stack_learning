import Image from 'next/image';

export default function Test() {
  return (
    <main>
      <header className="sticky flex justify-between items-center border-b-2 border-gray-100 px-4 py-2 bg-white">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            width={40}
            height={40}
            alt="web logo"
            className="rounded-full mr-2"
          />
          <span className="text-slate-500 italic"> Nyan Shen</span>
        </div>
        <div></div>
        <div>
          <button className="px-3">personal</button>
        </div>
      </header>
    </main>
  );
}
