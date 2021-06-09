import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import CityService from "../services/CityService";

function CityFilter() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    let cityService = new CityService();
    cityService.getCities().then((result) => setCities(result.data.data));
  }, []);

  const cityOptions = [{ key: 0, value: null, text: "Şehir Seç" }];

  cities.forEach((city) => {
    cityOptions.push({
      key: city.id,
      value: city.id,
      text: city.cityName,
    });
  });

  return (
    <div>
        <Dropdown
          className="mt-3"
          placeholder="Şehir Seç"
          fluid
          search
          selection
          options={cityOptions}
        />
    </div>
  );
}

export default CityFilter;
