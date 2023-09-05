import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const NotFound = () => (
  <div className="mt-72 flex flex-col items-center justify-center">
    <Helmet>
      <title>Nuber-Eats | NotFound</title>
    </Helmet>
    <h2 className="text-2xl font-semibold mb-3">없는 페이지</h2>
    <h4 className="text-lg mb-5">페이지를 찾을 수 없습니다.</h4>
    <Link to="/" className="text-lime-600 hover:underline">
      홈으로 돌아가기
    </Link>
  </div>
);
