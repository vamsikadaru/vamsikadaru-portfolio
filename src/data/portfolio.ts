import { Brain, Code, Database, Layers, Server, Terminal } from "lucide-react"

export const personalDetails = {
    name: "Vamsi Kadaru",
    title: "Backend Engineer",
    tagline: "Building resilient distributed systems & scalable microservices.",
    bio: `Hey! I’m Vamsi - a Backend Engineer who loves building real systems that make users’ lives smoother. I spend most of my time designing Spring Boot microservices, tuning databases, automating workflows, and debugging tricky production issues.
I care about writing clean, maintainable code and building systems that scale effortlessly. Whether it’s optimizing an API, improving user experience, or digging into MongoDB to solve an edge case, I enjoy turning complex problems into elegant solutions. Always learning, always improving, always building.`,
    socials: {
        github: "https://github.com/vamsikadaru",
        linkedin: "https://www.linkedin.com/in/vamsi-kadaru/",
        email: "vamsikadaru7@gmail.com",
        other: [],
    },
}

export const skills = [
    {
        category: "Languages",
        items: ["Java", "Python", "JavaScript", "C", "C++", "C#", "SQL"],
        icon: Code,
    },
    {
        category: "Frameworks & Libraries",
        items: ["Spring Boot", "Hibernate", "JPA", "RESTful APIs", "Microservices", "Kafka", "OAuth2", "React.js", "Node.js", "HTML", "CSS", "JWT"],
        icon: Server,
    },
    {
        category: "Databases",
        items: ["MongoDB", "MySQL", "PostgreSQL", "Oracle", "SQL Server", "Redis"],
        icon: Database,
    },
    {
        category: "DevOps & Cloud",
        items: ["AWS (EC2, S3, Lambda)", "Docker", "Kubernetes", "Jenkins", "CI/CD"],
        icon: Layers,
    },
    {
        category: "Tools & Practices",
        items: ["Git", "GitHub", "Jira", "Confluence", "Postman", "Swagger", "JUnit", "Mockito", "Design Patterns", "Agile/Scrum"],
        icon: Terminal,
    },
    {
        category: "Core CS Foundations",
        items: ["Data Structures & Algorithms (DSA)", "System Design"],
        icon: Brain,
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
        details: "GPA: 3.90",
        duration: "Aug 2025 - Apr 2027",
        location: "Cincinnati, OH, USA",
    },
    {
        degree: "BTech, Information Technology",
        school: "Vasireddy Venkatadri International Technological University",
        details: "GPA: 8.74",
        duration: "Aug 2019 - Apr 2023",
        location: "Nambur, AP, India",
    },
]
