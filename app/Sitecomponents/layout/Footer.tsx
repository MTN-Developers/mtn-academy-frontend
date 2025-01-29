// components/footer/Footer.tsx
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaSquareYoutube } from "react-icons/fa6";
// import { Facebook, Linkedin, Twitter, Youtube, Instagram } from "lucide-react";
import mtnLogo from "@/public/images/mtn-logo.svg";
import googlePlay from "@/public/images/google-play-logo.svg";
import appStore from "@/public/images/app-store-logo.svg";
import { FaInstagramSquare } from "react-icons/fa";
// Define the program categories and their items
const programCategories = [
  {
    title: "Learn Key Programmers",
    items: [
      "Masculinity GYM",
      "Pregnancy",
      "Estro Gym",
      "Intimate relationships",
      "Fitra",
    ],
  },
  {
    title: "Essential Skills",
    items: [
      "Data Analytics",
      "Artificial Intelligence",
      "Cybersecurity",
      "Digital Marketing",
      "Machine Learning",
      "Statistical Analysis",
      "Database Management",
      "Web Development",
      "Financial Modeling",
      "Business Analysis",
    ],
  },
  {
    title: "Industry Solutions",
    items: [
      "Healthcare Analytics",
      "Sales",
      "Digital Transformation",
      "Supply Chain",
      "Marketing Analytics",
      "HR Analytics",
      "Social Media Marketing",
      "Risk Management",
      "Sustainability",
      "E-commerce",
    ],
  },
];
const socialLinks = [
  { icon: <FaFacebook size={30} />, href: "#", label: "Facebook" },
  { icon: <FaLinkedin size={30} />, href: "#", label: "LinkedIn" },
  { icon: <AiFillTwitterCircle size={30} />, href: "#", label: "Twitter" },
  { icon: <FaSquareYoutube size={30} />, href: "#", label: "YouTube" },
  { icon: <FaInstagramSquare size={30} />, href: "#", label: "Instagram" },
  //   { icon: TiktokIcon, href: "#", label: "TikTok" },
];

export function Footer() {
  return (
    <footer className="bg-[#D0E1F4] mt-16 py-12">
      <div className="container mx-auto px-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo and App Store Links Section */}
          <div className="md:col-span-3 space-y-6">
            <Image
              src={mtnLogo}
              alt="MTN Institute"
              width={180}
              height={160}
              className="mb-6 lg:mb-20"
            />
            <div className="space-y-4">
              <Link href="#" className="block">
                <Image
                  src={appStore}
                  alt="Download on the App Store"
                  width={140}
                  height={42}
                />
              </Link>
              <Link href="#" className="block">
                <Image
                  src={googlePlay}
                  alt="Get it on Google Play"
                  width={140}
                  height={42}
                />
              </Link>
            </div>
          </div>
          {/* Programs Categories */}
          <div className="md:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {programCategories.map((category) => (
                <div key={category.title}>
                  <h3 className="font-bold text-lg mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li key={item}>
                        <Link
                          href="#"
                          className="text-gray-600 hover:text-gray-900 text-sm"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">
              © 2024 MTN Institute Inc. All rights reserved.
            </p>
            {/* Social Media Links */}
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
