import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const { useAuthStore } = await import("@/store/authStore");
        const { refreshToken, setTokens, logout } = useAuthStore.getState();

        if (!refreshToken) {
          logout();
          window.location.href = "/auth/login";
          return Promise.reject(error);
        }

        const { data } = await axios.post(`${API_URL}/api/v1/auth/refresh`, {
          refresh_token: refreshToken,
        });

        setTokens(data.access_token, data.refresh_token, data.user);
        original.headers["Authorization"] = `Bearer ${data.access_token}`;
        return api(original);
      } catch {
        const { useAuthStore } = await import("@/store/authStore");
        useAuthStore.getState().logout();
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  }
);

// Sprint APIs
export const sprintApi = {
  list: (projectId: string) => api.get(`/api/v1/sprints/project/${projectId}`),
  get: (id: string) => api.get(`/api/v1/sprints/${id}`),
  create: (data: object) => api.post("/api/v1/sprints/", data),
  update: (id: string, data: object) => api.patch(`/api/v1/sprints/${id}`, data),
  start: (id: string) => api.post(`/api/v1/sprints/${id}/start`),
  complete: (id: string) => api.post(`/api/v1/sprints/${id}/complete`),
  aiPlan: (data: object) => api.post("/api/v1/sprints/ai-plan", data),
  retrospective: (id: string, feedback?: string[]) => api.post(`/api/v1/sprints/${id}/retrospective`, feedback),
};

// Backlog APIs
export const backlogApi = {
  list: (projectId: string, params?: object) => api.get(`/api/v1/backlog/project/${projectId}`, { params }),
  get: (id: string) => api.get(`/api/v1/backlog/${id}`),
  create: (data: object) => api.post("/api/v1/backlog/", data),
  update: (id: string, data: object) => api.patch(`/api/v1/backlog/${id}`, data),
  delete: (id: string) => api.delete(`/api/v1/backlog/${id}`),
  aiPrioritize: (projectId: string, goals?: string) =>
    api.post(`/api/v1/backlog/ai-prioritize?project_id=${projectId}${goals ? `&product_goals=${encodeURIComponent(goals)}` : ""}`),
};

// Meeting APIs
export const meetingApi = {
  list: (projectId: string) => api.get(`/api/v1/meetings/project/${projectId}`),
  create: (data: object) => api.post("/api/v1/meetings/", data),
  analyzeText: (data: object) => api.post("/api/v1/meetings/analyze-text", null, { params: data }),
  getSummary: (meetingId: string) => api.get(`/api/v1/meetings/${meetingId}/summary`),
  createJiraTasks: (meetingId: string, projectKey: string) =>
    api.post(`/api/v1/meetings/${meetingId}/create-jira-tasks?project_key=${projectKey}`),
  uploadTranscript: (meetingId: string, file: File) => {
    const form = new FormData();
    form.append("file", file);
    return api.post(`/api/v1/meetings/${meetingId}/upload-transcript`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

// Analytics APIs
export const analyticsApi = {
  overview: (projectId: string, days?: number) =>
    api.get(`/api/v1/analytics/project/${projectId}/overview`, { params: { days } }),
  teamPerformance: (projectId: string) =>
    api.get(`/api/v1/analytics/project/${projectId}/team-performance`),
};

// Reports APIs
export const reportsApi = {
  generate: (projectId: string, type?: string) =>
    api.post(`/api/v1/reports/generate?project_id=${projectId}&report_type=${type || "weekly"}`),
  list: (projectId: string) => api.get(`/api/v1/reports/project/${projectId}`),
  get: (id: string) => api.get(`/api/v1/reports/${id}`),
};

// Chatbot APIs
export const chatbotApi = {
  chat: (data: object) => api.post("/api/v1/chatbot/chat", data),
  ingest: (data: object) => api.post("/api/v1/chatbot/ingest-documents", data),
};

// Jira APIs
export const jiraApi = {
  createTicket: (data: object) => api.post("/api/v1/jira/tickets", data),
  bulkCreate: (data: object) => api.post("/api/v1/jira/tickets/bulk", data),
  getIssues: (projectKey: string) => api.get(`/api/v1/jira/projects/${projectKey}/issues`),
  getBoards: (projectKey: string) => api.get(`/api/v1/jira/projects/${projectKey}/boards`),
};

export default api;
