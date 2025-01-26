import React from "react";
import imagePlaceholder from "@/public/images/image-placeholder.svg";
import CourseCard from "../../common/CourseCard";

export interface ICourseCard {
  id: string;
  type: "free" | "premium";
  title: string;
  instructor: {
    name: string;
    avatar?: string;
  };
  description: string;
  stats: {
    students: number;
    likes: number;
  };
  pricing: {
    originalPrice: number;
    discountPercentage?: number;
  };
  thumbnailUrl: string;
}

export const coursesData: ICourseCard[] = [
  {
    id: "1",
    type: "free",
    title: "Emotional literacy",
    instructor: {
      name: "Ahmed eldmlawy",
      avatar: imagePlaceholder,
    },
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its",
    stats: {
      students: 5617,
      likes: 1650,
    },
    pricing: {
      originalPrice: 1300,
      discountPercentage: 40,
    },
    thumbnailUrl: imagePlaceholder,
  },
  {
    id: "2",
    type: "free",
    title: "Personal Development",
    instructor: {
      name: "Sarah Johnson",
      avatar: imagePlaceholder,
    },
    description:
      "Learn essential skills for personal growth and emotional intelligence in this comprehensive course",
    stats: {
      students: 4328,
      likes: 1280,
    },
    pricing: {
      originalPrice: 1500,
      discountPercentage: 35,
    },
    thumbnailUrl: imagePlaceholder,
  },
  {
    id: "3",
    type: "premium",
    title: "Leadership Skills",
    instructor: {
      name: "Michael Chen",
      avatar: imagePlaceholder,
    },
    description:
      "Master the art of leadership and team management with practical exercises and real-world examples",
    stats: {
      students: 3892,
      likes: 945,
    },
    pricing: {
      originalPrice: 1800,
      discountPercentage: 25,
    },
    thumbnailUrl: imagePlaceholder,
  },
  {
    id: "4",
    type: "free",
    title: "Communication Mastery",
    instructor: {
      name: "Emma Williams",
      avatar: imagePlaceholder,
    },
    description:
      "Enhance your communication skills and learn to connect effectively with others in any situation",
    stats: {
      students: 6234,
      likes: 1820,
    },
    pricing: {
      originalPrice: 1200,
      discountPercentage: 45,
    },
    thumbnailUrl: imagePlaceholder,
  },
  {
    id: "5",
    type: "premium",
    title: "Stress Management",
    instructor: {
      name: "David Cooper",
      avatar: imagePlaceholder,
    },
    description:
      "Learn proven techniques for managing stress and maintaining emotional balance in your daily life",
    stats: {
      students: 4567,
      likes: 1340,
    },
    pricing: {
      originalPrice: 1600,
      discountPercentage: 30,
    },
    thumbnailUrl: imagePlaceholder,
  },
];

const FreeStudiesComp = () => {
  return (
    <div>
      <h2 className="text-[#353535]  lg:text-[40px] font-semibold leading-[45px]">
        Get Started with free study
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {coursesData.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default FreeStudiesComp;
