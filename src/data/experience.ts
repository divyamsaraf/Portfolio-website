import type { Experience } from "@/lib/types";
export const experiences: Experience[] = [
  { id: 1, company: "Digital Dreams Technology", role: "Software Developer", start_date: "2020-08", end_date: "2022-04", location: "Remote", description: "Designed and implemented microservices architecture", bullets: ["Designed microservices (Java 11, Spring Boot).", "Implemented CI/CD; reduced bugs."], tech: ["Java", "Spring Boot", "AWS", "SQL"] },
  { id: 2, company: "LYKAS, Inc.", role: "Software Engineer", start_date: "2022-05", end_date: "", location: "", description: "Built real-time chat and admin dashboards", bullets: ["Built real-time chat and admin dashboards."], tech: ["Python", "Django", "Vue"] },
  { id: 3, company: "CSUF", role: "M.S. Software Engineering", start_date: "2019", end_date: "2024", location: "", description: "Master's degree in Software Engineering", bullets: ["Master's degree in Software Engineering."], tech: [] }
];
