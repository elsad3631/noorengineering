import { Building2, HardHat, Leaf, Ruler } from 'lucide-vue-next'
import type { Service } from '@/types'

export const services: Service[] = [
  {
    id: 'structural-design',
    icon: Building2,
    title: 'Structural Design',
    description:
      'We design safe and efficient structures for residential, commercial, and industrial buildings, in compliance with current seismic regulations.',
  },
  {
    id: 'construction-management',
    icon: HardHat,
    title: 'Construction Management',
    description:
      'We oversee every phase of the site, ensuring timelines, costs, and quality standards are met, from foundations to final testing.',
  },
  {
    id: 'energy-consulting',
    icon: Leaf,
    title: 'Energy Consulting',
    description:
      'We provide energy efficiency consulting and certifications for sustainable buildings, reducing consumption and environmental impact.',
  },
  {
    id: 'surveys-permits',
    icon: Ruler,
    title: 'Surveys & Building Permits',
    description:
      'Topographic surveys, land registry filings, and management of building permits with the relevant authorities.',
  },
]
