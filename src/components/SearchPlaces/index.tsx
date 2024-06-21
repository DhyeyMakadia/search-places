import { useEffect, useState } from "react";
import SearchBox from "../SearchBox";
import { GetCities } from "../../services/search";
import CitiesTable from "../CitiesTable";
import { Cities } from "../../services/types/search";
import { useDebounce } from "../../hooks/Debounce";
import Pagination from "../Pagination";

const SearchPlaces = () => {
  const [searchText, setSearchText] = useDebounce();
  const [cities, setCities] = useState<Array<Cities>>([]);
  const [displayCities, setDisplayCities] = useState<Array<Cities>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emptyDataMessage, setEmptyDataMessage] = useState("Start Searching");

  const getCitiesInformation = async () => {
    try {
      const { data } = await GetCities(searchText);
      setIsLoading(false);
      setEmptyDataMessage("No result found");
      setCities(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchText) {
      setIsLoading(true);
      getCitiesInformation();
    } else {
      setCities([]);
      setDisplayCities([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return (
    <div>
      <SearchBox setText={setSearchText} setIsLoading={setIsLoading} />
      <CitiesTable
        data={displayCities}
        isLoading={isLoading}
        emptyDataMessage={emptyDataMessage}
      />
      <Pagination data={cities} setData={setDisplayCities} />
    </div>
  );
};

export default SearchPlaces;
