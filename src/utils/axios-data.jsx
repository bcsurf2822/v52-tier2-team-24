import axios from "axios";

const baseURL = "https://la-active-addresses.s3.us-east-2.amazonaws.com";

const datasets = {
  "A-E": `${baseURL}/a_e.json`,
  "F-N": `${baseURL}/f_m.json`,
  "N-Z": `${baseURL}/n_z.json`,
  "0-9": `${baseURL}/0_9.json`,
};

const getDatasetUrl = (streetName) => {
  if (!streetName || typeof streetName !== "string") {
    console.error("Invalid streetName input:", streetName);
    return null;
  }

  const firstChar = streetName[0];
  if (/[A-E]/.test(firstChar)) {
    return datasets["A-E"];
  } else if (/[F-N]/.test(firstChar)) {
    return datasets["F-N"];
  } else if (/[N-Z]/.test(firstChar)) {
    return datasets["N-Z"];
  } else if (/\d/.test(firstChar)) {
    return datasets["0-9"];
  }
};

export const searchAddress = async (address) => {
  const { house_number, street_name, zip_code } = address;
  const datasetUrl = getDatasetUrl(street_name);
  console.log("URL", datasetUrl);
  if (!datasetUrl) {
    console.error("Please Enter a valid los angelos address");
    return;
  }

  try {
    console.log("To Res");
    const response = await axios.get(datasetUrl);
    console.log("Response", response);
    const data = response.data;

    const results = data.filter(
      (item) =>
        item.house_number === house_number &&
        item.street_name === street_name &&
        item.zip_code === zip_code
    );

    if (results.length > 0) {
      console.log("Address Found:", results);
      return results
    } else {
      console.log("Address Not Found in Dataset");
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};
