import axios from "axios";

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

// Mock data function
const getMockData = (endpoint) => {
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
  };

  return mockData[endpoint] || [];
};

// Helper function
const getElementName = (iconId) => {
  const iconMap = {
    1: "LinkedinLogo", 2: "BehanceLogo", 3: "WhatsappLogo",
    4: "InstagramLogo", 5: "FacebookLogo", 6: "TelegramLogo",
  };
  return iconMap[iconId] || "DefaultLogo";
};

// Data fetching functions
const fetchSocialMedia = async () => {
  const socialMedia = await fetchData("/social-media/");
  return socialMedia.map((item) => ({
    link: item.url || "/",
    element: getElementName(item.icon),
    name: item.name,
    iconUrl: `${MEDIA_BASE_URL}${item.icon}/path`,
  }));
};

const fetchWorks = async () => {
  const projects = await fetchData("/projects/");
  return projects.map((project) => ({
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
    hoverImage: null,
    project_url: project.project_url,
    project_behance_url: project.project_behance_url,
    year: project.year,
    client: project.client,
    industry: project.industry,
    collaborators: project.collaborators,
  }));
};

const fetchServices = async () => {
  const servicesData = await fetchData("/services/");
  return servicesData.map((service) => ({
    id: service.id,
    icon: `${API_BASE_URL}${service.icon_url}`,
    title: service.name,
    contentName: service.title,
    description: service.description,
    tags: service.tags.map(tag => ({ id: tag.id, name: tag.name })),
  }));
};

const fetchHoverableItems = async () => {
  const progressData = await fetchData("/progress/");
  return progressData.map((item) => ({
    id: item.order,
    column: item.order.toString().padStart(2, '0'),
    title: item.title,
    description: item.description,
  }));
};

const fetchPartnerships = async () => {
  const partners = await fetchData("/partners/");
  return partners.map((partner) => ({
    path: `${MEDIA_BASE_URL}${partner.image}/path`,
    desc: partner.name,
  }));
};

const fetchTeamList = async () => {
  const teamData = await fetchData("/team-members/");
  return teamData.map((member) => ({
    id: member.id,
    name: member.full_name,
    profession: member.position,
    profile_img: member.image ? `${MEDIA_BASE_URL}${member.image}/path` : "/images/team_profile_img.jpg",
    social_media: member.social_media.map(social => ({
      path: "/",
      component: social.name
    }))
  }));
};

const fetchParallaxImages = async () => {
  const galleryData = await fetchData("/gallery/");
  return galleryData.map((item) => ({
    id: item.id,
    image: `${MEDIA_BASE_URL}${item.image}/path`,
    description: item.description
  }));
};

const fetchLeaderSocialMedia = async () => {
  const teamData = await fetchData("/team-members/");
  const founder = teamData.find(member => member.position.toLowerCase() === "founder");
  if (founder) {
    return founder.social_media.map((social) => ({
      link: "/",
      element: social.name
    }));
  }
  return [];
};

// Data initialization function
export const initializeData = async () => {
  const [
    socialMediaList,
    works,
    services,
    hoverableItems,
    partnerships,
    teamList,
    parallaxImages,
    leaderSocialMedia
  ] = await Promise.all([
    fetchSocialMedia(),
    fetchWorks(),
    fetchServices(),
    fetchHoverableItems(),
    fetchPartnerships(),
    fetchTeamList(),
    fetchParallaxImages(),
    fetchLeaderSocialMedia()
  ]);

  return {
    socialMediaList,
    works,
    services,
    hoverableItems,
    partnerships,
    teamList,
    parallaxImages,
    leaderSocialMedia
  };
};

// Static data
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
