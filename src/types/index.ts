import type { Component } from 'vue'

export interface Service {
  id: string
  icon: Component
  title: string
  description: string
}

export interface Project {
  id: string
  title: string
  category: string
  location: string
  year: number
  image: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  photo: string
  email?: string
  linkedin?: string
}

export interface Stat {
  id: string
  value: number
  suffix: string
  label: string
}

export interface HeroSlide {
  id: string
  title: string
  subtitle: string
  ctaLabel: string
  ctaTarget: string
  image: string
}
