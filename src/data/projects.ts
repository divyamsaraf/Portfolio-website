import type { Project } from "@/lib/types";
export const projects: Project[] = [
  { id: 1, title: "RetailOps Pro", slug: "retailops-pro", description: "Inventory & order management platform.", long_description: "Built microservices for inventory, orders and invoices.", tech_stack: ["Java", "Spring Boot", "AWS", "React"], tags: ["Full Stack"], github_url: "", live_url: "", screenshot: "", featured: true, date: "2023-06-15" },
  { id: 2, title: "LYKAS Chat", slug: "lykas-chat", description: "Real-time chat for advisory platform.", long_description: "", tech_stack: ["Python", "Django", "Vue"], tags: ["Realtime"], github_url: "", live_url: "", screenshot: "", featured: false, date: "2023-01-10" }
];
