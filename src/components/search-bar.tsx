import { useForm } from "react-hook-form";
import { SearchForm } from "../pages/client/restaurants";
import { useHistory } from "react-router-dom";

export const SearchBar = () => {
  const { register, handleSubmit } = useForm<SearchForm>();
  const history = useHistory();
  const onSearchSubmit = ({ search }: SearchForm) => {
    history.push({
      pathname: "/search",
      search: `term=${search}`,
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSearchSubmit)}
      className="bg-gray-800 w-full py-32 flex items-center justify-center"
    >
      <input
        type="search"
        placeholder="검색어를 입력하세요."
        className="input rounded-md border-0 lg:w-[30%] w-2/3"
        {...register("search", {
          required: true,
          min: 1,
        })}
      />
    </form>
  );
};
