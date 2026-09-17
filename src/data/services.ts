import { Building2, HardHat, Leaf, Ruler } from 'lucide-vue-next'
import type { Service } from '@/types'

export const services: Service[] = [
  {
    id: 'progettazione-strutturale',
    icon: Building2,
    title: 'Progettazione Strutturale',
    description:
      'Progettiamo strutture sicure ed efficienti per edifici residenziali, commerciali e industriali, nel rispetto delle normative sismiche vigenti.',
  },
  {
    id: 'direzione-lavori',
    icon: HardHat,
    title: 'Direzione Lavori',
    description:
      'Seguiamo ogni fase del cantiere garantendo il rispetto di tempi, costi e standard qualitativi, dalla posa delle fondamenta al collaudo finale.',
  },
  {
    id: 'consulenza-energetica',
    icon: Leaf,
    title: 'Consulenza Energetica',
    description:
      'Offriamo consulenza su efficienza energetica e certificazioni per edifici sostenibili, riducendo consumi e impatto ambientale.',
  },
  {
    id: 'rilievi-pratiche-edilizie',
    icon: Ruler,
    title: 'Rilievi e Pratiche Edilizie',
    description:
      'Rilievi topografici, pratiche catastali e gestione delle autorizzazioni edilizie presso gli enti competenti.',
  },
]
