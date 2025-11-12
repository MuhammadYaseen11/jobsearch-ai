const form = document.getElementById("jobForm");
const resultsDiv = document.getElementById("results");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = document.getElementById("query").value;
  const location = document.getElementById("location").value;

  resultsDiv.innerHTML = "<p>Loading jobs...</p>";

  try {
    const response = await fetch(`http://localhost:5000/api/jobs?query=${query}&location=${location}`);
    const jobs = await response.json();

    if (jobs.length === 0) {
      resultsDiv.innerHTML = "<p>No jobs found.</p>";
      return;
    }

    resultsDiv.innerHTML = jobs
      .map(
        (job) => `
        <div class="job-card">
          <h3>${job.title}</h3>
          <p><strong>${job.company}</strong> — ${job.location}</p>
          <p>${job.salary}</p>
          <a href="${job.url}" target="_blank">View Job ↗</a>
        </div>
      `
      )
      .join("");
  } catch (error) {
    console.error(error);
    resultsDiv.innerHTML = "<p>Something went wrong. Check console.</p>";
  }
});
