import Image from "next/image";

type Props = {
  size?: number;
};

const LoadingLogo = ({ size = 100 }: Props) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Image
        src={"/logo.svg"}
        alt="logo"
        className="animate-pulse duration-700"
        width={size}
        height={size}
      ></Image>
    </div>
  );
};

export default LoadingLogo;
