import Link from "next/link";

export default function FooterInfo() {
  return (
    <div className="text-[11px] text-[#808080] leading-2">
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
  );
}
