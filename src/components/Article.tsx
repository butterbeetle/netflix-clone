type Props = {
  id: number;
  pathname: string;
};
const Article = ({ id, pathname }: Props) => {
  return (
    <div className=" bg-cyan-900 text-base flex items-center justify-center">
      I am the article {id}; my pathname is: {pathname}
    </div>
  );
};

export default Article;
