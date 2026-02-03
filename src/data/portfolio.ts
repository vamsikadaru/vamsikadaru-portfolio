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
        company: "Innominds Software Pvt. Ltd. (Deputed to CRED)",
        role: "Associate Software Engineer",
        duration: "Oct 2023 – Jul 2025",
        location: "Hyderabad, India",
        description: [
            "Designed and deployed a KYC microservice using Java & Spring Boot, integrating third-party identity APIs that reduced average onboarding time from 2 days to under 4 hours (≈90%), and eliminated 20+ manual verification steps per user and documented APIs with Swagger.",
            "Refactored and indexed MongoDB and PostgreSQL queries, reducing database latency by 40% and boosting API throughput by 50%, ensuring high-performance, scalable backend services.",
            "Implemented Apache Kafka for event-driven data pipelines, enabling real-time synchronization across services handling thousands of requests per minute, monitoring with Prometheus, Grafana for API performance.",
            "Delivered secure, production-ready payment integrations for Google Pay, leveraging AWS (EC2, S3, Lambda), Docker, and Kubernetes with automated CI/CD pipelines that reduced deployment time from hours to minutes.",
            "Improved code reliability by raising test coverage from 55% to 85% through unit and integration testing (JUnit, Mockito), decreasing production incidents by 35% in 6 months.",
        ],
    },
    {
        company: "Soul AI",
        role: "Gen AI Model Trainer (Freelance)",
        duration: "Apr 2025 – May 2025",
        location: "Remote",
        description: [
            "Enhanced model precision and reduced hallucination rates by 30% through Reinforcement Learning from Human Feedback (RLHF) and fine-tuned NLP pipelines.",
            "Collaborated cross-functionally to monitor and fine-tune model performance, contributing to faster and more consistent production releases.",
        ],
    },
    {
        company: "Virtusa Consulting Services Pvt. Ltd.",
        role: "Software Engineer Intern",
        duration: "Mar 2023 – Jun 2023",
        location: "Remote",
        description: [
            "Built file-driven ingestion services using Node.js and TypeScript to process files from SFTP, parse large payloads into individual records, and route them dynamically to backend workflows, monitored throughput and failures via Splunk and New Relic.",
            "Designed transactional backend workflows with multiple processing steps, external API integrations, and SQL persistence & enabled traceability, automated recovery, and observed execution time (≈3s/record) and <0.1% failure rate via New Relic metrics and distributed tracing.",
            "Implemented human-in-the-loop pause/resume via a React.js operational UI, allowing decision review and workflow resumption, reducing manual intervention by (≈70%).",
        ],
    },
]

export const projects = [
    {
        title: "In-Krypt",
        tech: ["JavaScript", "ASP.NET", "c#", "Ethereum", "Smart Contracts", "Blockchain", "Solidity"],
        description: "In-Krypt is a decentralized peer-to-peer (P2P) money lending platform that utilizes blockchain technology, specifically Ethereum, as collateral.",
        links: {
            github: "https://github.com/vamsikadaru/In-Krypt",
            demo: "#",
        },
    },
    {
        title: "E-Commerce Backend",
        tech: ["Spring Boot", "Docker", "PostgreSQL", "CI/CD"],
        description: "Production-style Spring Boot project with Dockerized DB, feature-branched Git workflow, PRs, and CI/CD.",
        links: {
            github: "https://github.com/vamsikadaru/ecommerce", // Placeholder if specific link not provided
            demo: "#",
        },
    },
    {
        title: "Farm2Home",
        tech: ["PHP", "CSS", "Hack", "JavaScript", "CSS"],
        description: "Farm2Home is a socially relevant project aimed at eliminating the barriers between farmers and consumers. This platform allows consumers to purchase fresh farm products directly from farmers",
        links: {
            github: "https://github.com/vamsikadaru/Farm2Home",
            demo: "#",
        },
    },
    {
        title: "The-IT-Portal",
        tech: ["HTML", "CSS", "JavaScript"],
        description: "The IT PORTAL is a web-based platform designed specifically for the IT Department of a university. I",
        links: {
            github: "https://github.com/vamsikadaru/The-IT-Portal",
            demo: "#",
        },
    },
]

export const publications = [
    {
        title: "in-Krypt",
        conference: "International Conference on Science, Technology, Engineering, and Management (ICRASTEM-2K23)",
        description: "Co-authored research paper on blockchain security and encryption mechanisms. In-Krypt is a decentralized peer-to-peer (P2P) money lending platform that utilizes blockchain technology, specifically Ethereum, as collateral. This project aims to create a transparent, secure, and efficient lending environment by leveraging the immutable nature of blockchain.",
        link: "https://www.ijiemr.org/downloads/Volume-12/Issue-4",
    },
]

export const education = [
    {
        degree: "MEng, Computer Science",
        school: "University of Cincinnati",
        details: "GPA: 3.67",
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
