import Link from "next/link";
import FacebookIcon from "./ui/icons/FacebookIcon";
import InstagramIcon from "./ui/icons/InstagramIcon";
import TwitterIcon from "./ui/icons/TwitterIcon";
import YoutubeIcon from "./ui/icons/YoutubeIcon";

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
    <div className="mx-auto max-w-[980px] px-[4%]">
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
      <div className="text-[11px] text-[#808080] mb-8 leading-2">
        <div>
          넷플릭스서비시스코리아 유한회사
          통신판매업신고번호:제2018-서울종로-0426호
        </div>
        <div>전화번호: 080-001-9587</div>
        <div>대표: 레지널드 숀 톰프슨</div>
        <div>이메일 주소: korea@netflix.com</div>
        <div>
          주소: 대한민국 서울특별시 종로구 우정국로 26, 센트로폴리스 A동 20층
          우편번호 03161
        </div>
        <div>사업자등록번호: 165-87-00119</div>
        <div>클라우드 호스팅: Amazon Web Services Inc.</div>
        <Link
          className="hover:underline"
          href="http://www.ftc.go.kr/bizCommPop.do?wrkr_no=1658700119"
        >
          공정거래위원회 웹사이트
        </Link>
      </div>
    </div>
  );
}
