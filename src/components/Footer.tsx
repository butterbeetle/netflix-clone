import FacebookIcon from "./ui/icons/FacebookIcon";
import InstagramIcon from "./ui/icons/InstagramIcon";
import TwitterIcon from "./ui/icons/TwitterIcon";
import YoutubeIcon from "./ui/icons/YoutubeIcon";
import FooterInfo from "./ui/FooterInfo";

const footerMenu = [
  { title: "화면 해설" },
  { title: "고객 센터" },
  { title: "기프트카드" },
  { title: "미디어 센터" },
  { title: "투자 정보(IR)" },
  { title: "입사 정보" },
  { title: "이용 약관" },
  { title: "개인정보" },
  { title: "법적 고지" },
  { title: "쿠키 설정" },
  { title: "회사 정보" },
  { title: "문의하기" },
];

export default function Footer() {
  return (
    <div className="relative mx-auto max-w-[980px] px-[4%] pb-8 ">
      <div className="text-white flex gap-8 mt-[70px] mb-6 ">
        <FacebookIcon size={25} className={"cursor-pointer"} />
        <InstagramIcon size={25} className={"cursor-pointer"} />
        <TwitterIcon size={25} className={"cursor-pointer"} />
        <YoutubeIcon size={25} className={"cursor-pointer"} />
      </div>
      <ul className="text-[#808080] text-sm flex flex-wrap w-full select-none mb-4">
        {footerMenu.map(({ title }) => (
          <li
            key={title}
            className="w-1/2 md:w-1/4 mb-4 hover:underline cursor-pointer"
          >
            {title}
          </li>
        ))}
      </ul>
      <div className="mb-[20px]">
        <p className="text-sm border-2 border-[#808080] w-fit text-[#808080] hover:text-white transition p-1 cursor-pointer">
          서비스 코드
        </p>
      </div>
      <FooterInfo />
    </div>
  );
}
