import axios from "axios";

const API_BASE_URL = "http://your-api-base-url";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const groupsApi = {
  getAll: () => api.get("/groups/"),
  create: (data: any) => api.post("/groups/", data),
  update: (id: number, data: any) => api.put(`/groups/${id}`, data),
  delete: (id: number) => api.delete(`/groups/${id}`),
};

export const levelsApi = {
  getAll: () => api.get("/levels/"),
};

export const branchesApi = {
  getAll: () => api.get("/branches/"),
};

export const subjectsApi = {
  getAll: () => api.get("/subjects/"),
};

export const teachersApi = {
  getAll: () => api.get("/teachers/"),
};

// export const fetchMonthFinance = async () => {
//   try {
//     const response = await axios.get(
//       "167.114.0.177:81/dashboard/financial-metrics/"
//     );
//     if (response.status === 200) {
//       return response.data;
//     } else {
//       console.error("Unexpected response:", response);
//       return [];
//     }
//   } catch (error) {
//     console.error("Error fetching prof list:", error);
//     return [];
//   }
// };

// export const fetchWeekFinance = async () => {
//   try {
//     const response = await axios.get(
//       "167.114.0.177:81/dashboard/weekly-financial-metrics/"
//     );
//     if (response.status === 200) {
//       return response.data;
//     } else {
//       console.error("Unexpected response:", response);
//       return [];
//     }
//   } catch (error) {
//     console.error("Error fetching prof list:", error);
//     return [];
//   }
// };

export const fetchGroupeList = async () => {
  try {
    const response = await axios.get("http://167.114.0.177:81/groupe_list/");
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Unexpected response:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching groupe list:", error);
    return [];
  }
};

export const fetchFiliereList = async () => {
  try {
    const response = await axios.get("http://167.114.0.177:81/filiere_list/");
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Unexpected response:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching groupe list:", error);
    return [];
  }
};

export const fetchNiveauList = async () => {
  try {
    const response = await axios.get("http://167.114.0.177:81/niveau_list/");
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Unexpected response:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching niveau list:", error);
    return [];
  }
};

export const fetchMatiereList = async () => {
  try {
    const response = await axios.get("http://167.114.0.177:81/matiere_list/");
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Unexpected response:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching matiere list:", error);
    return [];
  }
};

export const fetchTeachersList = async () => {
  try {
    const response = await axios.get(
      "http://167.114.0.177:81/professeur_list/"
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Unexpected response:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching prof list:", error);
    return [];
  }
};

export const createGroup = async (groupData) => {
  try {
    const response = await axios.post(
      "http://167.114.0.177:81/groupes/create/",
      groupData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 201) {
      console.log("Group created successfully:", response.data);
      return response.data;
    } else {
      console.error("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.error("Error creating group:", error);
    return null;
  }
};

export const updateGroup = async (groupData, id) => {
  try {
    const response = await axios.put(
      `http://167.114.0.177:81/groupes/update/${id}`,
      groupData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      console.log("Group Updated successfully:", response.data);
      return response.data;
    } else {
      console.error("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.error("Error creating group:", error);
    return null;
  }
};

export const createStudent = async (groupData) => {
  try {
    const response = await axios.post(
      "http://167.114.0.177:81/etudiants/create/",
      groupData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 201) {
      console.log("Etudiants created successfully:", response.data);
      return response.data;
    } else {
      console.error("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.error("Error creating group:", error);
    return null;
  }
};

export const updateStudent = async (groupData, id) => {
  try {
    const response = await axios.put(
      `http://167.114.0.177:81/etudiants/update/${id}`,
      groupData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 201) {
      console.log("Etudiants created successfully:", response.data);
      return response.data;
    } else {
      console.error("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.error("Error creating group:", error);
    return null;
  }
};

export const addStudentGrp = async (groupData) => {
  try {
    const response = await axios.post(
      `http://167.114.0.177:81/etudiants/add-to-group/`,
      groupData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 201) {
      console.log("Etudiants created successfully:", response.data);
      return response.data;
    } else {
      console.error("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.error("Error creating group:", error);
    return null;
  }
};

export const createTeacher = async (groupData) => {
  try {
    const response = await axios.post(
      "http://167.114.0.177:81/professeurs/create/",
      groupData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 201) {
      console.log("Professeurs created successfully:", response.data);
      return response.data;
    } else {
      console.error("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.error("Error creating group:", error);
    return null;
  }
};

export const updateTeacher = async (groupData, id) => {
  try {
    const response = await axios.put(
      `http://167.114.0.177:81/professeurs/update/${id}`,
      groupData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 201) {
      console.log("Professeurs created successfully:", response.data);
      return response.data;
    } else {
      console.error("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.error("Error creating group:", error);
    return null;
  }
};

export const createPayment = async (payData) => {
  try {
    const response = await axios.post(
      "http://167.114.0.177:81/payments/create/",
      payData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 201) {
      console.log("Payment created successfully:", response.data);
      return response.data;
    } else {
      console.error("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.error("Error creating group:", error);
    return null;
  }
};

export const updatePayment = async (payData, id) => {
  try {
    const response = await axios.put(
      `http://167.114.0.177:81/payments/${id}/update/`,
      payData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 201) {
      console.log("Payment created successfully:", response.data);
      return response.data;
    } else {
      console.error("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.error("Error creating group:", error);
    return null;
  }
};

export const createLevel = async (levData) => {
  try {
    const response = await axios.post(
      "http://167.114.0.177:81/niveaux/create/",
      levData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 201) {
      console.log("Level created successfully:", response.data);
      return response.data;
    } else {
      console.error("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.error("Error creating group:", error);
    return null;
  }
};
export const updateLevel = async (levData, id) => {
  try {
    const response = await axios.put(
      `http://167.114.0.177:81/niveaux/update/${id}`,
      levData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 201) {
      console.log("Level created successfully:", response.data);
      return response.data;
    } else {
      console.error("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.error("Error creating group:", error);
    return null;
  }
};

export const createBranch = async (branchData) => {
  try {
    const response = await axios.post(
      "http://167.114.0.177:81/filieres/create/",
      branchData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 201) {
      console.log("Branch created successfully:", response.data);
      return response.data;
    } else {
      console.error("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.error("Error creating group:", error);
    return null;
  }
};

export const updateBranch = async (branchData, id) => {
  try {
    const response = await axios.put(
      `http://167.114.0.177:81/filieres/update/${id}`,
      branchData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 201) {
      console.log("Branch created successfully:", response.data);
      return response.data;
    } else {
      console.error("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.error("Error creating group:", error);
    return null;
  }
};

export const createSub = async (subData) => {
  try {
    const response = await axios.post(
      "http://167.114.0.177:81/matieres/create/",
      subData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 201) {
      console.log("Subject created successfully:", response.data);
      return response.data;
    } else {
      console.error("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.error("Error creating group:", error);
    return null;
  }
};
export const updateSub = async (subData, id) => {
  try {
    const response = await axios.put(
      `http://167.114.0.177:81/matieres/update/${id}`,
      subData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 201) {
      console.log("Subject created successfully:", response.data);
      return response.data;
    } else {
      console.error("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.error("Error creating group:", error);
    return null;
  }
};

export default createGroup;
