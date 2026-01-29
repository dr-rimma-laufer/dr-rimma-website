'use client';
import { Shield, Award, Calendar, Users } from "lucide-react";
import statsImage from '../assets/1365d7410d3d3ad58b2a3c26a22361173c3ec22b_converted.jpg';

const statistics = [
  {
    icon: Shield,
    number: "+5",
    label: "ביקורות מוחלטות",
    color: "text-[#905e26]"
  },
  {
    icon: Award,
    number: "98%",
    label: "שיעור הצלחה",
    color: "text-[#905e26]"
  },
  {
    icon: Calendar,
    number: "+5",
    label: "ייעוץ שירותי",
    color: "text-[#905e26]"
  },
  {
    icon: Users,
    number: "+100",
    label: "חוות דעת",
    color: "text-[#905e26]"
  }
];

export function StatisticsBar() {
  return (
    <section className="py-8 bg-[#101828]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statistics.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-[#905e26]/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-[#905e26]" />
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {stat.number}
                  </div>
                  <p className="text-sm text-gray-300 font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}