import type { Mission, Role, DifficultyLevel } from "./types"

// ---- Red Team Missions ----
export const redTeamMissions: Mission[] = [
  {
    id: "red-1",
    title: "Web Application Vulnerability Assessment",
    description: "Identify and exploit vulnerabilities in a corporate web application",
    briefing: `As part of a contracted security assessment, you've been tasked with identifying vulnerabilities in Acme Corp's customer portal.

Your goal is to discover and demonstrate security flaws that could be exploited by malicious actors. Remember, this is an authorized penetration test - you must follow ethical guidelines and avoid causing damage to production systems.

The customer portal is a critical application that handles sensitive customer data. Your findings will help Acme Corp improve their security posture before a real attacker can exploit these vulnerabilities.`,
    role: "red",
    difficulty: "beginner",
    objectives: [
      { id: "r1-obj1", description: "Perform reconnaissance on the web application", completed: false },
      { id: "r1-obj2", description: "Identify at least two vulnerabilities", completed: false },
      { id: "r1-obj3", description: "Demonstrate a proof-of-concept exploit for one vulnerability", completed: false },
      { id: "r1-obj4", description: "Document findings and recommend remediation steps", completed: false, ethicalImplications: "Proper documentation helps the organization fix vulnerabilities" },
    ],
    scenarios: [
      {
        id: "r1-s1",
        title: "Initial Access",
        description: "You've discovered a login page for the customer portal. How do you proceed?",
        completed: false,
        choices: [
          {
            id: "r1-s1-c1",
            text: "Attempt SQL injection on the login form",
            ethicsImpact: -2,
            detectionRiskImpact: 5,
            technicalScoreImpact: 3,
            consequence: "You attempt SQL injection and find the login form is vulnerable. This could expose customer data.",
            completesObjectives: ["r1-obj1", "r1-obj2"],
            nextScenarioId: "r1-s2"
          },
          {
            id: "r1-s1-c2",
            text: "Use a directory scanner to find hidden pages",
            ethicsImpact: 0,
            detectionRiskImpact: 2,
            technicalScoreImpact: 5,
            consequence: "Your scan reveals several hidden administrative pages that aren't properly protected.",
            completesObjectives: ["r1-obj1", "r1-obj2"],
            nextScenarioId: "r1-s2"
          },
          {
            id: "r1-s1-c3",
            text: "Try common username/password combinations",
            ethicsImpact: -1,
            detectionRiskImpact: 3,
            technicalScoreImpact: 2,
            consequence: "After several attempts, you find that 'admin/admin123' works. This is a serious security issue.",
            completesObjectives: ["r1-obj1", "r1-obj2"],
            nextScenarioId: "r1-s2"
          },
        ],
      },
      {
        id: "r1-s2",
        title: "Vulnerability Exploitation",
        description: "You've identified a potential Cross-Site Scripting (XSS) vulnerability in the customer feedback form. How do you proceed?",
        completed: false,
        requiredObjectives: ["r1-obj2"],
        choices: [
          {
            id: "r1-s2-c1",
            text: "Insert a harmless alert script to prove the vulnerability exists",
            ethicsImpact: 5,
            detectionRiskImpact: 1,
            technicalScoreImpact: 8,
            consequence: "Your test confirms the XSS vulnerability without causing harm. This is a responsible approach.",
            completesObjectives: ["r1-obj3"],
            nextScenarioId: "r1-s3"
          },
          {
            id: "r1-s2-c2",
            text: "Attempt to access cookies or session data through XSS",
            ethicsImpact: -5,
            detectionRiskImpact: 7,
            technicalScoreImpact: 5,
            consequence: "You successfully extract session cookies, which is beyond the scope of a simple proof-of-concept and could compromise user accounts.",
            completesObjectives: ["r1-obj3"],
            nextScenarioId: "r1-s3"
          },
          {
            id: "r1-s2-c3",
            text: "Skip testing this vulnerability and only report it as suspicious",
            ethicsImpact: 3,
            detectionRiskImpact: -2,
            technicalScoreImpact: -3,
            consequence: "You report the potential issue without confirmation. This is safe but provides less valuable information to the client.",
            completesObjectives: ["r1-obj3"],
            nextScenarioId: "r1-s3"
          },
        ],
      },
      {
        id: "r1-s3",
        title: "Sensitive Data Discovery",
        description: "While exploring the application, you discover an unprotected directory containing what appears to be backup files. How do you handle this?",
        completed: false,
        requiredObjectives: ["r1-obj1"],
        choices: [
          {
            id: "r1-s3-c1",
            text: "Download and examine the files to assess the severity of the exposure",
            ethicsImpact: -7,
            detectionRiskImpact: 4,
            technicalScoreImpact: 2,
            consequence: "The files contain sensitive customer information. Downloading this data exceeds the scope of your authorization and creates privacy concerns.",
            endsMission: true,
            failReason: "You exceeded your authorization and accessed sensitive data. Mission terminated for unethical behavior."
          },
          {
            id: "r1-s3-c2",
            text: "Note the existence of the files and their location without accessing the contents",
            ethicsImpact: 8,
            detectionRiskImpact: 0,
            technicalScoreImpact: 5,
            consequence: "You document the vulnerability without compromising sensitive data. This is the most ethical approach.",
            completesObjectives: ["r1-obj4"],
            nextScenarioId: "r1-s4"
          },

          {
            id: "r1-s3-c3",
            text: "Ignore this finding as it's likely intentional",
            ethicsImpact: 0,
            detectionRiskImpact: -3,
            technicalScoreImpact: -8,
            consequence: "You miss reporting a critical security issue that could lead to a data breach.",
            nextScenarioId: "r1-s4"
          },
        ],
      },
      {
        id: "r1-s4",
        title: "Ethical Crossroads",
        description: "The client forgot to disable a test admin account. Do you:",
        completed: false,
        choices: [
          {
            id: "r1-s4-c1",
            text: "Access the system and change settings as a demonstration",
            ethicsImpact: -10,
            detectionRiskImpact: 9,
            technicalScoreImpact: 3,
            consequence: "You break scope and risk harming production.",
            endsMission: true,
            failReason: "You performed an unauthorized action. Mission terminated and reported for unethical conduct."
          },
          {
            id: "r1-s4-c2",
            text: "Report the account's existence without using it",
            ethicsImpact: 12,
            detectionRiskImpact: 0,
            technicalScoreImpact: 2,
            consequence: "Client appreciates your integrity."
          },
        ],
      }
    ],
    initialCommands: ["help", "scan target", "objectives"],
  },
  {
    id: "red-2",
    title: "Network Penetration Test",
    description: "Identify and exploit vulnerabilities in a corporate network",
    briefing: `You've been contracted by GlobalTech Industries to perform a network penetration test on their internal infrastructure. This is a black-box test, meaning you have minimal information about their network layout.

Your mission is to identify potential entry points, discover vulnerabilities, and demonstrate how an attacker might gain unauthorized access to their systems. The client has authorized you to attempt exploitation, but with strict limitations to prevent disruption of their business operations.

This assessment will help GlobalTech understand their security posture and address weaknesses before they can be exploited by malicious actors.`,
    role: "red",
    difficulty: "intermediate",
    objectives: [
      { id: "r2-obj1", description: "Perform network reconnaissance and mapping", completed: false },
      { id: "r2-obj2", description: "Identify vulnerable services and systems", completed: false },
      { id: "r2-obj3", description: "Gain initial access to at least one system", completed: false },
      { id: "r2-obj4", description: "Attempt privilege escalation", completed: false },
      { id: "r2-obj5", description: "Document findings and recommend remediation steps", completed: false, ethicalImplications: "Proper documentation helps the organization fix vulnerabilities" },
    ],
    scenarios: [
      {
        id: "r2-s1",
        title: "Network Discovery",
        description: "You need to map out the client's network. How do you proceed?",
        completed: false,
        choices: [
          {
            id: "r2-s1-c1",
            text: "Run an aggressive scan to quickly identify all hosts and services",
            ethicsImpact: -5,
            detectionRiskImpact: 8,
            technicalScoreImpact: 3,
            consequence: "Your aggressive scan quickly maps the network but triggers several alerts and temporarily disrupts some services.",
            completesObjectives: ["r2-obj1"],
            nextScenarioId: "r2-s2"
          },
          {
            id: "r2-s1-c2",
            text: "Perform a slow, stealthy scan to avoid detection",
            ethicsImpact: 2,
            detectionRiskImpact: -3,
            technicalScoreImpact: 5,
            consequence: "Your careful approach takes longer but provides detailed information without alerting the security team.",
            completesObjectives: ["r2-obj1"],
            nextScenarioId: "r2-s2"
          },
          {
            id: "r2-s1-c3",
            text: "Focus only on common ports and services to minimize impact",
            ethicsImpact: 5,
            detectionRiskImpact: -1,
            technicalScoreImpact: -2,
            consequence: "You identify the most common services but miss some potential vulnerabilities on non-standard ports.",
            completesObjectives: ["r2-obj1"],
            nextScenarioId: "r2-s2"
          },
        ],
      },
      {
        id: "r2-s2",
        title: "Vulnerable Service",
        description: "You've discovered an outdated FTP server running on one of the hosts. How do you proceed?",
        completed: false,
        requiredObjectives: ["r2-obj1"],
        choices: [
          {
            id: "r2-s2-c1",
            text: "Attempt to exploit the known vulnerability in this FTP version",
            ethicsImpact: -2,
            detectionRiskImpact: 5,
            technicalScoreImpact: 7,
            consequence: "You successfully exploit the vulnerability and gain access to the system, proving the security risk.",
            completesObjectives: ["r2-obj2", "r2-obj3"],
            nextScenarioId: "r2-s3"
          },
          {
            id: "r2-s2-c2",
            text: "Try anonymous login and explore available files",
            ethicsImpact: 3,
            detectionRiskImpact: 2,
            technicalScoreImpact: 4,
            consequence: "Anonymous login is enabled, allowing you to access some files without exploitation. This is still a significant finding.",
            completesObjectives: ["r2-obj2", "r2-obj3"],
            nextScenarioId: "r2-s3"
          },
          {
            id: "r2-s2-c3",
            text: "Document the vulnerability without attempting to exploit it",
            ethicsImpact: 7,
            detectionRiskImpact: -5,
            technicalScoreImpact: -3,
            consequence: "You report the outdated service but without proof of exploitability, which may lead to the issue being prioritized incorrectly.",
            completesObjectives: ["r2-obj2"],
            nextScenarioId: "r2-s3"
          },
        ],
      },
      {
        id: "r2-s3",
        title: "Privilege Escalation",
        description: "You have user-level access to a system and discover it's missing several security patches. How do you proceed?",
        completed: false,
        requiredObjectives: ["r2-obj3"],
        choices: [
          {
            id: "r2-s3-c1",
            text: "Exploit a kernel vulnerability to gain administrator access",
            ethicsImpact: -4,
            detectionRiskImpact: 6,
            technicalScoreImpact: 8,
            consequence: "You successfully escalate privileges, demonstrating a critical security issue, but the exploitation technique could potentially cause system instability.",
            completesObjectives: ["r2-obj4"],
            nextScenarioId: "r2-s4"
          },
          {
            id: "r2-s3-c2",
            text: "Look for misconfigured services or stored credentials",
            ethicsImpact: 2,
            detectionRiskImpact: 1,
            technicalScoreImpact: 5,
            consequence: "You find credentials in a configuration file that grant you administrator access. This is a common security mistake that should be addressed.",
            completesObjectives: ["r2-obj4"],
            nextScenarioId: "r2-s4"
          },
          {
            id: "r2-s3-c3",
            text: "Document the missing patches without attempting privilege escalation",
            ethicsImpact: 6,
            detectionRiskImpact: -4,
            technicalScoreImpact: -2,
            consequence: "You provide detailed information about the missing patches but without demonstrating the actual risk of privilege escalation.",
            completesObjectives: ["r2-obj4"],
            nextScenarioId: "r2-s4"
          },
        ],
      },
      {
        id: "r2-s4",
        title: "Data Access",
        description: "With elevated privileges, you can access a database containing what appears to be customer information. How do you handle this?",
        completed: false,
        requiredObjectives: ["r2-obj4"],
        choices: [
          {
            id: "r2-s4-c1",
            text: "Extract a sample of records to prove data exposure",
            ethicsImpact: -8,
            detectionRiskImpact: 4,
            technicalScoreImpact: 2,
            consequence: "Extracting actual customer data exceeds the scope of your authorization and creates serious privacy and legal concerns.",
            endsMission: true,
            failReason: "You accessed customer data without consent. Mission terminated for serious ethical violation."
          },
          {
            id: "r2-s4-c2",
            text: "Take screenshots showing table structures but not actual data",
            ethicsImpact: 5,
            detectionRiskImpact: 1,
            technicalScoreImpact: 6,
            consequence: "You document the access issue without compromising customer privacy. This is both effective and ethical."
          },
          {
            id: "r2-s4-c3",
            text: "Note the existence of the database without accessing it",
            ethicsImpact: 8,
            detectionRiskImpact: -2,
            technicalScoreImpact: -1,
            consequence: "Your report mentions the database access but lacks details that would help the client understand the severity."
          },
        ],
      },
    ],
    initialCommands: ["help", "scan network", "objectives"],
  },
]

// ---- Blue Team Missions ----
export const blueTeamMissions: Mission[] = [
  {
    id: "blue-1",
    title: "Security Incident Response",
    description: "Investigate and respond to a potential security breach",
    briefing: `Acme Financial's security monitoring system has detected suspicious activity on their network over the past 24 hours. As a member of the incident response team, you've been called in to investigate the potential security breach and mitigate any damage.

Initial reports indicate unusual login attempts to the customer database server and unexpected outbound traffic. The company is concerned that sensitive financial data may have been compromised.

Your mission is to investigate the incident, determine if a breach occurred, contain any active threats, and provide recommendations to prevent similar incidents in the future.`,
    role: "blue",
    difficulty: "beginner",
    objectives: [
      { id: "b1-obj1", description: "Analyze security logs to identify suspicious activity", completed: false },
      { id: "b1-obj2", description: "Determine the scope and nature of the incident", completed: false },
      { id: "b1-obj3", description: "Contain the incident and block the attacker's access", completed: false },
      { id: "b1-obj4", description: "Recommend security improvements to prevent future incidents", completed: false, ethicalImplications: "Helping the organization improve their security posture is ethically responsible" },
    ],
    scenarios: [
      {
        id: "b1-s1",
        title: "Initial Investigation",
        description: "You need to begin investigating the potential security incident. Where do you start?",
        completed: false,
        requiresMiniGame: "log-analysis",
        choices: [
          {
            id: "b1-s1-c1",
            text: "Immediately shut down all servers to prevent further damage",
            ethicsImpact: -3,
            detectionRiskImpact: -5,
            technicalScoreImpact: -7,
            consequence: "Shutting down all systems causes business disruption and destroys volatile evidence that could help your investigation.",
            completesObjectives: ["b1-obj1"],
            nextScenarioId: "b1-s2"
          },
          {
            id: "b1-s1-c2",
            text: "Review security logs and network traffic patterns",
            ethicsImpact: 5,
            detectionRiskImpact: 2,
            technicalScoreImpact: 8,
            consequence: "Log analysis reveals multiple failed login attempts followed by a successful login from an unusual IP address. This is a strong indicator of compromise.",
            completesObjectives: ["b1-obj1"],
            nextScenarioId: "b1-s2"
          },
          {
            id: "b1-s1-c3",
            text: "Interview system administrators about recent changes",
            ethicsImpact: 3,
            detectionRiskImpact: 0,
            technicalScoreImpact: 2,
            consequence: "You learn that a recent software update was applied but no other significant changes were made. This is helpful context but doesn't directly identify the issue.",
            completesObjectives: ["b1-obj1"],
            nextScenarioId: "b1-s2"
          }
        ],
      },
      {
        id: "b1-s2",
        title: "Threat Assessment",
        description: "Your initial investigation shows signs of unauthorized access to the database server. How do you proceed?",
        completed: false,
        requiredObjectives: ["b1-obj1"],
        choices: [
          {
            id: "b1-s2-c1",
            text: "Analyze database queries to determine what data may have been accessed",
            ethicsImpact: 4,
            detectionRiskImpact: 3,
            technicalScoreImpact: 7,
            consequence: "Query logs show the attacker ran several SELECT statements accessing customer financial records. This helps you understand the scope of the breach.",
            completesObjectives: ["b1-obj2"],
            nextScenarioId: "b1-s3"
          },
          {
            id: "b1-s2-c2",
            text: "Check for installed backdoors or unauthorized accounts",
            ethicsImpact: 5,
            detectionRiskImpact: 5,
            technicalScoreImpact: 6,
            consequence: "You discover a new admin account was created during the suspicious login session. This is how the attacker planned to maintain access.",
            completesObjectives: ["b1-obj2"],
            nextScenarioId: "b1-s3"
          },
          {
            id: "b1-s2-c3",
            text: "Focus on identifying the initial attack vector",
            ethicsImpact: 3,
            detectionRiskImpact: 2,
            technicalScoreImpact: 4,
            consequence: "Further investigation reveals the attacker likely used a phishing email to steal credentials from a database administrator. This is useful for prevention but doesn't address the immediate threat.",
            completesObjectives: ["b1-obj2"],
            nextScenarioId: "b1-s3"
          },
        ],
      },
      {
        id: "b1-s3",
        title: "Incident Containment",
        description: "Now that you've identified unauthorized access, you need to contain the incident. What action do you take?",
        completed: false,
        requiredObjectives: ["b1-obj2"],
        choices: [
          {
            id: "b1-s3-c1",
            text: "Reset all user passwords across the organization",
            ethicsImpact: 0,
            detectionRiskImpact: 4,
            technicalScoreImpact: 3,
            consequence: "Mass password reset causes some business disruption but ensures compromised credentials can't be used again. However, it doesn't address other aspects of the breach.",
            completesObjectives: ["b1-obj3"],
            nextScenarioId: "b1-s4"
          },
          {
            id: "b1-s3-c2",
            text: "Block the suspicious IP addresses and remove unauthorized accounts",
            ethicsImpact: 7,
            detectionRiskImpact: 6,
            technicalScoreImpact: 8,
            consequence: "You block the attacker's known IPs, remove the backdoor account, and temporarily restrict database access to essential personnel only. This effectively contains the incident.",
            completesObjectives: ["b1-obj3"],
            nextScenarioId: "b1-s4"
          },
          {
            id: "b1-s3-c3",
            text: "Take the compromised server offline for forensic analysis",
            ethicsImpact: 2,
            detectionRiskImpact: 7,
            technicalScoreImpact: 5,
            consequence: "Taking the server offline prevents further damage but disrupts business operations. This might be an overreaction if other containment options are available.",
            completesObjectives: ["b1-obj3"],
            nextScenarioId: "b1-s4"
          },
        ],
      },
      {
        id: "b1-s4",
        title: "Security Recommendations",
        description: "The immediate threat has been contained. Now you need to recommend security improvements to prevent future incidents.",
        completed: false,
        requiredObjectives: ["b1-obj3"],
        choices: [
          {
            id: "b1-s4-c1",
            text: "Recommend implementing multi-factor authentication for all admin accounts",
            ethicsImpact: 8,
            detectionRiskImpact: -3,
            technicalScoreImpact: 7,
            consequence: "MFA would have prevented this attack even with compromised credentials. This is a high-impact security improvement.",
            completesObjectives: ["b1-obj4"]
          },
          {
            id: "b1-s4-c2",
            text: "Suggest regular security awareness training for all employees",
            ethicsImpact: 6,
            detectionRiskImpact: -2,
            technicalScoreImpact: 5,
            consequence: "Training would help employees recognize phishing attempts. This addresses the root cause but takes time to implement effectively.",
            completesObjectives: ["b1-obj4"]
          },
          {
            id: "b1-s4-c3",
            text: "Recommend upgrading the intrusion detection system",
            ethicsImpact: 4,
            detectionRiskImpact: -5,
            technicalScoreImpact: 6,
            consequence: "Better monitoring would help detect future attacks faster. This is a good technical solution but doesn't address the human factor.",
            completesObjectives: ["b1-obj4"]
          },
        ],
      },

    ],
    initialCommands: ["help", "monitor network", "objectives"],
  },
  {
    id: "blue-2",
    title: "Network Security Monitoring",
    description: "Monitor network traffic and detect potential threats",
    briefing: `TechCorp's security team has implemented a new network monitoring system, and you've been assigned to monitor network traffic for potential security threats. The company has been experiencing increased cyber attacks recently, and management wants to ensure their network is properly protected.

Your role is to analyze network traffic patterns, identify suspicious activities, and respond to potential threats before they can cause damage to the organization's systems and data.

This is a proactive security mission where your vigilance and quick response can prevent security incidents before they escalate.`,
    role: "blue",
    difficulty: "intermediate",
    objectives: [
      { id: "b2-obj1", description: "Monitor network traffic for anomalies", completed: false },
      { id: "b2-obj2", description: "Identify and classify potential threats", completed: false },
      { id: "b2-obj3", description: "Implement appropriate countermeasures", completed: false },
      { id: "b2-obj4", description: "Update security policies based on findings", completed: false, ethicalImplications: "Improving security policies protects the organization and its stakeholders" },
    ],
    scenarios: [
      {
        id: "b2-s1",
        title: "Unusual Traffic Pattern",
        description: "You notice an unusual spike in outbound traffic from the accounting department. How do you investigate?",
        completed: false,
        choices: [
          {
            id: "b2-s1-c1",
            text: "Immediately block all traffic from the accounting department",
            ethicsImpact: -2,
            detectionRiskImpact: 5,
            technicalScoreImpact: -5,
            consequence: "Blocking all traffic disrupts legitimate business operations and may not address the root cause of the issue.",
            completesObjectives: ["b2-obj1"],
            nextScenarioId: "b2-s2"
          },
          {
            id: "b2-s1-c2",
            text: "Analyze the traffic to determine its destination and content",
            ethicsImpact: 5,
            detectionRiskImpact: 3,
            technicalScoreImpact: 8,
            consequence: "Analysis reveals the traffic is going to an unknown external server and contains what appears to be sensitive financial data.",
            completesObjectives: ["b2-obj1", "b2-obj2"],
            nextScenarioId: "b2-s2"
          },
          {
            id: "b2-s1-c3",
            text: "Contact the accounting department to ask about their activities",
            ethicsImpact: 3,
            detectionRiskImpact: -2,
            technicalScoreImpact: 2,
            consequence: "The accounting team reports no unusual activities, suggesting this might be unauthorized data exfiltration.",
            completesObjectives: ["b2-obj1"],
            nextScenarioId: "b2-s2"
          },
        ],
      },
      {
        id: "b2-s2",
        title: "Suspicious Login Attempts",
        description: "Your monitoring system detects multiple failed login attempts from various IP addresses targeting the same user account. How do you respond?",
        completed: false,
        requiredObjectives: ["b2-obj2"],
        choices: [
          {
            id: "b2-s2-c1",
            text: "Temporarily lock the targeted user account",
            ethicsImpact: 4,
            detectionRiskImpact: 6,
            technicalScoreImpact: 5,
            consequence: "Locking the account prevents unauthorized access but may disrupt the legitimate user's work.",
            completesObjectives: ["b2-obj3"],
            nextScenarioId: "b2-s3"
          },
          {
            id: "b2-s2-c2",
            text: "Implement rate limiting and CAPTCHA for login attempts",
            ethicsImpact: 7,
            detectionRiskImpact: 4,
            technicalScoreImpact: 7,
            consequence: "Rate limiting slows down the attack while allowing legitimate users to continue working with minimal disruption.",
            completesObjectives: ["b2-obj3"],
            nextScenarioId: "b2-s3"
          },
          {
            id: "b2-s2-c3",
            text: "Block all IP addresses involved in the attack",
            ethicsImpact: 2,
            detectionRiskImpact: 8,
            technicalScoreImpact: 3,
            consequence: "Blocking IPs stops this attack but attackers can easily switch to new IP addresses, and you might block legitimate users.",
            completesObjectives: ["b2-obj3"],
            nextScenarioId: "b2-s3"
          },
        ],
      },
      {
        id: "b2-s3",
        title: "Malware Detection",
        description: "Your antivirus system has detected potential malware on several workstations. How do you handle this situation?",
        completed: false,
        requiredObjectives: ["b2-obj2"],
        choices: [
          {
            id: "b2-s3-c1",
            text: "Immediately isolate all affected workstations from the network",
            ethicsImpact: 6,
            detectionRiskImpact: 7,
            technicalScoreImpact: 6,
            consequence: "Isolation prevents malware spread but disrupts work for affected users. This is a balanced approach for containment.",
            completesObjectives: ["b2-obj3"],
            nextScenarioId: "b2-s4"
          },
          {
            id: "b2-s3-c2",
            text: "Run a full network scan to identify the scope of infection",
            ethicsImpact: 4,
            detectionRiskImpact: 2,
            technicalScoreImpact: 8,
            consequence: "The scan reveals the malware has spread to additional systems and is attempting to communicate with external command and control servers.",
            completesObjectives: ["b2-obj1", "b2-obj2"],
            nextScenarioId: "b2-s4"
          },
          {
            id: "b2-s3-c3",
            text: "Update antivirus definitions and run targeted scans",
            ethicsImpact: 3,
            detectionRiskImpact: -1,
            technicalScoreImpact: 4,
            consequence: "Updated scans catch some additional infections but may miss advanced persistent threats that use zero-day exploits.",
            completesObjectives: ["b2-obj3"],
            nextScenarioId: "b2-s4"
          },
        ],
      },
      {
        id: "b2-s4",
        title: "Policy Update",
        description: "Based on your monitoring activities, you need to recommend updates to the organization's security policies. What do you prioritize?",
        completed: false,
        requiredObjectives: ["b2-obj3"],
        choices: [
          {
            id: "b2-s4-c1",
            text: "Implement stricter access controls and user privilege management",
            ethicsImpact: 5,
            detectionRiskImpact: -4,
            technicalScoreImpact: 7,
            consequence: "Stricter access controls reduce the attack surface and limit the potential damage from compromised accounts.",
            completesObjectives: ["b2-obj4"],
          },
          {
            id: "b2-s4-c2",
            text: "Require regular security training and phishing simulation exercises",
            ethicsImpact: 8,
            detectionRiskImpact: -3,
            technicalScoreImpact: 6,
            consequence: "Training helps employees become the first line of defense against social engineering attacks.",
            completesObjectives: ["b2-obj4"],
          },
          {
            id: "b2-s4-c3",
            text: "Mandate the use of endpoint detection and response tools",
            ethicsImpact: 4,
            detectionRiskImpact: -6,
            technicalScoreImpact: 8,
            consequence: "EDR tools provide better visibility into endpoint activities and can detect advanced threats that traditional antivirus might miss.",
            completesObjectives: ["b2-obj4"],
          },
        ],
      },
    ],
    initialCommands: ["help", "monitor network", "objectives"],
  },
];

// ---- Aggregate Missions ----
export const allMissions: Mission[] = [...redTeamMissions, ...blueTeamMissions]

// ---- Helper Functions ----
export function getMissionById(id: string): Mission | undefined {
  return allMissions.find(mission => mission.id === id)
}
export function getMissionsByRole(role: Role): Mission[] {
  return allMissions.filter(mission => mission.role === role)
}
export function getMissionsByDifficulty(difficulty: DifficultyLevel): Mission[] {
  return allMissions.filter(mission => mission.difficulty === difficulty)
}
