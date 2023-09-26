interface Props {
  visible?: boolean;
}

const mobileMenus = [
  { title: "홈" },
  { title: "시리즈" },
  { title: "영화" },
  { title: "New! 요즘 대세 콘텐츠" },
  { title: "내가 찜한 리스트" },
  { title: "언어별로 찾아보기" },
];

export default function MobileMenu({ visible }: Props) {
  if (!visible) return null;

  return (
    <div
      className="bg-black/90 w-56 absolute top-5 left-[-75px] py-5 flex-col border-2 border-gray-900 border-t-white flex text-sm
      "
    >
      <div className="flex flex-col gap-6 ">
        {mobileMenus.map(({ title }) => (
          <div
            className="px-3 text-center text-gray-500 hover:text-white "
            key={title}
          >
            {title}
          </div>
        ))}
      </div>
    </div>
  );
}
