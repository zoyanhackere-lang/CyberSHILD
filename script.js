/**
 * CyberSafe Student - Professional Cybersecurity Education Platform
 * JavaScript Engine (Vanilla ES6+)
 */

// ==========================================================================
// 1. DATA STORAGE & STATE MANAGERS
// ==========================================================================

const DEFAULT_STATE = {
  userName: "Zoyan",
  userLevel: "Cyber Guardian",
  xp: 1250,
  streak: 7,
  securityScore: 82,
  completedLessons: [1, 2, 3, 4, 5, 7, 8, 9],
  quizBestScore: 87,
  badges: ["beginner", "guardian", "phishing_hunter", "password_master", "privacy_defender"],
  theme: "dark",
  reducedMotion: false,
  checkupItems: [true, true, true, false, true, true, true, false, true, false],
  phishingCompleted: [],
  dailyChallengeDone: false,
  lastChallengeDate: ""
};

let appState = { ...DEFAULT_STATE };

function loadState() {
  try {
    const saved = localStorage.getItem("cybersafe_student_data");
    if (saved) {
      appState = { ...DEFAULT_STATE, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error("Failed to load state from localStorage", e);
  }
}

function saveState() {
  try {
    localStorage.setItem("cybersafe_student_data", JSON.stringify(appState));
  } catch (e) {
    console.error("Failed to save state to localStorage", e);
  }
}

// ==========================================================================
// 2. EDUCATIONAL CONTENT DATASETS
// ==========================================================================

// ACADEMY LESSONS (14 Lessons)
const LESSONS_DATA = [
  {
    id: 1,
    title: "What is Cybersecurity?",
    category: "Beginner",
    time: "3 min read",
    icon: "🛡️",
    desc: "Understand the fundamentals of protecting digital assets, networks, and personal identity online.",
    explanation: "Cybersecurity is the practice of protecting systems, networks, devices, and data from digital attacks (cyberattacks). These attacks usually aim to access, change, or destroy sensitive information, extort money from users, or interrupt normal business processes.",
    example: "Imagine leaving your front door unlocked with your wallet on the table. Cyberattacks are like digital thieves looking for unlocked doors in software.",
    tips: [
      "Always keep software and apps updated to patch security holes.",
      "Treat personal data like physical money—guard it closely.",
      "Never share passwords or secret pins with anyone."
    ],
    question: {
      text: "What is the primary goal of cybersecurity?",
      options: [
        "To make computers run faster",
        "To protect systems, networks, and data from digital attacks",
        "To replace antivirus software completely",
        "To monitor all private phone calls"
      ],
      correct: 1
    }
  },
  {
    id: 2,
    title: "What is Phishing?",
    category: "Beginner",
    time: "4 min read",
    icon: "🎣",
    desc: "Learn how scam artists manipulate users into handing over passwords or money via fake messages.",
    explanation: "Phishing is a social engineering attack where malicious actors impersonate trustworthy entities (like banks, tech support, or popular websites) via email, SMS, or social media to deceive victims into revealing sensitive credentials or clicking dangerous links.",
    example: "An email claiming 'Your Netflix subscription will be cancelled today! Click here to re-enter your credit card immediately!'",
    tips: [
      "Look out for urgent threats or high-pressure tactics.",
      "Inspect the exact sender email address, not just the display name.",
      "Hover over links to verify the actual destination URL."
    ],
    question: {
      text: "Which of the following is a classic indicator of a phishing email?",
      options: [
        "A calm update notice with no links",
        "An artificial sense of extreme urgency demanding immediate action",
        "A message from a confirmed saved contact",
        "A green padlock icon next to a website address"
      ],
      correct: 1
    }
  },
  {
    id: 3,
    title: "Strong Passwords",
    category: "Beginner",
    time: "4 min read",
    icon: "🔐",
    desc: "Master the art of creating unhackable, long, and memorable passphrases.",
    explanation: "Passwords are your first line of defense. Short or common passwords like '123456' or 'password' can be broken in seconds by automated brute-force tools. A strong password uses long length, a mixture of character types, and no dictionary words.",
    example: "'CorrectHorseBatteryStaple#' takes trillions of years to brute-force compared to 'P@ssword123'.",
    tips: [
      "Length beats complexity: Aim for 12 to 16+ characters.",
      "Use unique passphrases for every account.",
      "Never reuse your primary email password on other websites."
    ],
    question: {
      text: "Why is password length more effective than complex short passwords?",
      options: [
        "Short passwords take longer to type",
        "Each additional character exponentially increases the total possible combinations",
        "Length prevents websites from storing passwords",
        "Computers ignore uppercase letters"
      ],
      correct: 1
    }
  },
  {
    id: 4,
    title: "Two-Factor Authentication (2FA)",
    category: "Beginner",
    time: "4 min read",
    icon: "🔑",
    desc: "Add a crucial second layer of defense to lock down your accounts even if your password leaks.",
    explanation: "Two-Factor Authentication (2FA) or Multi-Factor Authentication (MFA) requires two distinct forms of verification before granting access: Something you know (password) + Something you have (authenticator app code or security key).",
    example: "When logging into Google, you type your password AND approve a prompt on your smartphone.",
    tips: [
      "Prefer Authenticator apps (like Google Authenticator) over SMS codes where possible.",
      "Store backup recovery codes in a safe offline location.",
      "Enable 2FA on email, banking, and social media first."
    ],
    question: {
      text: "What two authentication factors are combined in standard 2FA?",
      options: [
        "Two different passwords",
        "Something you know (password) and something you have (phone/app code)",
        "Two different email addresses",
        "Your username and your date of birth"
      ],
      correct: 1
    }
  },
  {
    id: 5,
    title: "Safe Browsing",
    category: "Beginner",
    time: "3 min read",
    icon: "🌐",
    desc: "Navigate the web safely, spot fake sites, and avoid drive-by downloads.",
    explanation: "Safe browsing involves verifying domain names, checking for encrypted HTTPS connections, keeping browser security features active, and avoiding questionable pop-ups or pirated software downloads.",
    example: "Noticing that 'gooogle.com' has three 'o's before entering your account details.",
    tips: [
      "Verify HTTPS and lock icons in your address bar.",
      "Use an ad blocker to block malicious popup ads (malvertising).",
      "Avoid downloading software from third-party illegal mirrors."
    ],
    question: {
      text: "What does HTTPS indicate on a website?",
      options: [
        "The website is 100% scam-free",
        "Your connection to the website is encrypted in transit",
        "The website is hosted by Google",
        "The website cannot store cookies"
      ],
      correct: 1
    }
  },
  {
    id: 6,
    title: "Social Engineering",
    category: "Beginner",
    time: "5 min read",
    icon: "🧠",
    desc: "Understand human hacking—how cybercriminals exploit psychology instead of technology.",
    explanation: "Social engineering relies on human manipulation. Attackers exploit emotions like fear, curiosity, greed, urgency, or helpfulness to trick victims into bypassing technical security controls.",
    example: "A caller posing as 'IT Support' asking you to read out your temporary login code.",
    tips: [
      "Be skeptical of unsolicited requests for help or information.",
      "Verify unexpected requests via a separate trusted channel.",
      "Remember: Real IT desks will never ask for your private password."
    ],
    question: {
      text: "Why do attackers use social engineering?",
      options: [
        "It is harder than writing malware",
        "Humans are often easier to trick than security software",
        "It requires high-speed supercomputers",
        "It only works on smart TVs"
      ],
      correct: 1
    }
  },
  {
    id: 7,
    title: "Malware Basics",
    category: "Beginner",
    time: "4 min read",
    icon: "🦠",
    desc: "Identify viruses, spyware, trojans, and ransomware threats.",
    explanation: "Malware (malicious software) includes viruses, worms, trojans, keyloggers, and ransomware designed to damage, spy on, or lock your computer files until a ransom is paid.",
    example: "Opening 'Invoice.exe' attached to an unexpected email and having all your photos encrypted.",
    tips: [
      "Never open double-extension attachments like '.pdf.exe'.",
      "Keep Antivirus or Microsoft Defender active and updated.",
      "Maintain offline backups of important documents."
    ],
    question: {
      text: "What type of malware encrypts your personal files and demands payment?",
      options: [
        "Spyware",
        "Adware",
        "Ransomware",
        "Rootkit"
      ],
      correct: 2
    }
  },
  {
    id: 8,
    title: "Online Privacy",
    category: "Beginner",
    time: "4 min read",
    icon: "🕵️",
    desc: "Protect your digital footprint and limit data tracking across apps.",
    explanation: "Online privacy is about controlling what personal data (location, search history, identity) you share with corporations, advertisers, and the public.",
    example: "Posting a photo of your boarding pass on social media exposes your full flight details and booking reference.",
    tips: [
      "Review social media privacy settings regularly.",
      "Avoid oversharing personal routines or real-time location.",
      "Use privacy-focused browsers or extensions."
    ],
    question: {
      text: "Why should you avoid posting photos of tickets or official IDs online?",
      options: [
        "They look blurry in photos",
        "Barcodes and details can be scanned or used for identity theft",
        "Social media sites auto-delete them",
        "It reduces your internet speed"
      ],
      correct: 1
    }
  },
  {
    id: 9,
    title: "Password Managers",
    category: "Intermediate",
    time: "5 min read",
    icon: "🗄️",
    desc: "Store hundreds of encrypted passwords securely behind one master password.",
    explanation: "A password manager is an encrypted digital vault that generates, stores, and auto-fills unique, strong passwords for all your online services.",
    example: "Using Bitwarden or 1Password so you only have to remember one single strong Master Password.",
    tips: [
      "Choose a reputable, audited password manager.",
      "Protect your master password with 2FA.",
      "Never save passwords in plain text text files or sticky notes."
    ],
    question: {
      text: "What is the main benefit of using a password manager?",
      options: [
        "It automatically pays your bills",
        "You can use unique, strong passwords for every site without memorizing them all",
        "It bypasses website logins completely",
        "It removes the need for 2FA"
      ],
      correct: 1
    }
  },
  {
    id: 10,
    title: "Secure Wi-Fi",
    category: "Intermediate",
    time: "4 min read",
    icon: "📡",
    desc: "Safely use public Wi-Fi networks in cafes, airports, and universities.",
    explanation: "Unsecured public Wi-Fi networks allow attackers on the same network to intercept unencrypted traffic or set up fake access points ('Evil Twin' attacks).",
    example: "Connecting to 'Free_Airport_WiFi' that was actually created by a hacker sitting nearby.",
    tips: [
      "Use a VPN (Virtual Private Network) on public networks.",
      "Disable 'Auto-Connect to open networks' on your phone.",
      "Avoid logging into sensitive banking sites on public Wi-Fi."
    ],
    question: {
      text: "What tool encrypts your internet traffic when using public Wi-Fi?",
      options: [
        "Ad Blocker",
        "Virtual Private Network (VPN)",
        "Cookie Cleaner",
        "Incognito Mode"
      ],
      correct: 1
    }
  },
  {
    id: 11,
    title: "Email Security",
    category: "Intermediate",
    time: "5 min read",
    icon: "📧",
    desc: "Inspect email headers, SPF records, and prevent account takeover.",
    explanation: "Email is the primary entry point for cyberattacks. Securing your email with 2FA, monitoring active sessions, and recognizing spoofed domains protects your digital identity.",
    example: "An email from 'service@paypa1.com' replacing the letter 'l' with the number '1'.",
    tips: [
      "Check email addresses closely for subtle typosquatting.",
      "Never click links in suspicious emails—type official URLs directly.",
      "Report phishing emails to your email provider."
    ],
    question: {
      text: "What is 'typosquatting' in domain names?",
      options: [
        "Typing a password too quickly",
        "Registering domain names with common misspellings of popular brands to trick victims",
        "Sending spam emails in all caps",
        "Using emojis in email subjects"
      ],
      correct: 1
    }
  },
  {
    id: 12,
    title: "Social Media Security",
    category: "Intermediate",
    time: "4 min read",
    icon: "📱",
    desc: "Lock down privacy settings and avoid social engineering scams.",
    explanation: "Cybercriminals mine social media profiles for personal information (pets' names, birth dates, school names) to guess security questions or craft convincing spear-phishing attacks.",
    example: "Quiz posts like 'Your superhero name is your mother's maiden name + your first pet's name!' tricking users into exposing security answers.",
    tips: [
      "Set social profiles to Private or Friends Only.",
      "Be wary of strange friend requests from existing contacts (cloned accounts).",
      "Avoid viral quizzes asking for personal details."
    ],
    question: {
      text: "Why are viral social media quizzes asking for personal history risky?",
      options: [
        "They use too much phone battery",
        "They gather answers to common security questions used for password recovery",
        "They install viruses on your SIM card",
        "They cost money to view"
      ],
      correct: 1
    }
  },
  {
    id: 13,
    title: "Data Protection & Backups",
    category: "Intermediate",
    time: "4 min read",
    icon: "💾",
    desc: "Implement the 3-2-1 backup strategy to survive hardware failures or ransomware.",
    explanation: "Data protection ensures your critical files are recoverable during disaster. The 3-2-1 rule states: Keep 3 copies of your data on 2 different media types, with 1 copy stored offsite.",
    example: "Having files saved on your laptop, an external hard drive, and encrypted cloud storage.",
    tips: [
      "Automate periodic cloud backups.",
      "Test restoring backups occasionally.",
      "Disconnect external backup drives when not in use."
    ],
    question: {
      text: "What does the '3-2-1' backup strategy stand for?",
      options: [
        "3 passwords, 2 emails, 1 phone",
        "3 copies of data, on 2 different media types, with 1 stored offsite",
        "3 minutes of scanning, 2 antivirus tools, 1 firewall",
        "3 backups made every 2 days for 1 year"
      ],
      correct: 1
    }
  },
  {
    id: 14,
    title: "Device Security",
    category: "Intermediate",
    time: "4 min read",
    icon: "💻",
    desc: "Secure smartphones, laptops, and smart home IoT devices.",
    explanation: "Securing hardware requires strong device passcodes, biometric screen locks, full-disk encryption (BitLocker/FileVault), and disabling automatic Bluetooth/Wi-Fi connections in public.",
    example: "Enabling 'Find My Device' and remote wipe capabilities on your phone in case it gets stolen.",
    tips: [
      "Use a 6-digit PIN or long passphrase for phone lock screens.",
      "Enable full-disk encryption on laptops.",
      "Never plug untrusted USB drives into your machine."
    ],
    question: {
      text: "What is the danger of plugging an unknown USB drive found in public into your computer?",
      options: [
        "It will drain your battery instantly",
        "It can execute malicious scripts or keyloggers automatically (USB drop attack)",
        "It deletes your operating system immediately",
        "It changes your desktop background"
      ],
      correct: 1
    }
  }
];

// PHISHING SCENARIOS (10 Scenarios)
const PHISHING_SCENARIOS = [
  {
    id: 1,
    senderName: "State Bank Security",
    senderEmail: "alerts@statebank-verify-security.com",
    subject: "URGENT: Your Account Has Been Suspended!",
    date: "10:42 AM",
    body: "Dear Customer,<br><br>We detected unauthorized login attempts from an unknown IP address. To restore immediate access to your account, you must verify your identity within 24 hours or your account will be permanently locked.<br><br>",
    linkText: "👉 Verify Account Immediately",
    isPhishing: true,
    warningSigns: [
      "Artificial extreme urgency & threat of suspension",
      "Generic greeting ('Dear Customer')",
      "Suspicious domain name ('statebank-verify-security.com' instead of official bank domain)",
      "Social engineering panic tactic"
    ]
  },
  {
    id: 2,
    senderName: "Global Courier Express",
    senderEmail: "tracking-no-reply@express-delivery-parcel.xyz",
    subject: "Delivery Attempt Failed - Package #849201",
    date: "08:15 AM",
    body: "Hello,<br><br>Your package could not be delivered today due to an incorrect address fee of $1.50. Please update your details and pay the fee online to reschedule delivery.<br><br>",
    linkText: "📦 Reschedule Delivery Now",
    isPhishing: true,
    warningSigns: [
      "Unusual domain extension (.xyz)",
      "Unsolicited request for payment/details for unknown package",
      "Classic parcel delivery scam template"
    ]
  },
  {
    id: 3,
    senderName: "GitHub Security",
    senderEmail: "noreply@github.com",
    subject: "[GitHub] Security advisory: New sign-in from Firefox on Linux",
    date: "Yesterday",
    body: "Hi Zoyan,<br><br>We noticed a new sign-in to your GitHub account from IP 192.0.2.45. If this was you, no action is needed. If you did not authorize this, please review your active sessions in account settings.<br><br>",
    linkText: "Review Account Security",
    isPhishing: false,
    warningSigns: [
      "Sent from exact official domain (@github.com)",
      "Addressed to user by name ('Zoyan')",
      "No high-pressure threat or demand for instant password entry",
      "Standard informative security notice"
    ]
  },
  {
    id: 4,
    senderName: "IT Support Desk",
    senderEmail: "support-admin@company-portal-login.info",
    subject: "Mandatory Password System Maintenance",
    date: "11:20 AM",
    body: "Attention Staff,<br><br>We are migrating our server databases today. All employees must log in below to confirm their current password and prevent email deletion.<br><br>",
    linkText: "🔐 Employee Login Portal",
    isPhishing: true,
    warningSigns: [
      "IT departments NEVER ask staff to enter passwords to 'prevent deletion'",
      "External suspicious domain ('company-portal-login.info')",
      "Urgency aimed at employee credentials"
    ]
  },
  {
    id: 5,
    senderName: "Cloud Drive Admin",
    senderEmail: "storage-alert@drive-cloud-quota.top",
    subject: "Warning: Your Cloud Storage is 99% Full!",
    date: "09:05 AM",
    body: "Your 15 GB cloud storage is completely exhausted. Incoming emails and files will be blocked starting today unless you claim 50 GB free bonus storage.<br><br>",
    linkText: "🎁 Claim 50GB Free Storage",
    isPhishing: true,
    warningSigns: [
      "Suspicious TLD (.top)",
      "Luring victim with 'Free Bonus Storage'",
      "Pressure tactic about blocking incoming emails"
    ]
  },
  {
    id: 6,
    senderName: "Google Account Team",
    senderEmail: "no-reply@accounts.google.com",
    subject: "Security alert: 2-Step Verification turned on",
    date: "3 days ago",
    body: "Hi Zoyan,<br><br>2-Step Verification was recently enabled for your Google Account zoyan@example.com. You can manage your security preferences anytime in your account settings.<br><br>",
    linkText: "Go to Google Account",
    isPhishing: false,
    warningSigns: [
      "Official Google domain (@accounts.google.com)",
      "Standard confirmation message without coercive demands",
      "Informational notice"
    ]
  },
  {
    id: 7,
    senderName: "National Tax Bureau",
    senderEmail: "refunds@tax-refund-gov-portal.com",
    subject: "Tax Refund Notification: $450.00 Available",
    date: "02:40 PM",
    body: "You are eligible to receive a tax refund of $450.00 from overpaid taxes. Please submit your bank card details to process the direct deposit.<br><br>",
    linkText: "💰 Claim Refund Direct Deposit",
    isPhishing: true,
    warningSigns: [
      "Government tax offices do NOT issue refunds via random email links asking for card details",
      "Fake government domain name",
      "Financial bait scam"
    ]
  },
  {
    id: 8,
    senderName: "University Admin Desk",
    senderEmail: "registrar@university.edu",
    subject: "Spring Semester Course Registration Schedule",
    date: "01:10 PM",
    body: "Dear Students,<br><br>The course registration portal for the upcoming semester will open next Monday at 9:00 AM. Please view the updated catalog on the university intranet.<br><br>",
    linkText: "View Course Catalog",
    isPhishing: false,
    warningSigns: [
      "Legitimate .edu domain",
      "Standard academic communication",
      "No credential harvesting links"
    ]
  },
  {
    id: 9,
    senderName: "StreamFlix Support",
    senderEmail: "billing@streamflix-update-billing.org",
    subject: "Payment Failed: Update Payment Method",
    date: "04:15 PM",
    body: "We were unable to process your monthly subscription fee. Your membership has been temporarily paused. Click below to update your credit card details.<br><br>",
    linkText: "💳 Update Credit Card Details",
    isPhishing: true,
    warningSigns: [
      "Fake brand name domain extension",
      "Attempting to harvest credit card details",
      "Classic subscription billing scam"
    ]
  },
  {
    id: 10,
    senderName: "CEO / School Principal",
    senderEmail: "principal.office.urgent@gmail.com",
    subject: "URGENT Task - Need Gift Cards for Event",
    date: "07:30 AM",
    body: "I am in an urgent meeting and cannot take calls. I need you to purchase 5 Google Play gift cards ($100 each) right away for an award presentation. Send me the codes immediately.<br><br>",
    linkText: "Reply to Principal",
    isPhishing: true,
    warningSigns: [
      "Executive Impersonation / Gift Card scam",
      "Sent from a free @gmail.com account instead of official organization domain",
      "Request for untraceable gift card codes"
    ]
  }
];

// QUIZ QUESTIONS (30 Questions)
const QUIZ_QUESTIONS = [
  { q: "What should you do if you receive an unexpected email asking for your password?", options: ["Send it immediately", "Delete/Report it as phishing", "Forward it to friends", "Reply asking why"], correct: 1, exp: "Legitimate organizations will never ask for your password via email." },
  { q: "Which password is the strongest?", options: ["password123", "Zoyan2025!", "blue-dragon-sky-789#", "12345678"], correct: 2, exp: "Long passphrases combining multiple distinct words and symbols offer maximum entropy." },
  { q: "What does 2FA stand for?", options: ["Two-Factor Authentication", "Two-Fast Access", "Dual File Format", "Digital Encryption"], correct: 0, exp: "Two-Factor Authentication requires two distinct identity signals to log in." },
  { q: "What is malware?", options: ["Hardware component", "Malicious software designed to harm or exploit devices", "Internet browser extension", "Antivirus program"], correct: 1, exp: "Malware encompasses viruses, ransomware, spyware, and trojans." },
  { q: "What is ransomware?", options: ["Software that plays loud ads", "Malware that locks/encrypts files until a ransom is paid", "Free antivirus tool", "Email spam tool"], correct: 1, exp: "Ransomware holds user files hostage using strong encryption algorithms." },
  { q: "Why is public Wi-Fi potentially unsafe?", options: ["It uses too much battery", "Traffic can be intercepted by attackers on the same network", "It deletes browser cookies", "It turns off Bluetooth"], correct: 1, exp: "Unencrypted public networks allow unauthenticated packet sniffing." },
  { q: "What indicator in the address bar shows an encrypted connection?", options: ["HTTPS and a padlock icon", "Red warning banner", "HTTP protocol tag", "Yellow exclamation point"], correct: 0, exp: "HTTPS uses TLS/SSL to encrypt network communication in transit." },
  { q: "What is social engineering in cybersecurity?", options: ["Building social media websites", "Manipulating humans into breaking security procedures", "Writing computer code in teams", "Designing computer chips"], correct: 1, exp: "Social engineering targets human psychology rather than technical flaws." },
  { q: "How often should you update your smartphone operating system?", options: ["Never", "Only when buying a new phone", "As soon as security updates are released", "Once every 5 years"], correct: 2, exp: "Security updates patch newly discovered vulnerabilities that hackers exploit." },
  { q: "What is a password manager?", options: ["A person who remembers passwords", "An encrypted application that generates and stores passwords securely", "A list written on paper", "A browser bookmark"], correct: 1, exp: "Password managers eliminate password reuse and memory fatigue safely." },
  { q: "What is spoofing?", options: ["Falsifying data (like an email address) to masquerade as a trusted entity", "Scanning for viruses", "Compressing large files", "Deleting temporary browser files"], correct: 0, exp: "Spoofing tricks victims into trusting fake communications." },
  { q: "Which of these is a red flag in a suspicious text message (Smishing)?", options: ["Message from a known saved contact", "Urgent request to click a shortened link to stop account closure", "Order confirmation with no links", "Weather update"], correct: 1, exp: "Smishing messages rely on panic and suspicious link redirects." },
  { q: "What is a Firewall?", options: ["A physical wall around a server room", "A network security system that monitors and filters traffic", "A program that speeds up internet", "A type of battery charger"], correct: 1, exp: "Firewalls block unauthorized incoming and outgoing network traffic." },
  { q: "What is Spear Phishing?", options: ["Phishing that targets thousands of people randomly", "Highly targeted phishing aimed at a specific individual or organization", "Phishing via voice calls", "Phishing on gaming consoles"], correct: 1, exp: "Spear phishing uses tailored personal details to trick specific targets." },
  { q: "What is Vishing?", options: ["Phishing conducted over voice phone calls", "Video phishing", "Virus scanning", "Virtual reality gaming"], correct: 0, exp: "Vishing (Voice Phishing) involves phone scammers impersonating authority figures." },
  { q: "Why should you avoid using the same password across multiple websites?", options: ["It takes longer to type", "If one site suffers a data breach, hackers will unlock all your accounts (Credential Stuffing)", "Websites will ban your IP", "Browser will crash"], correct: 1, exp: "Credential stuffing bots try leaked email/password pairs across hundreds of services." },
  { q: "What is a Keylogger?", options: ["A keyboard mechanic tool", "Malware that records every keystroke you type to steal credentials", "A device that fixes broken keys", "A typing speed test"], correct: 1, exp: "Keyloggers capture passwords, card numbers, and private messages stealthily." },
  { q: "What is the primary function of a VPN?", options: ["To make your graphics card faster", "To encrypt your internet connection and hide your IP address", "To stop all popups", "To store photos in the cloud"], correct: 1, exp: "VPNs create a secure encrypted tunnel between your device and remote servers." },
  { q: "What does MFA stand for?", options: ["Multi-Factor Authentication", "Master File Access", "Main Frame Architecture", "Mobile Format Adapter"], correct: 0, exp: "MFA requires multiple independent factors for login verification." },
  { q: "What is shoulder surfing?", options: ["Surfing near beach shoulders", "Directly observing someone's screen or keyboard to steal passwords", "Surfing the web while walking", "Sharing screen via Zoom"], correct: 1, exp: "Shoulder surfing is physical observation of sensitive input in public." },
  { q: "What should you do before clicking a link in an email?", options: ["Click it quickly", "Hover over the link to verify the true destination URL in the status bar", "Disable your firewall", "Turn off your monitor"], correct: 1, exp: "Hovering exposes hidden redirects and typosquatting domains." },
  { q: "What is a zero-day vulnerability?", options: ["A bug that takes zero days to fix", "A software security flaw known to attackers before the vendor has released a patch", "A virus that lasts zero days", "A free trial software"], correct: 1, exp: "Zero-day flaws are unpatched vulnerabilities exploited in the wild." },
  { q: "Why are browser cookies used?", options: ["To clean your computer screen", "To store session tokens, preferences, and tracking state on your device", "To speed up computer fans", "To protect against ransomware"], correct: 1, exp: "Cookies maintain login sessions but can be targeted for cookie hijacking." },
  { q: "What is a Trojan virus?", options: ["A virus from ancient Greece", "Malware disguised as legitimate or useful software", "An ad blocker", "A hardware cable"], correct: 1, exp: "Trojans trick users into executing harmful code wrapped in fake apps." },
  { q: "What is Data Encryption?", options: ["Compressing video files", "Encoding data into unreadable ciphertext so only key holders can read it", "Deleting old files permanently", "Backing up photos to USB"], correct: 1, exp: "Encryption safeguards data confidentiality at rest and in transit." },
  { q: "What should you do if your computer gets infected with ransomware?", options: ["Pay the ransom immediately", "Disconnect from the network/Wi-Fi instantly to stop it spreading", "Restart the PC 100 times", "Email the hacker"], correct: 1, exp: "Disconnecting stops ransomware from spreading across network shares." },
  { q: "What is a botnet?", options: ["A friendly chat robot", "A network of compromised devices controlled remotely by an attacker", "An internet service provider", "A web design template"], correct: 1, exp: "Botnets perform massive DDoS attacks or spam campaigns." },
  { q: "What is the safest way to dispose of an old hard drive or smartphone?", options: ["Throw it in standard trash", "Perform full-disk cryptographic wipe or physical destruction", "Delete files to recycling bin", "Format the drive once without encryption"], correct: 1, exp: "Simple deletion leaves recoverable raw data; physical or cryptographic wipe is required." },
  { q: "What is an Ad Blocker?", options: ["A setting on smart TVs", "Software that prevents online advertisements and malicious ad scripts from loading", "An email spam filter", "A password lock"], correct: 1, exp: "Ad blockers protect against malvertising attacks and intrusive tracking." },
  { q: "What is the best way to protect your social media account from takeover?", options: ["Use your pet's name as password", "Enable 2FA, use a unique long password, and keep profile private", "Never log out", "Post your phone number on your wall"], correct: 1, exp: "Combining strong passwords, 2FA, and privacy settings yields maximum safety." }
];

// SECURITY CHECKUP ITEMS (10 Items)
const CHECKUP_ITEMS = [
  { id: 0, text: "I use Multi-Factor Authentication (2FA) on all primary email & social accounts", points: 15 },
  { id: 1, text: "I use long, unique passwords for every separate website (no password reuse)", points: 15 },
  { id: 2, text: "My phone, laptop, and operating system are updated with the latest security patches", points: 10 },
  { id: 3, text: "I use a reputable password manager or encrypted vault", points: 10 },
  { id: 4, text: "I have a biometric screen lock or strong PIN on my mobile device", points: 10 },
  { id: 5, text: "I regularly maintain offline or encrypted cloud backups of my critical files", points: 10 },
  { id: 6, text: "I inspect URLs and sender addresses before clicking links in emails or texts", points: 10 },
  { id: 7, text: "I avoid logging into sensitive accounts when connected to open public Wi-Fi", points: 5 },
  { id: 8, text: "I review and restrict mobile app permissions (location, mic, camera) regularly", points: 10 },
  { id: 9, text: "I know how to identify and report suspicious phishing messages immediately", points: 5 }
];

// BADGES DEFINITIONS
const BADGES_LIST = [
  { id: "beginner", name: "🏅 Cyber Beginner", desc: "Completed your first Cybersecurity Academy lesson", requirement: "Complete 1 lesson" },
  { id: "guardian", name: "🛡️ Cyber Guardian", desc: "Reached 500 XP and demonstrated solid safety habits", requirement: "Reach 500 XP" },
  { id: "phishing_hunter", name: "🎣 Phishing Hunter", desc: "Mastered the Phishing Simulator with high precision", requirement: "Complete 3 phishing scenarios" },
  { id: "password_master", name: "🔐 Password Master", desc: "Analyzed password strength and generated a secure passphrase", requirement: "Use Password Tool" },
  { id: "privacy_defender", name: "🕵️ Privacy Defender", desc: "Completed Privacy and Safe Browsing training modules", requirement: "Complete 5 lessons" },
  { id: "champion", name: "🏆 Cyber Champion", desc: "Achieved an 80%+ score on the Cybersecurity Comprehensive Quiz", requirement: "Score 80%+ in Quiz" }
];

// DEMO LEADERBOARD
const LEADERBOARD_DATA = [
  { rank: 1, name: "Zoyan", level: "Cyber Champion", xp: 1250, badges: 5, isUser: true },
  { rank: 2, name: "Ahmed Raza", level: "Cyber Guardian", xp: 1100, badges: 4, isUser: false },
  { rank: 3, name: "Ali Khan", level: "Phishing Hunter", xp: 980, badges: 4, isUser: false },
  { rank: 4, name: "Hamza Sheikh", level: "Password Master", xp: 850, badges: 3, isUser: false },
  { rank: 5, name: "Sara Ahmed", level: "Cyber Novice", xp: 790, badges: 3, isUser: false }
];

// ==========================================================================
// 3. CORE LOGIC & EVENT HANDLERS
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  loadState();
  initThemeAndMotion();
  renderAllComponents();
  setupEventListeners();
});

function initThemeAndMotion() {
  document.documentElement.setAttribute("data-theme", appState.theme);
  if (appState.reducedMotion) {
    document.body.classList.add("reduced-motion");
  } else {
    document.body.classList.remove("reduced-motion");
  }
}

function renderAllComponents() {
  updateUserStatsHeader();
  renderDashboard();
  renderAcademy();
  renderPhishingSim();
  renderCheckupList();
  renderBadges();
  renderLeaderboard();
  renderDailyChallenge();
  updateProfileView();
}

function setupEventListeners() {
  // Navigation tabs
  document.querySelectorAll("[data-nav]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = btn.getAttribute("data-nav");
      switchSection(target);
      closeMobileMenu();
    });
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById("mobile-menu-btn");
  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      const mobileNav = document.getElementById("mobile-nav-drawer");
      if (mobileNav) mobileNav.classList.toggle("open");
    });
  }

  // Dark/Light theme toggle
  const themeBtn = document.getElementById("theme-toggle-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }

  // Competition Demo mode toggle
  const demoBtn = document.getElementById("demo-mode-btn");
  if (demoBtn) {
    demoBtn.addEventListener("click", openDemoModal);
  }
}

function switchSection(sectionId) {
  document.querySelectorAll(".app-section").forEach(sec => sec.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(nav => nav.classList.remove("active"));

  const targetSec = document.getElementById(`${sectionId}-section`);
  if (targetSec) targetSec.classList.add("active");

  document.querySelectorAll(`[data-nav="${sectionId}"]`).forEach(n => n.classList.add("active"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function closeMobileMenu() {
  const drawer = document.getElementById("mobile-nav-drawer");
  if (drawer) drawer.classList.remove("open");
}

function toggleTheme() {
  appState.theme = appState.theme === "dark" ? "light" : "dark";
  saveState();
  initThemeAndMotion();
  showToast(`Switched to ${appState.theme} mode`, "info");
}

function addXP(amount, reason) {
  appState.xp += amount;
  
  // Calculate level title based on XP
  if (appState.xp >= 1500) appState.userLevel = "Cyber Champion";
  else if (appState.xp >= 1000) appState.userLevel = "Cyber Guardian";
  else if (appState.xp >= 600) appState.userLevel = "Phishing Hunter";
  else if (appState.xp >= 300) appState.userLevel = "Password Master";
  else appState.userLevel = "Cyber Novice";

  checkBadgeUnlocks();
  saveState();
  updateUserStatsHeader();
  renderLeaderboard();
  showToast(`+${amount} XP Earned! (${reason})`, "success");
}

function updateUserStatsHeader() {
  document.querySelectorAll(".user-name-display").forEach(el => el.textContent = appState.userName);
  document.querySelectorAll(".user-level-display").forEach(el => el.textContent = appState.userLevel);
  document.querySelectorAll(".user-xp-display").forEach(el => el.textContent = appState.xp.toLocaleString());
  document.querySelectorAll(".user-streak-display").forEach(el => el.textContent = `${appState.streak} Days`);
  document.querySelectorAll(".user-score-display").forEach(el => el.textContent = `${appState.securityScore} / 100`);
}

// ==========================================================================
// 4. DASHBOARD RENDERER
// ==========================================================================

function renderDashboard() {
  // Update Safety Score Circle SVG stroke offset
  const progressCircle = document.getElementById("dash-score-progress");
  if (progressCircle) {
    const totalCircumference = 339.292;
    const scorePct = Math.min(100, Math.max(0, appState.securityScore));
    const offset = totalCircumference - (totalCircumference * (scorePct / 100));
    progressCircle.style.strokeDashoffset = offset;
  }

  const scoreVal = document.getElementById("dash-score-val");
  if (scoreVal) scoreVal.textContent = appState.securityScore;

  // Category progress bars
  const categoryBars = [
    { label: "Password Security", pct: 85, color: "var(--accent-cyan)" },
    { label: "Phishing Awareness", pct: 90, color: "var(--accent-blue)" },
    { label: "Privacy Protection", pct: 75, color: "var(--accent-purple)" },
    { label: "Device Security", pct: 80, color: "var(--accent-emerald)" },
    { label: "Account Security", pct: 78, color: "var(--accent-amber)" }
  ];

  const catContainer = document.getElementById("dash-categories-container");
  if (catContainer) {
    catContainer.innerHTML = categoryBars.map(c => `
      <div class="progress-item">
        <div class="progress-item-header">
          <span>${c.label}</span>
          <span>${c.pct}%</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${c.pct}%; background: ${c.color}"></div>
        </div>
      </div>
    `).join("");
  }

  // Stat values
  const coursesVal = document.getElementById("dash-courses-val");
  if (coursesVal) coursesVal.textContent = `${appState.completedLessons.length} / ${LESSONS_DATA.length}`;

  const quizVal = document.getElementById("dash-quiz-val");
  if (quizVal) quizVal.textContent = `${appState.quizBestScore}%`;
}

// ==========================================================================
// 5. ACADEMY RENDERER & LESSON MODAL
// ==========================================================================

function renderAcademy(filter = "all") {
  const container = document.getElementById("academy-grid");
  if (!container) return;

  let filtered = LESSONS_DATA;
  if (filter === "beginner") filtered = LESSONS_DATA.filter(l => l.category === "Beginner");
  else if (filter === "intermediate") filtered = LESSONS_DATA.filter(l => l.category === "Intermediate");
  else if (filter === "completed") filtered = LESSONS_DATA.filter(l => appState.completedLessons.includes(l.id));

  container.innerHTML = filtered.map(l => {
    const isDone = appState.completedLessons.includes(l.id);
    return `
      <div class="lesson-card ${isDone ? 'completed' : ''}">
        <div>
          <div class="lesson-header">
            <span class="lesson-num">Lesson ${l.id}</span>
            <span class="lesson-title">${l.icon} ${l.title}</span>
          </div>
          <p class="lesson-desc">${l.desc}</p>
          <div class="lesson-meta">
            <span>🏷️ ${l.category}</span>
            <span>⏱️ ${l.time}</span>
          </div>
        </div>
        <button class="${isDone ? 'btn-secondary' : 'btn-primary'}" onclick="openLessonModal(${l.id})">
          ${isDone ? '✓ Review Lesson' : '📖 Start Lesson'}
        </button>
      </div>
    `;
  }).join("");

  // Tab active state
  document.querySelectorAll(".academy-tab").forEach(tab => {
    tab.classList.toggle("active", tab.getAttribute("data-filter") === filter);
  });
}

function openLessonModal(lessonId) {
  const lesson = LESSONS_DATA.find(l => l.id === lessonId);
  if (!lesson) return;

  const modal = document.getElementById("lesson-modal");
  const body = document.getElementById("lesson-modal-body");
  if (!modal || !body) return;

  const isDone = appState.completedLessons.includes(lesson.id);

  body.innerHTML = `
    <div style="margin-bottom: 1rem;">
      <span class="badge-pill level">Lesson ${lesson.id} • ${lesson.category}</span>
      <h2 style="font-size: 1.5rem; font-weight: 800; margin-top: 0.5rem; color: var(--text-main);">
        ${lesson.icon} ${lesson.title}
      </h2>
    </div>

    <div style="font-size: 0.95rem; line-height: 1.6; color: var(--text-main); margin-bottom: 1.5rem;">
      <p style="margin-bottom: 1rem;">${lesson.explanation}</p>
      
      <div style="background: rgba(6, 182, 212, 0.1); border-left: 4px solid var(--accent-cyan); padding: 1rem; border-radius: 0 var(--radius-md) var(--radius-md) 0; margin-bottom: 1rem;">
        <strong style="color: var(--accent-cyan);">💡 Real-World Example:</strong>
        <p style="margin-top: 0.25rem;">${lesson.example}</p>
      </div>

      <h4 style="font-weight: 700; margin-bottom: 0.5rem;">🛡️ Essential Safety Tips:</h4>
      <ul style="padding-left: 1.25rem; margin-bottom: 1.5rem;">
        ${lesson.tips.map(t => `<li style="margin-bottom: 0.25rem;">${t}</li>`).join("")}
      </ul>

      <!-- Mini Knowledge Check -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem;">
        <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--accent-amber); margin-bottom: 0.75rem;">
          🧠 Quick Knowledge Check
        </h4>
        <p style="font-weight: 600; margin-bottom: 0.75rem;">${lesson.question.text}</p>
        <div id="lesson-quiz-options" style="display: flex; flex-direction: column; gap: 0.5rem;">
          ${lesson.question.options.map((opt, idx) => `
            <button class="quiz-option-btn" onclick="checkLessonMiniQuiz(${lesson.id}, ${idx})">
              ${opt}
            </button>
          `).join("")}
        </div>
        <div id="lesson-quiz-feedback" style="margin-top: 0.75rem; font-size: 0.85rem; font-weight: 600;"></div>
      </div>
    </div>

    <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
      <button class="btn-secondary" onclick="closeLessonModal()">Close</button>
      <button class="btn-primary" id="btn-complete-lesson" onclick="markLessonComplete(${lesson.id})" ${isDone ? 'disabled' : ''}>
        ${isDone ? '✓ Completed' : 'Mark as Completed (+20 XP)'}
      </button>
    </div>
  `;

  modal.classList.add("active");
}

function checkLessonMiniQuiz(lessonId, choiceIdx) {
  const lesson = LESSONS_DATA.find(l => l.id === lessonId);
  if (!lesson) return;

  const feedback = document.getElementById("lesson-quiz-feedback");
  const buttons = document.querySelectorAll("#lesson-quiz-options .quiz-option-btn");

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === lesson.question.correct) {
      btn.classList.add("selected-correct");
    } else if (idx === choiceIdx) {
      btn.classList.add("selected-incorrect");
    }
  });

  if (choiceIdx === lesson.question.correct) {
    if (feedback) {
      feedback.style.color = "var(--color-success)";
      feedback.textContent = "✓ Excellent! That is correct.";
    }
  } else {
    if (feedback) {
      feedback.style.color = "var(--color-danger)";
      feedback.textContent = "❌ Incorrect. Review the lesson details above.";
    }
  }
}

function markLessonComplete(lessonId) {
  if (!appState.completedLessons.includes(lessonId)) {
    appState.completedLessons.push(lessonId);
    addXP(20, `Lesson ${lessonId} completed`);
    saveState();
    renderAcademy();
    renderDashboard();
    closeLessonModal();
  }
}

function closeLessonModal() {
  const modal = document.getElementById("lesson-modal");
  if (modal) modal.classList.remove("active");
}

// ==========================================================================
// 6. PHISHING SIMULATOR ENGINE
// ==========================================================================

let currentPhishIndex = 0;

function renderPhishingSim() {
  const scenario = PHISHING_SCENARIOS[currentPhishIndex];
  if (!scenario) return;

  const countEl = document.getElementById("phish-current-count");
  if (countEl) countEl.textContent = `${currentPhishIndex + 1} / ${PHISHING_SCENARIOS.length}`;

  const container = document.getElementById("phish-scenario-box");
  if (!container) return;

  // Reset feedback
  const feedbackCard = document.getElementById("phish-feedback-box");
  if (feedbackCard) {
    feedbackCard.style.display = "none";
    feedbackCard.className = "sim-feedback-card";
  }

  container.innerHTML = `
    <div class="email-client-card">
      <div class="email-top-bar">
        <div class="email-dots">
          <span class="email-dot dot-red"></span>
          <span class="email-dot dot-yellow"></span>
          <span class="email-dot dot-green"></span>
        </div>
        <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Educational Phishing Mailbox</span>
      </div>
      <div class="email-header-details">
        <div class="email-row"><span class="email-lbl">From:</span><span class="email-val"><strong>${scenario.senderName}</strong> &lt;${scenario.senderEmail}&gt;</span></div>
        <div class="email-row"><span class="email-lbl">Subject:</span><span class="email-val"><strong>${scenario.subject}</strong></span></div>
        <div class="email-row"><span class="email-lbl">Date:</span><span class="email-val">${scenario.date}</span></div>
      </div>
      <div class="email-body">
        ${scenario.body}
        <a href="javascript:void(0)" class="email-link-btn" onclick="showToast('Educational Link Preview: ' + '${scenario.senderEmail}', 'info')">${scenario.linkText}</a>
      </div>
    </div>
  `;

  // Enable choice buttons
  const btnPhish = document.getElementById("btn-phish-choice");
  const btnSafe = document.getElementById("btn-safe-choice");
  if (btnPhish) btnPhish.disabled = false;
  if (btnSafe) btnSafe.disabled = false;
}

function submitPhishingAnswer(userGuessedPhishing) {
  const scenario = PHISHING_SCENARIOS[currentPhishIndex];
  if (!scenario) return;

  const btnPhish = document.getElementById("btn-phish-choice");
  const btnSafe = document.getElementById("btn-safe-choice");
  if (btnPhish) btnPhish.disabled = true;
  if (btnSafe) btnSafe.disabled = true;

  const isCorrect = (userGuessedPhishing === scenario.isPhishing);
  const feedbackCard = document.getElementById("phish-feedback-box");

  if (!appState.phishingCompleted.includes(scenario.id)) {
    appState.phishingCompleted.push(scenario.id);
  }

  if (isCorrect) {
    addXP(30, "Phishing scenario identified");
    if (feedbackCard) {
      feedbackCard.className = "sim-feedback-card correct";
      feedbackCard.style.display = "block";
      feedbackCard.innerHTML = `
        <h3 style="color: var(--color-success); font-size: 1.1rem; font-weight: 800; margin-bottom: 0.5rem;">
          ✓ Correct! You correctly identified this message.
        </h3>
        <p style="font-size: 0.9rem; margin-bottom: 0.75rem;">
          ${scenario.isPhishing ? "This was indeed a dangerous PHISHING message." : "This was a SAFE, legitimate communication."}
        </p>
        <h4 style="font-weight: 700; font-size: 0.85rem; margin-bottom: 0.25rem;">Warning Signs / Key Indicators:</h4>
        <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
          ${scenario.warningSigns.map(w => `<li>${w}</li>`).join("")}
        </ul>
        <button class="btn-primary" onclick="nextPhishingScenario()">Next Scenario ➔</button>
      `;
    }
  } else {
    if (feedbackCard) {
      feedbackCard.className = "sim-feedback-card incorrect";
      feedbackCard.style.display = "block";
      feedbackCard.innerHTML = `
        <h3 style="color: var(--color-danger); font-size: 1.1rem; font-weight: 800; margin-bottom: 0.5rem;">
          ❌ Incorrect. You missed the key indicators.
        </h3>
        <p style="font-size: 0.9rem; margin-bottom: 0.75rem;">
          ${scenario.isPhishing ? "This was a PHISHING attack! Here is why:" : "This was actually a SAFE message."}
        </p>
        <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
          ${scenario.warningSigns.map(w => `<li>${w}</li>`).join("")}
        </ul>
        <button class="btn-primary" onclick="nextPhishingScenario()">Next Scenario ➔</button>
      `;
    }
  }
}

function nextPhishingScenario() {
  currentPhishIndex = (currentPhishIndex + 1) % PHISHING_SCENARIOS.length;
  renderPhishingSim();
}

// ==========================================================================
// 7. URL SAFETY ANALYZER TOOL
// ==========================================================================

function analyzeUrlInput() {
  const inputEl = document.getElementById("url-input-field");
  if (!inputEl) return;

  const rawUrl = inputEl.value.trim();
  if (!rawUrl) {
    showToast("Please enter a URL to analyze", "warn");
    return;
  }

  let urlObj;
  let href = rawUrl;
  if (!href.startsWith("http://") && !href.startsWith("https://")) {
    href = "http://" + href;
  }

  try {
    urlObj = new URL(href);
  } catch (e) {
    showToast("Invalid URL format", "danger");
    return;
  }

  const hostname = urlObj.hostname.toLowerCase();
  const fullPath = urlObj.pathname.toLowerCase();
  
  let riskScore = 0;
  const checks = [];

  // Check 1: HTTPS Protocol
  if (urlObj.protocol === "https:") {
    checks.push({ name: "HTTPS Protocol", pass: true, detail: "Uses encrypted HTTPS connection" });
  } else {
    riskScore += 25;
    checks.push({ name: "HTTPS Protocol", pass: false, detail: "Unencrypted HTTP connection detected" });
  }

  // Check 2: IP Address instead of domain
  const isIP = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);
  if (isIP) {
    riskScore += 35;
    checks.push({ name: "Host Type", pass: false, detail: "Uses raw IP address instead of domain name" });
  } else {
    checks.push({ name: "Host Type", pass: true, detail: "Standard domain name structure" });
  }

  // Check 3: URL Length
  if (rawUrl.length > 75) {
    riskScore += 15;
    checks.push({ name: "URL Length", pass: false, detail: `Excessively long URL (${rawUrl.length} characters)` });
  } else {
    checks.push({ name: "URL Length", pass: true, detail: "Standard concise URL length" });
  }

  // Check 4: Suspicious Keywords
  const susKeywords = ["login", "verify", "secure", "account", "update", "banking", "paypal", "free", "bonus", "claim", "support", "signin"];
  const foundKeywords = susKeywords.filter(k => hostname.includes(k) || fullPath.includes(k));
  if (foundKeywords.length > 0) {
    riskScore += 20 * foundKeywords.length;
    checks.push({ name: "Keywords Check", pass: false, detail: `Contains high-risk terms: [${foundKeywords.join(", ")}]` });
  } else {
    checks.push({ name: "Keywords Check", pass: true, detail: "No suspicious financial/login keywords found" });
  }

  // Check 5: Excessive Subdomains
  const subParts = hostname.split(".");
  if (subParts.length > 3) {
    riskScore += 20;
    checks.push({ name: "Subdomain Depth", pass: false, detail: `Excessive subdomains detected (${subParts.length} levels)` });
  } else {
    checks.push({ name: "Subdomain Depth", pass: true, detail: "Standard domain level structure" });
  }

  // Check 6: @ Symbol
  if (rawUrl.includes("@")) {
    riskScore += 30;
    checks.push({ name: "Special Characters", pass: false, detail: "Contains '@' symbol (often used for credential URL obfuscation)" });
  } else {
    checks.push({ name: "Special Characters", pass: true, detail: "No obfuscating @ symbols found" });
  }

  // Calculate Risk Level
  riskScore = Math.min(100, Math.max(0, riskScore));
  let riskLevel = "LOW";
  let colorClass = "status-tick pass";

  if (riskScore >= 70) {
    riskLevel = "CRITICAL / HIGH RISK";
    colorClass = "status-tick fail";
  } else if (riskScore >= 35) {
    riskLevel = "MEDIUM RISK";
    colorClass = "status-tick warn";
  }

  // Render Report
  const reportBox = document.getElementById("url-report-box");
  if (reportBox) {
    reportBox.style.display = "block";
    reportBox.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
        <div>
          <h3 style="font-size: 1.1rem; font-weight: 800;">URL SECURITY REPORT</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); font-family: monospace;">${rawUrl}</p>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 1.4rem; font-weight: 800; class="${colorClass}">${riskScore} / 100</span>
          <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted);">${riskLevel}</div>
        </div>
      </div>

      <table class="report-table">
        <thead>
          <tr>
            <th>Security Indicator</th>
            <th>Status</th>
            <th>Diagnostic Detail</th>
          </tr>
        </thead>
        <tbody>
          ${checks.map(c => `
            <tr>
              <td><strong>${c.name}</strong></td>
              <td class="${c.pass ? 'status-tick pass' : 'status-tick fail'}">${c.pass ? '✓ PASS' : '⚠ WARNING'}</td>
              <td style="color: var(--text-muted); font-size: 0.85rem;">${c.detail}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="disclaimer-banner">
        <span>⚠️</span>
        <div>
          <strong>Educational Disclaimer:</strong> This is an educational heuristic analysis based on string patterns. A low risk score does not guarantee that a website is completely safe. Always verify trusted domain certificates.
        </div>
      </div>
    `;
  }
}

function setPresetUrl(urlStr) {
  const inputEl = document.getElementById("url-input-field");
  if (inputEl) {
    inputEl.value = urlStr;
    analyzeUrlInput();
  }
}

// ==========================================================================
// 8. PASSWORD STRENGTH CHECKER & GENERATOR TOOL
// ==========================================================================

function evaluatePasswordInput() {
  const pwInput = document.getElementById("pw-checker-field");
  if (!pwInput) return;

  const val = pwInput.value;
  if (!val) {
    document.getElementById("pw-result-box").style.display = "none";
    return;
  }

  let score = 0;
  const checks = {
    length8: val.length >= 8,
    length12: val.length >= 12,
    length16: val.length >= 16,
    upper: /[A-Z]/.test(val),
    lower: /[a-z]/.test(val),
    number: /[0-9]/.test(val),
    symbol: /[^A-Za-z0-9]/.test(val),
    common: /12345|password|admin|qwerty|zoyan|dragon|iloveyou/i.test(val)
  };

  if (checks.length8) score += 20;
  if (checks.length12) score += 15;
  if (checks.length16) score += 15;
  if (checks.upper) score += 10;
  if (checks.lower) score += 10;
  if (checks.number) score += 15;
  if (checks.symbol) score += 15;
  if (checks.common) score -= 30;

  score = Math.min(100, Math.max(0, score));

  let label = "WEAK";
  let color = "var(--color-danger)";

  if (score >= 80) { label = "VERY STRONG"; color = "var(--color-success)"; }
  else if (score >= 60) { label = "STRONG"; color = "var(--accent-cyan)"; }
  else if (score >= 40) { label = "FAIR"; color = "var(--accent-amber)"; }

  const resultBox = document.getElementById("pw-result-box");
  if (resultBox) {
    resultBox.style.display = "block";
    resultBox.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
        <span style="font-weight: 700; font-size: 0.9rem;">Password Score: ${score}%</span>
        <span style="font-weight: 800; font-size: 0.9rem; color: ${color};">${label}</span>
      </div>
      
      <div class="progress-bar-bg" style="height: 10px; margin-bottom: 1rem;">
        <div class="progress-bar-fill" style="width: ${score}%; background: ${color};"></div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.85rem;">
        <div class="${checks.length12 ? 'status-tick pass' : 'status-tick fail'}">${checks.length12 ? '✓ Length 12+ chars' : '⚠ Under 12 characters'}</div>
        <div class="${checks.upper ? 'status-tick pass' : 'status-tick fail'}">${checks.upper ? '✓ Uppercase letters' : '⚠ Missing uppercase'}</div>
        <div class="${checks.lower ? 'status-tick pass' : 'status-tick fail'}">${checks.lower ? '✓ Lowercase letters' : '⚠ Missing lowercase'}</div>
        <div class="${checks.number ? 'status-tick pass' : 'status-tick fail'}">${checks.number ? '✓ Numbers included' : '⚠ Missing numbers'}</div>
        <div class="${checks.symbol ? 'status-tick pass' : 'status-tick fail'}">${checks.symbol ? '✓ Special symbols' : '⚠ Missing symbols'}</div>
        <div class="${!checks.common ? 'status-tick pass' : 'status-tick fail'}">${!checks.common ? '✓ No common dictionary patterns' : '⚠ Weak dictionary word detected'}</div>
      </div>
    `;
  }

  // Trigger Badge evaluate
  addXP(5, "Password strength checked");
}

function generateRandomPassword() {
  const lenEl = document.getElementById("gen-length-slider");
  const len = lenEl ? parseInt(lenEl.value) : 16;

  const useUpper = document.getElementById("gen-chk-upper")?.checked ?? true;
  const useLower = document.getElementById("gen-chk-lower")?.checked ?? true;
  const useNum = document.getElementById("gen-chk-num")?.checked ?? true;
  const useSym = document.getElementById("gen-chk-sym")?.checked ?? true;

  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const numChars = "0123456789";
  const symChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let allowed = "";
  if (useUpper) allowed += upperChars;
  if (useLower) allowed += lowerChars;
  if (useNum) allowed += numChars;
  if (useSym) allowed += symChars;

  if (!allowed) allowed = lowerChars + numChars;

  let password = "";
  const randomBuffer = new Uint32Array(len);
  window.crypto.getRandomValues(randomBuffer);

  for (let i = 0; i < len; i++) {
    password += allowed[randomBuffer[i] % allowed.length];
  }

  const outField = document.getElementById("gen-output-text");
  if (outField) outField.textContent = password;
}

function copyGeneratedPassword() {
  const outField = document.getElementById("gen-output-text");
  if (!outField || !outField.textContent) return;

  navigator.clipboard.writeText(outField.textContent).then(() => {
    showToast("✓ Generated password copied to clipboard!", "success");
  }).catch(() => {
    showToast("Failed to copy password", "danger");
  });
}

// ==========================================================================
// 9. QUIZ ENGINE
// ==========================================================================

let currentQuizIndex = 0;
let quizScoreCounter = 0;

function startQuiz() {
  currentQuizIndex = 0;
  quizScoreCounter = 0;
  
  document.getElementById("quiz-start-box").style.display = "none";
  document.getElementById("quiz-results-box").style.display = "none";
  document.getElementById("quiz-active-box").style.display = "block";

  renderQuizQuestion();
}

function renderQuizQuestion() {
  const q = QUIZ_QUESTIONS[currentQuizIndex];
  if (!q) {
    finishQuiz();
    return;
  }

  const numEl = document.getElementById("quiz-q-number");
  if (numEl) numEl.textContent = `Question ${currentQuizIndex + 1} / ${QUIZ_QUESTIONS.length}`;

  const progFill = document.getElementById("quiz-progress-fill");
  if (progFill) progFill.style.width = `${((currentQuizIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`;

  const qText = document.getElementById("quiz-q-text");
  if (qText) qText.textContent = q.q;

  const optBox = document.getElementById("quiz-options-box");
  if (optBox) {
    optBox.innerHTML = q.options.map((opt, idx) => `
      <button class="quiz-option-btn" onclick="submitQuizOption(${idx})">
        <span>${String.fromCharCode(65 + idx)}. ${opt}</span>
      </button>
    `).join("");
  }

  const expBox = document.getElementById("quiz-explanation-box");
  if (expBox) expBox.style.display = "none";
}

function submitQuizOption(choiceIdx) {
  const q = QUIZ_QUESTIONS[currentQuizIndex];
  if (!q) return;

  const buttons = document.querySelectorAll("#quiz-options-box .quiz-option-btn");
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correct) {
      btn.classList.add("selected-correct");
    } else if (idx === choiceIdx) {
      btn.classList.add("selected-incorrect");
    }
  });

  if (choiceIdx === q.correct) {
    quizScoreCounter++;
  }

  const expBox = document.getElementById("quiz-explanation-box");
  if (expBox) {
    expBox.style.display = "block";
    expBox.innerHTML = `
      <p style="font-weight: 700; color: ${choiceIdx === q.correct ? 'var(--color-success)' : 'var(--color-danger)'}; margin-bottom: 0.25rem;">
        ${choiceIdx === q.correct ? '✓ Correct Answer!' : '❌ Incorrect Answer'}
      </p>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">${q.exp}</p>
      <button class="btn-primary" onclick="nextQuizQuestion()">
        ${currentQuizIndex + 1 < QUIZ_QUESTIONS.length ? 'Next Question ➔' : 'View Final Results 🏆'}
      </button>
    `;
  }
}

function nextQuizQuestion() {
  currentQuizIndex++;
  renderQuizQuestion();
}

function finishQuiz() {
  document.getElementById("quiz-active-box").style.display = "none";
  const resultsBox = document.getElementById("quiz-results-box");
  if (!resultsBox) return;

  resultsBox.style.display = "block";

  const pct = Math.round((quizScoreCounter / QUIZ_QUESTIONS.length) * 100);
  if (pct > appState.quizBestScore) {
    appState.quizBestScore = pct;
    saveState();
  }

  const earnedXp = Math.round(pct * 1.5);
  addXP(earnedXp, "Quiz Completed");

  resultsBox.innerHTML = `
    <div style="text-align: center; padding: 2rem 1rem;">
      <div style="font-size: 3rem; margin-bottom: 0.5rem;">🎉</div>
      <h2 style="font-size: 1.75rem; font-weight: 800; margin-bottom: 0.25rem;">Quiz Complete!</h2>
      <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Here is your cybersecurity knowledge evaluation:</p>

      <div style="font-size: 2.5rem; font-weight: 800; color: var(--accent-cyan); margin-bottom: 0.5rem;">
        ${quizScoreCounter} / ${QUIZ_QUESTIONS.length} (${pct}%)
      </div>

      <div style="font-size: 1rem; font-weight: 700; color: var(--color-success); margin-bottom: 1.5rem;">
        +${earnedXp} XP EARNED
      </div>

      <div style="display: flex; justify-content: center; gap: 1rem;">
        <button class="btn-secondary" onclick="switchSection('dashboard')">Back to Dashboard</button>
        <button class="btn-primary" onclick="startQuiz()">Try Quiz Again 🔄</button>
      </div>
    </div>
  `;
}

// ==========================================================================
// 10. DAILY CHALLENGE & SECURITY CHECKUP
// ==========================================================================

function renderDailyChallenge() {
  const container = document.getElementById("daily-challenge-box");
  if (!container) return;

  container.innerHTML = `
    <div class="card" style="border-color: var(--border-glow);">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
        <span class="badge-pill streak">🔥 Daily Cyber Challenge</span>
        <span style="font-size: 0.8rem; color: var(--accent-cyan); font-weight: 700;">+25 XP Reward</span>
      </div>

      <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
        Scenario: Unexpected OTP Request Message
      </h3>
      <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem;">
        Someone claiming to be your close friend messages you: <em>"Hey! I accidentally sent my 6-digit login verification code to your phone. Can you quickly copy and paste it back to me?"</em>
      </p>

      <div id="daily-options-list" style="display: flex; flex-direction: column; gap: 0.5rem;">
        <button class="quiz-option-btn" onclick="answerDailyChallenge(0)">A. Send them the 6-digit code immediately</button>
        <button class="quiz-option-btn" onclick="answerDailyChallenge(1)">B. Ignore or refuse the request and alert your friend via phone call</button>
        <button class="quiz-option-btn" onclick="answerDailyChallenge(2)">C. Reply asking for their password in exchange</button>
      </div>

      <div id="daily-feedback-box" style="margin-top: 1rem; font-size: 0.85rem; font-weight: 600; display: none;"></div>
    </div>
  `;
}

function answerDailyChallenge(choiceIdx) {
  const feedback = document.getElementById("daily-feedback-box");
  const options = document.querySelectorAll("#daily-options-list .quiz-option-btn");

  options.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === 1) btn.classList.add("selected-correct");
    else if (idx === choiceIdx) btn.classList.add("selected-incorrect");
  });

  if (choiceIdx === 1) {
    addXP(25, "Daily Challenge completed");
    if (feedback) {
      feedback.style.display = "block";
      feedback.style.color = "var(--color-success)";
      feedback.innerHTML = "✓ Correct! This is an account takeover scam. Scammers compromise an account to trick their contacts into revealing 2FA reset codes.";
    }
  } else {
    if (feedback) {
      feedback.style.display = "block";
      feedback.style.color = "var(--color-danger)";
      feedback.innerHTML = "❌ Incorrect. Never share OTP or 2FA codes with anyone! Doing so hands control of your account directly to the hacker.";
    }
  }
}

function renderCheckupList() {
  const container = document.getElementById("checkup-items-list");
  if (!container) return;

  container.innerHTML = CHECKUP_ITEMS.map((item, idx) => {
    const isChecked = appState.checkupItems[idx] ?? false;
    return `
      <label class="checkup-item">
        <input type="checkbox" class="checkup-checkbox" ${isChecked ? 'checked' : ''} onchange="toggleCheckupItem(${idx}, this.checked)">
        <span style="font-size: 0.95rem; font-weight: 500;">${item.text}</span>
      </label>
    `;
  }).join("");

  recalculateCheckupScore();
}

function toggleCheckupItem(idx, checked) {
  appState.checkupItems[idx] = checked;
  recalculateCheckupScore();
  saveState();
}

function recalculateCheckupScore() {
  let score = 0;
  CHECKUP_ITEMS.forEach((item, idx) => {
    if (appState.checkupItems[idx]) {
      score += item.points;
    }
  });

  appState.securityScore = Math.min(100, Math.max(0, score));
  saveState();
  updateUserStatsHeader();
  renderDashboard();
}

// ==========================================================================
// 11. BADGES & LEADERBOARD RENDERERS
// ==========================================================================

function checkBadgeUnlocks() {
  if (appState.completedLessons.length >= 1 && !appState.badges.includes("beginner")) {
    appState.badges.push("beginner");
  }
  if (appState.xp >= 500 && !appState.badges.includes("guardian")) {
    appState.badges.push("guardian");
  }
  if (appState.phishingCompleted.length >= 3 && !appState.badges.includes("phishing_hunter")) {
    appState.badges.push("phishing_hunter");
  }
  if (appState.completedLessons.length >= 5 && !appState.badges.includes("privacy_defender")) {
    appState.badges.push("privacy_defender");
  }
  if (appState.quizBestScore >= 80 && !appState.badges.includes("champion")) {
    appState.badges.push("champion");
  }
}

function renderBadges() {
  const container = document.getElementById("badges-grid-container");
  if (!container) return;

  container.innerHTML = BADGES_LIST.map(b => {
    const isUnlocked = appState.badges.includes(b.id);
    return `
      <div class="card" style="opacity: ${isUnlocked ? '1' : '0.5'}; border-color: ${isUnlocked ? 'var(--accent-cyan)' : 'var(--border-color)'}">
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">${b.name.split(" ")[0]}</div>
        <h4 style="font-weight: 700; font-size: 1rem;">${b.name}</h4>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.75rem;">${b.desc}</p>
        <span class="badge-pill ${isUnlocked ? 'level' : ''}">
          ${isUnlocked ? '✓ Unlocked' : '🔒 Locked'}
        </span>
      </div>
    `;
  }).join("");
}

function renderLeaderboard() {
  const container = document.getElementById("leaderboard-table-body");
  if (!container) return;

  // Update user in leaderboard data
  const userEntry = LEADERBOARD_DATA.find(u => u.isUser);
  if (userEntry) {
    userEntry.xp = appState.xp;
    userEntry.level = appState.userLevel;
    userEntry.name = appState.userName;
  }

  // Sort by XP
  LEADERBOARD_DATA.sort((a, b) => b.xp - a.xp);

  container.innerHTML = LEADERBOARD_DATA.map((u, idx) => `
    <tr style="${u.isUser ? 'background: rgba(6, 182, 212, 0.15); font-weight: 700;' : ''}">
      <td>
        <span class="rank-badge rank-${idx + 1}">${idx + 1}</span>
      </td>
      <td>
        <strong>${u.name}</strong> ${u.isUser ? '(You)' : ''}
      </td>
      <td style="color: var(--accent-cyan);">${u.level}</td>
      <td style="font-weight: 800;">${u.xp.toLocaleString()} XP</td>
    </tr>
  `).join("");
}

// ==========================================================================
// 12. PROFILE & SETTINGS
// ==========================================================================

function updateProfileView() {
  const nameInput = document.getElementById("profile-name-input");
  if (nameInput) nameInput.value = appState.userName;

  const xpVal = document.getElementById("prof-xp-val");
  if (xpVal) xpVal.textContent = appState.xp.toLocaleString();

  const scoreVal = document.getElementById("prof-score-val");
  if (scoreVal) scoreVal.textContent = `${appState.securityScore} / 100`;
}

function saveProfileName() {
  const nameInput = document.getElementById("profile-name-input");
  if (!nameInput) return;

  const newName = nameInput.value.trim();
  if (newName) {
    appState.userName = newName;
    saveState();
    updateUserStatsHeader();
    renderLeaderboard();
    showToast("✓ Profile name updated!", "success");
  }
}

function resetProgressData() {
  if (confirm("Are you sure you want to reset all your learning progress and XP?")) {
    localStorage.removeItem("cybersafe_student_data");
    appState = { ...DEFAULT_STATE };
    saveState();
    location.reload();
  }
}

// ==========================================================================
// 13. COMPETITION DEMO PRESENTATION MODAL
// ==========================================================================

function openDemoModal() {
  const modal = document.getElementById("demo-modal-overlay");
  if (!modal) return;

  const contentBox = document.getElementById("demo-modal-content");
  if (contentBox) {
    contentBox.innerHTML = `
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <span style="font-size: 2.5rem;">🎤</span>
        <h2 style="font-size: 1.6rem; font-weight: 800; background: linear-gradient(135deg, var(--accent-cyan), var(--accent-blue)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
          Competition Executive Demo Dashboard
        </h2>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Bano Qabil CIT Web Development Presentation Overview</p>
      </div>

      <div class="stats-grid" style="margin-bottom: 1.5rem;">
        <div class="stat-card">
          <div class="stat-icon">🛡️</div>
          <div>
            <div class="stat-val">${appState.securityScore}/100</div>
            <div class="stat-lbl">Cyber Safety Index</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⚡</div>
          <div>
            <div class="stat-val">${appState.xp}</div>
            <div class="stat-lbl">Total Student XP</div>
          </div>
        </div>
      </div>

      <div style="background: var(--bg-card); border: 1px solid var(--border-glow); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
        <h4 style="font-weight: 700; color: var(--accent-cyan); margin-bottom: 0.5rem;">🏆 Project Highlights & Architecture</h4>
        <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-main); line-height: 1.6;">
          <li><strong>Pure Vanilla Stack:</strong> Built strictly with HTML5, CSS3, and Vanilla JS ES6+ (Zero external dependencies or framework overhead).</li>
          <li><strong>Offline Local Storage:</strong> Complete state persistence for student progress, scores, and badges.</li>
          <li><strong>Interactive Security Suite:</strong> Features real-time heuristic URL analysis, crypto-random password generation, and educational phishing simulation.</li>
          <li><strong>Accessibility & Gamification:</strong> Dark/light mode theme support, reduced motion options, and level progression.</li>
        </ul>
      </div>

      <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
        <button class="btn-secondary" onclick="closeDemoModal()">Close Overview</button>
        <button class="btn-primary" onclick="closeDemoModal(); switchSection('tools');">Launch URL Demo 🔗</button>
      </div>
    `;
  }

  modal.classList.add("active");
}

function closeDemoModal() {
  const modal = document.getElementById("demo-modal-overlay");
  if (modal) modal.classList.remove("active");
}

// ==========================================================================
// 14. TOAST NOTIFICATION SYSTEM
// ==========================================================================

function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";

  let icon = "ℹ️";
  if (type === "success") icon = "✓";
  else if (type === "danger") icon = "❌";
  else if (type === "warn") icon = "⚠️";

  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
