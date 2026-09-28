import logoDark from '@/assets/images/logo.webp'
import logoLight from '@/assets/images/logo.webp'
import logoSm from '@/assets/images/logo.webp'
import Image from 'next/image'
import Link from 'next/link'

const LogoBox = () => {
  return (
    <div className="logo-box">
      <Link href="/" className="logo-dark">
        <Image src={logoSm} width={28} height={26} className="logo-sm" alt="logo sm" />
        <Image src={logoDark} height={100} width={150} className="logo-lg" alt="logo dark" />
      </Link>
      <Link href="/" className="logo-light">
        <Image src={logoSm} width={28} height={26} className="logo-sm" alt="logo sm" />
        <Image src={logoLight} height={10} width={50} className="logo-lg" alt="logo light" />
      </Link>
    </div>
  )
}

export default LogoBox
