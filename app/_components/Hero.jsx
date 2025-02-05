'use client'
import { CheckCircle, Moon, BarChart, Lock, Wallet } from "lucide-react";
import dynamic from 'next/dynamic';
import Image from 'next/image';

const PiggyCanvas = dynamic(() => import('../../components/canvas/PiggyCanvas'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  ),
});

const features = [
  { icon: <CheckCircle size={24} />, title: "Smart Budgeting", desc: "Create, manage, and track budgets with ease." },
  { icon: <Moon size={24} />, title: "Dark Mode", desc: "Reduce eye strain with a sleek, user-friendly interface." },
  { icon: <Wallet size={24} />, title: "Expense Categories", desc: "Organize spending with custom categories." },
  { icon: <BarChart size={24} />, title: "Insightful Analytics", desc: "Visual charts & reports for better spending habits." },
  { icon: <Lock size={24} />, title: "Secure Login", desc: "Your data stays private with encryption & authentication." },
];

const Hero = () => {
  return (
    <section className="relative">
      <div className="mt-[100px] -mb-10">
        <PiggyCanvas />
      </div>
      
      <div className="mx-auto max-w-screen-xl px-4 py-32">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Track Your Expenses.
            <strong className="font-extrabold text-primary sm:block"> Master Your Budget. </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Effortlessly track your expenses and manage your finances with ease. Stay in control of your budget and achieve your financial goals today!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="bg-primary hover:text-white text-primary-foreground rounded-[5px] px-5 relative inline-flex items-center justify-center p-0.5 mb-2 me-2"
              href="/sign-in"
            >
              Get Started
            </a>

            <a
              href="#features"
            >
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-[#6B4226] via-[#D3A379] to-[#F5E1C8] group-hover:from-[#6B4226] group-hover:via-[#D3A379] group-hover:to-[#F5E1C8] dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-[#D3A379] dark:focus:ring-[#6B4226]">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
            See Features
          </span>
        </button>
            </a>
          </div>
        </div>
      </div>
        <div className='flex  justify-center'>
          <Image
            src="/spendsense.png"
            alt="demo-pic"
            width={1200}
            height={675}
            className="w-[80%] h-auto"
            priority
          />
        </div>
        
        <div className="py-16 bg-gray-50" id="features">
          <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">Why Choose SpendSense?</h2>
          <p className="text-gray-600 mt-2">Take full control of your finances with powerful features.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start p-5 bg-white shadow-md rounded-lg">
              <div className="text-indigo-600">{feature.icon}</div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        
          </div>
        
      </section>
     

    )
  }

export default Hero