import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function searchReed(query, location) {
  try {
    const url = `https://www.reed.co.uk/api/1.0/search?keywords=${encodeURIComponent(
      query
    )}&location=${encodeURIComponent(location)}`;

    // Reed API requires Basic Auth
    const authHeader = Buffer.from(
      `${process.env.REED_API_USERNAME}:${process.env.REED_API_PASSWORD}`
    ).toString("base64");

    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${authHeader}`,
      },
    });

return response.data.results.map((job) => ({
  title: job.jobTitle,
  company: job.employerName,
  location: job.locationName,
  salary: job.minimumSalary
    ? `£${job.minimumSalary} - £${job.maximumSalary}`
    : "Not provided",
  url: job.jobUrl,
  source: "Reed",
}));

  } catch (error) {
    console.error("Reed API error:", error.message);
    return [];
  }
}
