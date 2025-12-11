import { Code, Database, Layers, Server, Terminal } from "lucide-react"

export const personalDetails = {
    name: "Vamsi Kadaru",
    title: "Backend Engineer",
    tagline: "Building resilient distributed systems & scalable microservices.",
    bio: `Associate Software Engineer with strong backend experience in Java, Spring Boot, microservices, MongoDB, PostgreSQL, AWS, and CI/CD. Top performer working on production microservices supporting thousands of requests per minute. Experienced in debugging critical production issues, optimizing APIs, automating backend flows, and building resilient distributed systems.`,
    socials: {
        github: "https://github.com/vamsikadaru",
        linkedin: "https://linkedin.com/in/vamsikadaru",
        email: "vamsikadaru@gmail.com",
        other: [],
    },
}

export const skills = [
    {
        category: "Languages",
        items: ["Java", "JavaScript", "SQL", "HTML/CSS"],
        icon: Code,
    },
    {
        category: "Backend & Frameworks",
        items: ["Spring Boot", "Microservices", "RESTful APIs", "Hibernate", "Node.js"],
        icon: Server,
    },
    {
        category: "Databases",
        items: ["MongoDB", "PostgreSQL", "DB2", "Redis"],
        icon: Database,
    },
    {
        category: "DevOps & Cloud",
        items: ["AWS (Lambda, S3)", "Docker", "Kubernetes", "CI/CD Pipelines", "Git"],
        icon: Layers,
    },
    {
        category: "Tools & Concepts",
        items: ["Postman", "JIRA", "Agile", "DSA", "System Design", "Unit Testing"],
        icon: Terminal,
    },
]

export const experience = [
    {
        company: "Innominds",
        role: "Associate Software Engineer",
        duration: "Oct 2023 – Jul 2025",
        description: [
            "Built and optimized scalable backend services and microservices using Java & Spring Boot.",
            "Supported production systems handling thousands of requests per minute.",
            "Debugged issues by analyzing MongoDB data, fixing production bugs, improving reliability.",
            "Automated REST API triggers and optimized workflows.",
            "Created complex MongoDB queries to accelerate team productivity.",
            "Delivered seamless product experiences that improved customer journey end-to-end.",
        ],
    },
    {
        company: "CreditVidya (acquired by CRED)",
        role: "Technical Support Engineer (Client role)",
        duration: "Previous",
        description: [
            "Handled production debugging, API-level issue analysis, and rapid bug fixes.",
        ],
    },
]

export const projects = [
    {
        title: "Amazon-Clone Backend",
        tech: ["Spring Boot", "Docker", "PostgreSQL", "CI/CD"],
        description: "Production-style Spring Boot project with Dockerized DB, feature-branched Git workflow, PRs, and CI/CD.",
        links: {
            github: "https://github.com/vamsikadaru", // Placeholder if specific link not provided
            demo: "#",
        },
    },
    {
        title: "P2P Lending Platform",
        tech: ["Ethereum", "Smart Contracts", "Blockchain", "Solidity"],
        description: "Built P2P money-lending platform using Ethereum as collateral and smart contracts.",
        links: {
            github: "https://github.com/vamsikadaru",
            demo: "#",
        },
    },
    {
        title: "KYC Microservice",
        tech: ["Java", "Spring Boot", "Microservices"],
        description: "Designed and deployed robust KYC verification workflow for verifying user identities.",
        links: {
            github: "https://github.com/vamsikadaru",
            demo: "#",
        },
    },
]

export const publications = [
    {
        title: "in-Krypt",
        conference: "ICRASTEM-2K23",
        description: "Co-authored research paper on blockchain security and encryption mechanisms.",
        link: "#",
    },
]

export const education = [
    {
        degree: "MEng, Computer Science",
        school: "University of Cincinnati",
        details: "Scholarship Recipient",
    },
    {
        degree: "BTech IT",
        school: "VVIT",
        details: "GPA: 8.74",
    },
]
