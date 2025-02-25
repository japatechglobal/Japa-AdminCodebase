const base = "https://server.japatalent.com/japa/v1/";
// const base = "http://localhost:2000/japa/v1/";
// / japa / v1
// https://server.japatalent.com/
export const fetchUsers = async () => {
  const response = await fetch(`${base}admin/users`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  // Destructure data
  const { message, users, total_pages, current_page } = data;
  return {
    message,
    users,
    total_pages,
    current_page,
  }; // Return destructured data
};

export const fetchStats = async () => {
  const response = await fetch(`${base}admin/stats`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

export const fetchCourses = async () => {
  const response = await fetch(`${base}admin/courses`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  const { courses, total_pages, current_page } = data;
  return {
    courses,
    total_pages,
    current_page,
  };
};
export const fetchjobs = async () => {
  const response = await fetch(`${base}admin/jobs`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  const { jobs, total_pages, current_page } = data;
  return {
    jobs,
    total_pages,
    current_page,
  };
};

export const fetchTalents = async () => {
  const tokks = JSON.parse(sessionStorage.getItem("tokken")).split(" ")[1];
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokks}`,
    },
  };
  const response = await fetch(`${base}admin/talents`, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  const { talents, total_pages, current_page } = data;
  return {
    talents,
    total_pages,
    current_page,
  };
};

export const postCourse = async (data) => {
  const tokks = JSON.parse(sessionStorage.getItem("tokken")).split(" ")[1];
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokks}`,
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(`${base}admin/postcourse`, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();
    console.log("Success:", responseData); // Handle the response data
    return responseData;
  } catch (error) {
    console.error("Error:", error); // Handle any errors
  }
};

export const postJobs = async (data) => {
  const tokks = JSON.parse(sessionStorage.getItem("tokken")).split(" ")[1];
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokks}`,
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(`${base}admin/postjob`, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();
    console.log("Success:", responseData); // Handle the response data
    return responseData;
  } catch (error) {
    console.error("Error:", error); // Handle any errors
  }
};

export const deleteCourse = async (_id) => {
  const tokks = JSON.parse(sessionStorage.getItem("tokken")).split(" ")[1];
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokks}`,
    },
    body: JSON.stringify(_id),
  };
  try {
    const response = await fetch(`${base}admin/deletecourse`, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();
    console.log("Success:", responseData); // Handle the response data
    return responseData;
  } catch (error) {
    console.error("Error:", error); // Handle any errors
  }
};

export const deleteJobs = async (_id) => {
  const tokks = JSON.parse(sessionStorage.getItem("tokken")).split(" ")[1];
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokks}`,
    },
    body: JSON.stringify(_id),
  };
  try {
    const response = await fetch(`${base}admin/deletejobs`, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();
    console.log("Success:", responseData); // Handle the response data
    return responseData;
  } catch (error) {
    console.error("Error:", error); // Handle any errors
  }
};
