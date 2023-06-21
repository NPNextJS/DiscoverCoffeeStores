import Image from "next/image";
import Link from "next/link";

const Card = (props) => {
  const { name, imgUrl, href } = props;

  return (
    <Link href={href} legacyBehavior>
      <a>
        <h2>{name}</h2>
        <Image src={imgUrl} width={260} height={160} />
      </a>
    </Link>
  );
};

export default Card;
