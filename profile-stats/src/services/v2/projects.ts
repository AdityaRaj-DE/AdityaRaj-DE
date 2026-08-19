import { Project, CardOptions } from '../../types';
import { renderProjectsCard } from '../../svg/v2/projectsCard';

// Hardcoded projects as requested
const HARDCODED_PROJECTS: Project[] = [
  {
    name: 'Banking-System',
    description: 'A containerized banking simulator focusing on ACID-compliant transactions.',
    language: 'JavaScript',
    languageColor: '#f1e05a'
  },
  {
    name: 'Ride-Hive',
    description: 'A comprehensive backend system handling real-time operations.',
    language: 'TypeScript',
    languageColor: '#3178c6'
  },
  {
    name: 'Smart-Inventory-Management-System',
    description: 'Robust inventory platform with concurrent stock updates and logging.',
    language: 'TypeScript',
    languageColor: '#3178c6'
  },
  {
    name: 'Air-Quality-Prediction',
    description: 'Data pipeline and prediction models for air quality analysis.',
    language: 'Python',
    languageColor: '#3572A5'
  }
];

export async function getProjectsSvg(options: CardOptions): Promise<string> {
  // We can add fetching logic here in the future
  return renderProjectsCard(HARDCODED_PROJECTS, options);
}
