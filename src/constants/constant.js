import axios from 'axios';

const API_BASE_URL = "https://shi.studio/api/v1";
const MEDIA_BASE_URL = `${API_BASE_URL}/media/`;

// Utility function for API calls
const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    if (error.message === 'Network Error') {
      console.warn(`Network error occurred. Returning mock data for ${endpoint}`);
      return getMockData(endpoint);
    }
    return [];
  }
};

// Mock data function (implementation omitted for brevity)
const getMockData = (endpoint) => {
  // You can expand this with more mock data for different endpoints
  const mockData = {
    '/social-media/': [
      { url: 'https://linkedin.com', icon: 1, name: 'LinkedIn' },
      { url: 'https://behance.com', icon: 2, name: 'Behance' },
    ],
    '/projects/': [
      { id: 1, name: 'Project 1', description: 'A sample project' },
      { id: 2, name: 'Project 2', description: 'Another sample project' },
    ],
    '/services/': [
      { id: 1, name: 'Web Development', description: 'Custom web development services' },
      { id: 2, name: 'UX/UI Design', description: 'User experience and interface design' },
    ],
    // Add more mock data for other endpoints as needed
  };
  return mockData[endpoint] || [];
};




const getElementName = (iconId) => {
  const iconMap = {
    1: "LinkedinLogo", 2: "BehanceLogo", 3: "WhatsappLogo",
    4: "InstagramLogo", 5: "FacebookLogo", 6: "TelegramLogo",
  };
  return iconMap[iconId] || "DefaultLogo";
};
// Function to load all data
const loadAllData = async () => {
  const [
    socialMedia,
    projects,
    servicesData,
    progressData,
    partners,
    teamData,
    galleryData
  ] = await Promise.all([
    fetchData("/social-media/"),
    fetchData("/projects/"),
    fetchData("/services/"),
    fetchData("/progress/"),
    fetchData("/partners/"),
    fetchData("/team-members/"),
    fetchData("/gallery/")
  ]);

  // Process and return the data
  return {
    socialMediaList: socialMedia.map(item => ({
      link: item.url || "/",
      element: getElementName(item.icon),
      name: item.name,
      iconUrl: `${MEDIA_BASE_URL}${item.icon}/path`,
    })),
    works: projects.map(project => ({
      id: project.id,
      title: project.name,
      image: project.image ? `${MEDIA_BASE_URL}${project.image}/path` : null,
      description: project.description,
      tags: project.services.map((service, index) => ({ id: index + 1, name: service })),
      badges: project.badges.map((badge, index) => ({
        id: index + 1,
        name: badge.name,
        image: `<svg><!-- Placeholder for badge SVG --></svg>`,
      })),
      hoverImage: project.hover_cover,
      project_url: project.project_url,
      project_behance_url: project.project_behance_url,
      year: project.year,
      client: project.client,
      industry: project.industry,
      collaborators: project.collaborators,
    })),
    services: servicesData.map(service => ({
      id: service.id,
      icon: `https://shi.studio${service.icon_url}`,
      title: service.name,
      contentName: service.title,
      description: service.description,
      tags: service.tags.map(tag => ({ id: tag.id, name: tag.name })),
    })),
    hoverableItems: progressData.map(item => ({
      id: item.order,
      column: item.order.toString().padStart(2, '0'),
      title: item.title,
      description: item.description,
    })),
    partnershipsList: partners.map(partner => ({
      path: `${MEDIA_BASE_URL}${partner.image}/path`,
      desc: partner.name,
    })),
    teamList: teamData.map(member => ({
      id: member.id,
      name: member.full_name,
      profession: member.position,
      profile_img: member.image ? `${MEDIA_BASE_URL}${member.image}/path` : "/images/team_profile_img.jpg",
      social_media: member.social_media.map(social => ({
        path: "/",
        component: social.name
      }))
    })),
    parallaxImages: galleryData.map(item => ({
      id: item.id,
      image: `${MEDIA_BASE_URL}${item.image}/path`,
      description: item.description
    })),
    leaderSocialMediaList: (() => {
      const founder = teamData.find(member => member.position.toLowerCase() === "founder");
      return founder ? founder.social_media.map(social => ({
        link: "/",
        element: social.name
      })) : [];
    })()
  };
};

// Load all data before exporting
const loadedData = await loadAllData();

// Export the loaded data
export const socialMediaList = loadedData.socialMediaList;
export const works = loadedData.works;
export const services = loadedData.services;
export const hoverableItems = loadedData.hoverableItems;
export const partnershipsList = loadedData.partnershipsList;
export const parntershipsListExpanded = loadedData.partnershipsList; // Same as partnershipsList
export const teamList = loadedData.teamList;
export const parallaxImages = loadedData.parallaxImages;
export const leaderSocialMediaList = loadedData.leaderSocialMediaList;

// Export other static data (unchanged from the original code)
export const navLinks = [
  { path: "/", name: "Home" },
  { path: "/about", name: "About" },
  { path: "/works", name: "Works" },
  { path: "/services", name: "Services" },
  { path: "/contact", name: "Contact" },
];

export const navigationFooterList = [
  ...navLinks,
  { path: "/works", name: "Works" },
];

export const ourServicesList = [
  { path: "/services", name: "UX/UI Design" },
  { path: "/services", name: "Web Development" },
  { path: "/services", name: "Complete website" },
  { path: "/services", name: "Support" },
];


export const plans = [
  {
    id: 1,
    title: "Reach out",
    description: "We'd love to hear from you! Whether you have a question or want to chat about your project, just drop us a message. Let's connect!",
    buttonText: "Let's talk",
    offers: [
      { id: 1, title: "Quick Response" },
      { id: 2, title: "Flexible Timing" },
      { id: 3, title: "Personalized Service" },
    ],
  },
];

export const contactNavbar = [
  { path: "/contact/contact-us", name: "Contact us" },
  { path: "/contact/work-together", name: "Work together" },
  { path: "/contact/join-our-team", name: "Join our team" },
  { path: "/contact/become-our-partner", name: "Become our partner" },
];

export const leaderInfo = [
  {
    id: 1,
    icon: "/images/web-development.gif",
    title: "Experience",
    description: "Zahra, the founder of our studio, previously worked at Safaroff Agency, where she honed her expertise in creative design. She has contributed to numerous state projects, showcasing her exceptional skills and vision. Currently, Zahra shares her knowledge as a mentor at Turing Academy, guiding the next generation of designers.",
  },
  {
    id: 2,
    icon: "/images/web-development.gif",
    title: "Interests",
    description: "Zahra has a deep passion for music, art, and design, which inspires her creative approach. Her love for these forms of expression fuels her innovative thinking in every project. She believes that the intersection of these disciplines leads to truly unique and impactful designs. This blend of interests drives the artistic vision behind our studio's work.",
  },
];

export const professionList = [
  { id: 1, name: "UX/UI Design" },
  { id: 2, name: "Web Development" },
  { id: 3, name: "Complete website" },
  { id: 4, name: "Support" },
];

export const vacanciesList = [
  { id: 1, name: "UX/UI Designer" },
  { id: 2, name: "Front-end Developer" },
  { id: 3, name: "Back-end Developer" },
  { id: 4, name: "Other" },
];

export const budgetList = [
  { id: 1, name: "<1 000 AZN" },
  { id: 2, name: "1 000-5 000 AZN" },
  { id: 3, name: "5 000-10 000 AZN" },
  { id: 4, name: "10 000+ AZN" },
];

export const categories = [
  { id: 1, title: "All projects" },
  { id: 2, title: "Case study" },
  { id: 3, title: "State" },
  { id: 4, title: "Corporate" },
  { id: 5, title: "App" },
];

export const contactData = [
  { id: 1, link: "/work-together", text: "Work together" },
  { id: 2, link: "/join-our-team", text: "Join our team" },
  { id: 3, link: "/become-our-partner", text: "Become our partner" },
];

export const workInfoCommon = {
  viewFullSiteText: "View full site",
};



console.log("All data loaded and exported successfully");