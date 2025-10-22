import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href='/'>
          <Image 
            src="/logo.png"
            alt="logo"
            width={70}
            height={38}
          />
        </Link>

        <p>2025 Fasilititas Umum Garut. All Rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer