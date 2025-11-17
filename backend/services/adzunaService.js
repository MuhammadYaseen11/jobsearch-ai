import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function searchAdzuna(query, location) {
  try {
    const url = `https://api.adzuna.com/v1/api/jobs/gb/search/1`;

    const params = {
      app_id: process.env.ADZUNA_APP_ID,
      app_key: process.env.ADZUNA_APP_KEY,
      what: query,
      where: location,
    };

    const response = await axios.get(url, { params });

    return response.data.results.map((job) => ({
      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name,
      salary: job.salary_min
        ? `£${job.salary_min} - £${job.salary_max}`
        : "Not provided",
      url: job.redirect_url,
      source: "Adzuna",
    }));
  } catch (error) {
    console.error("Adzuna API error:", error.message);
    return [];
  }
}
