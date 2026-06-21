"use client";

import { useEffect, useState, useRef } from "react";
import { School, Users, Award, Calendar } from "lucide-react";
import { getHomeIcon } from "@/lib/home-icons";

interface CounterStat {
  end: number;
  start: number;
  step: number;
  suffix: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isText?: boolean;
  text?: string;
  formatNumber?: boolean;
}

const defaultStats: CounterStat[] = [
  { end: 31, start: 0, step: 1, suffix: "", label: "Colegios", icon: School, formatNumber: false },
  { end: 29500, start: 10000, step: 1000, suffix: "+", label: "Estudiantes", icon: Users, formatNumber: true },
  { end: 0, start: 0, step: 0, suffix: "", label: "Categoría ICFES", icon: Award, isText: true, text: "A+" },
  { end: 65, start: 0, step: 1, suffix: "", label: "Años de historia", icon: Calendar, formatNumber: false },
];

interface DynamicStat {
  icon: string;
  label: string;
  value: number;
  suffix: string;
  isText: boolean;
  text?: string;
}

interface StatsCounterProps {
  dynamicStats?: DynamicStat[];
}

function useCounterAnimation(start: number, end: number, step: number, isVisible: boolean, duration: number = 5000) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (!isVisible || start === end) return;

    const totalSteps = Math.ceil((end - start) / step);
    const intervalMs = Math.max(duration / totalSteps, 30);
    let current = start;

    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      setValue(current);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isVisible, start, end, step, duration]);

  return value;
}

function resolvedStats(dynamicStats?: DynamicStat[]): CounterStat[] {
  if (!dynamicStats || dynamicStats.length === 0) return defaultStats;
  return dynamicStats.map((s) => ({
    end: s.isText ? 0 : s.value,
    start: s.isText ? 0 : 0,
    step: s.isText ? 0 : Math.max(1, Math.ceil(s.value / 50)),
    suffix: s.suffix || "",
    label: s.label,
    icon: getHomeIcon(s.icon),
    isText: s.isText,
    text: s.text,
    formatNumber: !s.isText && s.value >= 1000,
  }));
}

export default function StatsCounter({ dynamicStats }: StatsCounterProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-gray-50 border-y border-gray-100" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {resolvedStats(dynamicStats).map((stat, index) => (
            <StatItem key={index} stat={stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, isVisible }: { stat: CounterStat; isVisible: boolean }) {
  const value = useCounterAnimation(stat.start, stat.end, stat.step, isVisible);

  const displayValue = stat.isText
    ? stat.text
    : (stat.formatNumber ? value.toLocaleString("es-CO") : value) + stat.suffix;

  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-brand-gold rounded-xl flex items-center justify-center mx-auto mb-4">
        <stat.icon className="h-6 w-6 text-brand-dark" />
      </div>
      <div className="text-3xl font-bold text-brand-dark mb-1">{displayValue}</div>
      <div className="text-gray-600 text-sm">{stat.label}</div>
    </div>
  );
}
